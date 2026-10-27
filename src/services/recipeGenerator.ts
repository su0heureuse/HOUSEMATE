import { RecipeDetail, RecipeFridgeItem, RescueRecipe } from '../types/recipe';

const SYSTEM_PROMPT = '1인 가구, 한국 가정식 위주, 조리도구가 많지 않은 자취방, 설거지 최소화, 같은 결과를 반복하지 말 것.';
const BASIC_SEASONINGS = new Set(['소금', '간장', '설탕', '후추', '식용유', '참기름', '고춧가루', '다진 마늘', '마늘', '물']);

export function sanitizeRecipeIngredients(items: RecipeFridgeItem[]): RecipeFridgeItem[] {
  return items.map(item => ({
    id: item.id,
    name: String(item.name || ''),
    category: String(item.category || '기타'),
    storage: String(item.storage || '냉장'),
    quantity: String(item.quantity || '1개'),
    expiryDays: Number.isFinite(Number(item.expiryDays)) ? Number(item.expiryDays) : 0
  }));
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`Recipe request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export async function generateRecipeList(items: RecipeFridgeItem[], recentTitles: string[], refreshCount: number): Promise<RescueRecipe[]> {
  const safeItems = sanitizeRecipeIngredients(items).filter(item => item.expiryDays >= -3);
  const knownIds = new Set(safeItems.map(item => String(item.id)));
  const response = await postJson<{ recipes?: any[] }>('/api/generate-rescue-recipes', {
    ingredients: safeItems,
    recentTitles: recentTitles.slice(-12),
    refreshCount,
    systemPrompt: SYSTEM_PROMPT
  });
  if (!Array.isArray(response.recipes)) return [];
  return response.recipes.map((recipe, index): RescueRecipe | null => {
    if (!recipe || typeof recipe.title !== 'string' || !recipe.title.trim()) return null;
    const usedItemIds = Array.isArray(recipe.usedItemIds)
      ? recipe.usedItemIds.map((id: unknown) => String(id)).filter((id: string) => knownIds.has(id))
      : [];
    if (!usedItemIds.length) return null;
    const extraIngredients = Array.isArray(recipe.extraIngredients)
      ? recipe.extraIngredients.filter((item: unknown) => typeof item === 'string' && item.trim() && !BASIC_SEASONINGS.has(item.trim())).slice(0, 3)
      : [];
    return {
      id: `ai-${recipe.title.trim()}-${usedItemIds.sort().join('-')}-${index}`,
      title: recipe.title.trim(),
      summary: String(recipe.summary || ''),
      timeMinutes: Math.max(1, Number(recipe.timeMinutes) || 15),
      difficulty: ['초간단', '쉬움', '보통'].includes(recipe.difficulty) ? recipe.difficulty : '쉬움',
      servings: Math.max(1, Math.min(4, Number(recipe.servings) || 1)),
      usedItemIds,
      extraIngredients,
      tools: Array.isArray(recipe.tools) ? recipe.tools.filter((item: unknown) => typeof item === 'string').slice(0, 5) : [],
      source: 'ai'
    };
  }).filter((recipe): recipe is RescueRecipe => recipe !== null);
}

export async function generateRecipeDetail(recipe: RescueRecipe, items: RecipeFridgeItem[], preferences: string[], servings: number): Promise<RecipeDetail> {
  const response = await postJson<Partial<RecipeDetail>>('/api/generate-rescue-recipe-detail', {
    recipe,
    ingredients: sanitizeRecipeIngredients(items),
    preferences,
    servings,
    systemPrompt: SYSTEM_PROMPT
  });
  const steps = Array.isArray(response.steps) ? response.steps.filter(step => step && typeof step.title === 'string' && typeof step.instruction === 'string').slice(0, 10).map(step => ({
    title: step.title,
    instruction: step.instruction,
    timerSeconds: typeof step.timerSeconds === 'number' && step.timerSeconds > 0 ? Math.round(step.timerSeconds) : null
  })) : [];
  if (!steps.length) throw new Error('Invalid recipe detail');
  return {
    steps,
    tips: Array.isArray(response.tips) ? response.tips.filter((tip): tip is string => typeof tip === 'string').slice(0, 3) : [],
    storage: typeof response.storage === 'string' ? response.storage : '남은 음식은 식혀서 밀폐 냉장 보관하세요.'
  };
}
