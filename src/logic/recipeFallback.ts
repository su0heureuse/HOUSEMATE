import { RecipeDetail, RecipeFridgeItem, RescueRecipe } from '../types/recipe';

export interface FallbackRecipeTemplate {
  title: string;
  summary: string;
  timeMinutes: number;
  difficulty: RescueRecipe['difficulty'];
  keywords: string[];
  extraIngredients: string[];
  tools: string[];
  steps: RecipeDetail['steps'];
  tips: string[];
  storage: string;
}

export const FALLBACK_RECIPE_POOL: FallbackRecipeTemplate[] = [
  { title: '대파 계란 간장밥', summary: '대파 향을 입힌 달걀로 빠르게 차리는 한 그릇', timeMinutes: 7, difficulty: '초간단', keywords: ['계란', '대파', '밥'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '대파 볶기', instruction: '대파를 송송 썰어 기름을 두른 팬에 1분 볶아요.', timerSeconds: 60 }, { title: '달걀 익히기', instruction: '달걀을 넣고 흰자가 익을 때까지 부드럽게 저어요.', timerSeconds: 90 }, { title: '밥과 섞기', instruction: '밥을 넣고 간장으로 간을 맞춰 한 팬에서 마무리해요.', timerSeconds: null }], tips: ['간장은 팬 가장자리에 둘러 향을 내세요.'], storage: '밥과 달걀은 따로 밀폐해 냉장하고 다음 날 안에 드세요.' },
  { title: '김치 두부 팬구이', summary: '두부와 김치를 한 팬에 구워 따뜻하게 즐겨요', timeMinutes: 16, difficulty: '쉬움', keywords: ['두부', '김치'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '두부 굽기', instruction: '두부를 먹기 좋게 잘라 물기를 닦고 팬에 노릇하게 구워요.', timerSeconds: 240 }, { title: '김치 볶기', instruction: '한쪽 공간에 김치를 넣고 숨이 살짝 죽을 때까지 볶아요.', timerSeconds: 180 }, { title: '함께 익히기', instruction: '두부와 김치를 섞고 약불에서 잠깐 더 익혀요.', timerSeconds: 120 }], tips: ['두부 물기를 닦으면 기름이 덜 튀어요.'], storage: '남은 음식은 식힌 뒤 밀폐해 냉장하고 하루 안에 드세요.' },
  { title: '냉동만두 달걀국', summary: '냉동만두와 달걀로 간단하게 끓이는 국', timeMinutes: 18, difficulty: '쉬움', keywords: ['만두', '계란'], extraIngredients: [], tools: ['냄비'], steps: [{ title: '국물 끓이기', instruction: '냄비에 물과 기본 양념을 넣고 끓여요.', timerSeconds: 240 }, { title: '만두 넣기', instruction: '냉동만두를 넣고 속까지 익도록 끓여요.', timerSeconds: 360 }, { title: '달걀 풀기', instruction: '풀어둔 달걀을 가늘게 둘러 넣고 불을 꺼요.', timerSeconds: 60 }], tips: ['만두가 떠오른 뒤 속까지 뜨거운지 확인하세요.'], storage: '국은 식힌 뒤 냉장하고 다음 날까지 충분히 끓여 드세요.' },
  { title: '버섯 대파 덮밥', summary: '버섯과 대파를 간장 양념에 볶아 밥 위에 올려요', timeMinutes: 17, difficulty: '쉬움', keywords: ['버섯', '대파', '밥'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '재료 썰기', instruction: '버섯과 대파를 먹기 좋은 크기로 썰어요.', timerSeconds: null }, { title: '볶기', instruction: '대파를 먼저 볶고 버섯을 넣어 수분이 날아가게 볶아요.', timerSeconds: 300 }, { title: '양념하기', instruction: '간장으로 간을 맞추고 밥 위에 올려요.', timerSeconds: null }], tips: ['버섯은 팬에 넓게 펼쳐 볶으면 식감이 좋아요.'], storage: '볶은 재료는 밥과 분리해 밀폐 냉장하세요.' },
  { title: '감자 참치 조림', summary: '감자와 참치를 자작하게 익혀 밥반찬으로 만들어요', timeMinutes: 22, difficulty: '보통', keywords: ['감자', '참치'], extraIngredients: [], tools: ['냄비'], steps: [{ title: '감자 손질', instruction: '감자를 작게 깍둑 썰어 냄비에 담아요.', timerSeconds: null }, { title: '익히기', instruction: '물과 간장 양념을 조금 넣고 뚜껑을 덮어 익혀요.', timerSeconds: 600 }, { title: '참치 넣기', instruction: '감자가 부드러워지면 기름을 뺀 참치를 넣고 섞어요.', timerSeconds: 180 }], tips: ['감자 크기를 비슷하게 썰면 고르게 익어요.'], storage: '완전히 식힌 뒤 밀폐 냉장하고 이틀 안에 드세요.' },
  { title: '우유 달걀 프렌치토스트', summary: '우유와 달걀을 적신 빵을 팬에 노릇하게 구워요', timeMinutes: 10, difficulty: '초간단', keywords: ['우유', '계란', '식빵'], extraIngredients: ['식빵'], tools: ['프라이팬'], steps: [{ title: '달걀물 만들기', instruction: '달걀과 우유를 넓은 그릇에서 섞어요.', timerSeconds: null }, { title: '빵 적시기', instruction: '빵 양면에 달걀물을 고루 묻혀요.', timerSeconds: 30 }, { title: '굽기', instruction: '약불 팬에서 앞뒤로 노릇하게 구워요.', timerSeconds: 240 }], tips: ['약불로 천천히 익히면 속까지 부드러워요.'], storage: '구운 토스트는 바로 먹는 것이 좋아요.' },
  { title: '양파 달걀 덮밥', summary: '양파를 부드럽게 익혀 달걀과 함께 밥에 얹어요', timeMinutes: 15, difficulty: '쉬움', keywords: ['양파', '계란', '밥'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '양파 익히기', instruction: '양파를 얇게 썰어 물과 간장에 부드러워질 때까지 익혀요.', timerSeconds: 300 }, { title: '달걀 붓기', instruction: '풀어둔 달걀을 붓고 가장자리부터 익혀요.', timerSeconds: 120 }, { title: '밥에 얹기', instruction: '달걀이 촉촉할 때 밥 위에 얹어요.', timerSeconds: null }], tips: ['달걀을 넣은 뒤 너무 오래 익히지 마세요.'], storage: '달걀 덮밥은 조리 후 바로 드세요.' },
  { title: '애호박 참치 볶음밥', summary: '애호박과 참치를 밥에 볶아 한 팬으로 끝내요', timeMinutes: 16, difficulty: '쉬움', keywords: ['애호박', '참치', '밥'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '애호박 볶기', instruction: '애호박을 작게 썰어 기름에 볶아요.', timerSeconds: 180 }, { title: '참치 넣기', instruction: '참치의 기름을 빼고 넣어 함께 볶아요.', timerSeconds: 120 }, { title: '밥 볶기', instruction: '밥을 넣고 고슬고슬하게 볶아 간을 맞춰요.', timerSeconds: 240 }], tips: ['애호박을 너무 얇게 썰지 않으면 식감이 남아요.'], storage: '남은 볶음밥은 식혀 밀폐 냉장하고 다음 날 안에 드세요.' },
  { title: '실온 참치 김치 비빔밥', summary: '보관이 쉬운 재료를 밥과 가볍게 비벼요', timeMinutes: 6, difficulty: '초간단', keywords: ['참치', '김치', '밥'], extraIngredients: [], tools: ['그릇'], steps: [{ title: '재료 준비', instruction: '김치와 참치를 먹기 좋게 준비해요.', timerSeconds: null }, { title: '비비기', instruction: '밥 위에 재료를 올리고 참기름과 간장으로 비벼요.', timerSeconds: null }], tips: ['김치 국물은 조금씩 넣어 간을 조절하세요.'], storage: '비빔밥은 바로 먹고 남은 밥과 재료는 분리해 냉장하세요.' },
  { title: '냉동실 채소 볶음면', summary: '냉동 채소와 면을 한 팬에서 볶아내요', timeMinutes: 20, difficulty: '보통', keywords: ['냉동', '면', '대파'], extraIngredients: ['면'], tools: ['프라이팬'], steps: [{ title: '면 삶기', instruction: '면을 포장 안내에 따라 삶고 물기를 빼요.', timerSeconds: 300 }, { title: '채소 볶기', instruction: '냉동 채소를 팬에 넣고 수분이 날아가도록 볶아요.', timerSeconds: 360 }, { title: '면과 섞기', instruction: '면과 간장 양념을 넣고 골고루 볶아요.', timerSeconds: 180 }], tips: ['냉동 채소는 해동하지 않고 바로 볶아도 돼요.'], storage: '볶음면은 식힌 뒤 냉장하고 다음 날 안에 드세요.' },
  { title: '토마토 달걀 볶음', summary: '토마토의 산뜻한 맛과 달걀을 부드럽게 볶아요', timeMinutes: 12, difficulty: '초간단', keywords: ['토마토', '계란'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '달걀 먼저 익히기', instruction: '달걀을 풀어 팬에서 부드럽게 익힌 뒤 잠시 덜어둬요.', timerSeconds: 90 }, { title: '토마토 볶기', instruction: '토마토를 한입 크기로 썰어 팬에서 살짝 익혀요.', timerSeconds: 180 }, { title: '섞어 마무리', instruction: '달걀을 다시 넣고 함께 섞어 간을 맞춰요.', timerSeconds: 60 }], tips: ['토마토는 너무 오래 볶지 않으면 모양이 남아요.'], storage: '조리 후 식혀 밀폐 냉장하고 하루 안에 드세요.' },
  { title: '냉동만두 파 간장구이', summary: '냉동만두를 굽고 대파 간장 양념을 곁들여요', timeMinutes: 14, difficulty: '쉬움', keywords: ['만두', '대파'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '만두 굽기', instruction: '팬에 냉동만두와 물을 조금 넣고 뚜껑을 덮어 익혀요.', timerSeconds: 360 }, { title: '수분 날리기', instruction: '뚜껑을 열고 바닥을 바삭하게 구워요.', timerSeconds: 180 }, { title: '파 간장 곁들이기', instruction: '잘게 썬 대파와 간장을 섞어 곁들여요.', timerSeconds: null }], tips: ['팬에 물을 넣은 뒤 뚜껑을 덮어 속까지 익혀요.'], storage: '남은 만두는 식힌 뒤 냉장하고 다음 날 다시 익혀 드세요.' },
  { title: '두부 대파 된장국', summary: '두부와 대파를 넣어 간단하게 끓이는 국', timeMinutes: 19, difficulty: '쉬움', keywords: ['두부', '대파'], extraIngredients: [], tools: ['냄비'], steps: [{ title: '국물 끓이기', instruction: '냄비에 물과 된장을 풀어 끓여요.', timerSeconds: 240 }, { title: '두부 넣기', instruction: '두부를 깍둑 썰어 넣고 한소끔 끓여요.', timerSeconds: 300 }, { title: '대파 마무리', instruction: '대파를 넣고 1분 더 끓여요.', timerSeconds: 60 }], tips: ['된장은 조금씩 풀어 간을 맞추세요.'], storage: '남은 국은 식힌 뒤 냉장하고 충분히 다시 끓여 드세요.' },
  { title: '실온 김 통조림 덮밥', summary: '보관이 쉬운 통조림과 김으로 빠르게 만드는 밥', timeMinutes: 5, difficulty: '초간단', keywords: ['참치', '김', '밥'], extraIngredients: [], tools: ['그릇'], steps: [{ title: '참치 준비', instruction: '참치의 기름을 취향에 맞게 덜어내요.', timerSeconds: null }, { title: '밥에 얹기', instruction: '밥 위에 참치와 김을 올리고 간장으로 간을 맞춰요.', timerSeconds: null }], tips: ['김은 먹기 직전에 부수어 올리면 바삭해요.'], storage: '통조림을 연 뒤 남으면 다른 용기에 옮겨 냉장하세요.' },
  { title: '감자 달걀 한 팬구이', summary: '감자를 먼저 익히고 달걀을 더해 든든하게 구워요', timeMinutes: 24, difficulty: '보통', keywords: ['감자', '계란'], extraIngredients: [], tools: ['프라이팬'], steps: [{ title: '감자 익히기', instruction: '감자를 얇게 썰어 팬에 물을 약간 넣고 뚜껑을 덮어요.', timerSeconds: 480 }, { title: '노릇하게 굽기', instruction: '물이 사라지면 기름을 두르고 감자를 굽습니다.', timerSeconds: 240 }, { title: '달걀 추가', instruction: '달걀을 깨 넣고 익을 때까지 마무리해요.', timerSeconds: 180 }], tips: ['감자는 얇고 일정하게 썰어 주세요.'], storage: '조리 후 바로 드시고 남은 음식은 냉장 보관하세요.' }
];

const keywordsInItem = (item: RecipeFridgeItem, keyword: string) => {
  const name = item.name.toLowerCase();
  const key = keyword.toLowerCase();
  if (name.includes(key)) return true;
  if (key === '계란' && /달걀|계란/.test(name)) return true;
  if (key === '두부' && /두부/.test(name)) return true;
  if (key === '밥' && /햇반|밥/.test(name)) return true;
  if (key === '냉동' && item.storage === '냉동') return true;
  return false;
};

const hashSeed = (text: string) => [...text].reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) >>> 0, 7);

export function createFallbackRecipes(items: RecipeFridgeItem[], today: string, refreshCount: number): Array<RescueRecipe & { detail: RecipeDetail }> {
  const usable = items.filter(item => item.expiryDays >= -3);
  const scored = FALLBACK_RECIPE_POOL.map((template, index) => {
    const matched = usable.filter(item => template.keywords.some(keyword => keywordsInItem(item, keyword)));
    const matches = matched.length;
    const urgency = matched.reduce((sum, item) => sum + Math.max(0, 4 - item.expiryDays), 0);
    return { template, matched, score: matches * 10 + urgency, index };
  }).filter(entry => entry.matched.length > 0);
  if (!scored.length) return [];
  const seed = hashSeed(`${today}:${refreshCount}`);
  const topScore = Math.max(...scored.map(entry => entry.score));
  const ordered = scored.sort((a, b) => b.score - a.score || ((a.index + seed) % FALLBACK_RECIPE_POOL.length) - ((b.index + seed) % FALLBACK_RECIPE_POOL.length));
  const candidates = ordered.slice(0, Math.min(3, ordered.length));
  // Make the freezer/pantry option visible when available, while preserving urgency-ranked top picks.
  const storageCandidate = scored.find(entry => entry.template.keywords.some(keyword => ['냉동', '참치', '김'].includes(keyword)) && entry.score >= topScore - 15);
  if (storageCandidate && !candidates.includes(storageCandidate)) candidates[candidates.length - 1] = storageCandidate;
  return candidates.map(({ template, matched }) => ({
    id: `fallback-${template.title}`,
    title: template.title,
    summary: template.summary,
    timeMinutes: template.timeMinutes,
    difficulty: template.difficulty,
    servings: 1,
    usedItemIds: matched.map(item => item.id),
    extraIngredients: template.extraIngredients.slice(0, 3),
    tools: template.tools,
    source: 'fallback',
    detail: { steps: template.steps, tips: template.tips.slice(0, 3), storage: template.storage }
  }));
}

export function findFallbackDetail(recipeId: string): RecipeDetail | null {
  const title = recipeId.replace(/^fallback-/, '');
  const template = FALLBACK_RECIPE_POOL.find(item => item.title === title);
  return template ? { steps: template.steps, tips: template.tips.slice(0, 3), storage: template.storage } : null;
}

export function findRelatedFallbackDetail(recipe: RescueRecipe, items: RecipeFridgeItem[]): RecipeDetail {
  const usedItems = items.filter(item => recipe.usedItemIds.some(id => String(id) === String(item.id)));
  const best = FALLBACK_RECIPE_POOL.map(template => ({
    template,
    score: usedItems.filter(item => template.keywords.some(keyword => keywordsInItem(item, keyword))).length
  })).sort((a, b) => b.score - a.score)[0];
  return best?.score ? { steps: best.template.steps, tips: best.template.tips.slice(0, 3), storage: best.template.storage } : {
    steps: [{ title: '재료 준비', instruction: `${usedItems.map(item => item.name).join(', ')}의 상태를 확인하고 먹기 좋게 손질해요.`, timerSeconds: null }],
    tips: ['재료가 이미 지난 경우 상태를 확인하고 드세요.'],
    storage: '조리한 음식은 식혀 밀폐해 냉장 보관하고 가급적 빠르게 드세요.'
  };
}
