import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Check, ChevronRight, Clock3, Minus, Plus, RefreshCw, ShoppingCart, Sparkles, Utensils, X } from 'lucide-react';
import { RecipeDetail, RecipeFridgeItem, RescueRecipe, StoredRecipeList } from '../types/recipe';
import { createFallbackRecipes, findFallbackDetail, findRelatedFallbackDetail } from '../logic/recipeFallback';
import { generateRecipeDetail, generateRecipeList, sanitizeRecipeIngredients } from '../services/recipeGenerator';
import { safeLocalStorage } from '../repositories';

const REFINEMENTS = ['더 간단하게', '전자레인지로만', '프라이팬 하나로', '맵지 않게', '양 늘리기', '재료 덜 쓰기'];
const detailMemoryCache = new Map<string, RecipeDetail>();

interface Props {
  fridgeItems: any[];
  today: string;
  previewOnly?: boolean;
  onCook: (recipe: RescueRecipe, selectedIds: Array<string | number>) => boolean;
  onAddShoppingItem: (name: string, quiet?: boolean) => void;
  onReceipt: () => void;
  onStats: () => void;
  showToast: (message: string) => void;
  copyToClipboard: (text: string, successMessage?: string) => void;
}

function ingredientHash(items: RecipeFridgeItem[]) {
  return items.map(item => `${String(item.id)}:${item.expiryDays}`).sort().join('|');
}

function safeStoredRecipes(): StoredRecipeList | null {
  const stored = safeLocalStorage.get<StoredRecipeList | null>('recipes', null);
  return stored && typeof stored.ingredientsHash === 'string' && Array.isArray(stored.recipes) ? stored : null;
}

function minuteLabel(minutes: number) {
  return `${minutes}분`;
}

function expiryLabel(days: number) {
  if (days < 0) return `D+${Math.abs(days)}`;
  if (days === 0) return 'D-Day';
  return `D-${days}`;
}

function scaledQuantity(quantity: string, multiplier: number) {
  const fraction = quantity.match(/^(\d+)\/(\d+)/);
  let value: number | null = null;
  if (fraction) value = Number(fraction[1]) / Number(fraction[2]);
  else {
    const match = quantity.match(/\d+(?:\.\d+)?/);
    if (match) value = Number(match[0]);
  }
  if (value === null) return quantity;
  const scaled = value * multiplier;
  const label = Number.isInteger(scaled) ? String(scaled) : String(Math.round(scaled * 10) / 10);
  if (fraction) return quantity.replace(fraction[0], label);
  return quantity.replace(/\d+(?:\.\d+)?/, label);
}

export function RescueRecipeSection({ fridgeItems, today, previewOnly = false, onCook, onAddShoppingItem, onReceipt, onStats, showToast, copyToClipboard }: Props) {
  const safeItems = useMemo<RecipeFridgeItem[]>(() => sanitizeRecipeIngredients(fridgeItems.map(item => ({
    id: item.id, name: item.name, category: item.category || '기타', storage: item.storage || '냉장', quantity: item.quantity || '1개', expiryDays: Number(item.expiryDays) || 0
  }))), [fridgeItems]);
  const hash = useMemo(() => ingredientHash(safeItems), [safeItems]);
  const [storedRecipes, setStoredRecipes] = useState<StoredRecipeList | null>(() => safeStoredRecipes());
  const [recipes, setRecipes] = useState<RescueRecipe[]>(() => safeStoredRecipes()?.recipes || []);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [aiState, setAiState] = useState<'unknown' | 'online' | 'offline'>(() => safeStoredRecipes()?.recipes.some(recipe => recipe.source === 'ai') ? 'online' : safeStoredRecipes()?.recipes.length ? 'offline' : 'unknown');
  const [selectedRecipe, setSelectedRecipe] = useState<RescueRecipe | null>(null);
  const [detail, setDetail] = useState<RecipeDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [servings, setServings] = useState(1);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<Array<string | number>>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [refinements, setRefinements] = useState<string[]>([]);
  const [timer, setTimer] = useState<{ stepIndex: number; seconds: number } | null>(null);
  const requestId = useRef(0);
  const detailRequestId = useRef(0);
  const latestStored = useRef(storedRecipes);

  useEffect(() => { latestStored.current = storedRecipes; }, [storedRecipes]);

  const generateList = useCallback(async (force = false) => {
    const previous = latestStored.current || safeStoredRecipes();
    if (!force && previous?.ingredientsHash === hash) {
      setStoredRecipes(previous);
      setRecipes(previous.recipes);
      setAiState(previous.recipes.some(recipe => recipe.source === 'ai') ? 'online' : 'offline');
      return;
    }
    const thisRequest = ++requestId.current;
    setIsLoadingList(true);
    const refreshCount = (previous?.refreshCount || 0) + (force ? 1 : 0);
    const recentTitles = previous?.recentTitles || [];
    let nextRecipes: RescueRecipe[] = [];
    let nextAiState: 'online' | 'offline' = 'offline';
    try {
      nextRecipes = await generateRecipeList(safeItems, recentTitles, refreshCount);
      if (nextRecipes.length) nextAiState = 'online';
      else throw new Error('AI returned no recipes');
    } catch {
      const fallback = createFallbackRecipes(safeItems, today, refreshCount);
      nextRecipes = fallback.map(({ detail: _detail, ...recipe }) => recipe);
    }
    if (thisRequest !== requestId.current) return;
    const saved: StoredRecipeList = {
      ingredientsHash: hash,
      recipes: nextRecipes,
      recentTitles: [...recentTitles, ...nextRecipes.map(recipe => recipe.title)].slice(-12),
      refreshCount,
      generatedAt: new Date().toISOString()
    };
    safeLocalStorage.set('recipes', saved);
    latestStored.current = saved;
    setStoredRecipes(saved);
    setRecipes(nextRecipes);
    setAiState(nextAiState);
    setIsLoadingList(false);
  }, [hash, safeItems, today]);

  useEffect(() => { void generateList(false); }, [generateList]);

  const loadDetail = useCallback(async (recipe: RescueRecipe, selectedRefinements: string[], force = false) => {
    const thisRequest = ++detailRequestId.current;
    const effectiveServings = selectedRecipe?.id === recipe.id ? servings : (recipe.servings || 1);
    setSelectedRecipe(recipe);
    if (selectedRecipe?.id !== recipe.id) setServings(recipe.servings || 1);
    setSelectedIngredientIds([...recipe.usedItemIds]);
    setCheckedSteps([]);
    setRefinements(selectedRefinements);
    setTimer(null);
    setDetailError(false);
    const fallbackDetail = recipe.source === 'fallback' ? findFallbackDetail(recipe.id) || findRelatedFallbackDetail(recipe, safeItems) : findRelatedFallbackDetail(recipe, safeItems);
    if (!force && detailMemoryCache.has(recipe.id)) {
      setDetail(detailMemoryCache.get(recipe.id)!);
      setIsLoadingDetail(false);
      return;
    }
    if (recipe.source === 'fallback' || aiState === 'offline') {
      detailMemoryCache.set(recipe.id, fallbackDetail);
      setDetail(fallbackDetail);
      setIsLoadingDetail(false);
      return;
    }
    setDetail(null);
    setIsLoadingDetail(true);
    try {
      const generated = await generateRecipeDetail(recipe, safeItems, selectedRefinements, effectiveServings);
      if (thisRequest !== detailRequestId.current) return;
      detailMemoryCache.set(recipe.id, generated);
      setDetail(generated);
      setAiState('online');
    } catch {
      if (thisRequest !== detailRequestId.current) return;
      const offlineDetail = findRelatedFallbackDetail(recipe, safeItems);
      detailMemoryCache.set(recipe.id, offlineDetail);
      setDetail(offlineDetail);
      setDetailError(true);
      setAiState('offline');
    } finally {
      if (thisRequest === detailRequestId.current) setIsLoadingDetail(false);
    }
  }, [safeItems, aiState, selectedRecipe, servings]);

  useEffect(() => {
    if (timer === null) return;
    if (timer.seconds <= 0) {
      setTimer(null);
      showToast('타이머가 끝났어요. 다음 단계를 확인해 주세요.');
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(250);
      return;
    }
    const timeout = window.setTimeout(() => setTimer(current => current && ({ ...current, seconds: current.seconds - 1 })), 1000);
    return () => window.clearTimeout(timeout);
  }, [timer, showToast]);

  const handleRefinement = (chip: string) => {
    if (!selectedRecipe || aiState !== 'online') return;
    const next = refinements.includes(chip) ? refinements.filter(item => item !== chip) : [...refinements, chip];
    void loadDetail(selectedRecipe, next, true);
  };

  const activeRecipes = previewOnly ? recipes.slice(0, 1) : recipes;
  const closeDetail = () => { detailRequestId.current += 1; setSelectedRecipe(null); setDetail(null); setTimer(null); };
  const usedItems = selectedRecipe ? selectedRecipe.usedItemIds.map(id => safeItems.find(item => String(item.id) === String(id))).filter((item): item is RecipeFridgeItem => Boolean(item)) : [];
  const checkedCount = detail?.steps.filter((_, index) => checkedSteps.includes(index)).length || 0;
  const stepProgress = detail?.steps.length ? Math.round((checkedCount / detail.steps.length) * 100) : 0;
  const expiredUsedItems = usedItems.filter(item => item.expiryDays < 0 && selectedIngredientIds.some(id => String(id) === String(item.id)));
  const quantityMultiplier = selectedRecipe ? servings / Math.max(1, selectedRecipe.servings || 1) : 1;

  const copyRecipe = () => {
    if (!selectedRecipe || !detail) return;
    const lines = [selectedRecipe.title, `재료: ${usedItems.map(item => item.name).join(', ')}${selectedRecipe.extraIngredients.length ? `, ${selectedRecipe.extraIngredients.join(', ')}` : ''}`, ...detail.steps.map((step, index) => `${index + 1}. ${step.title}: ${step.instruction}`)];
    copyToClipboard(lines.join('\n'), '레시피를 복사했어요.');
  };

  const addAllIngredients = () => {
    if (!selectedRecipe) return;
    selectedRecipe.extraIngredients.forEach(name => onAddShoppingItem(name, true));
    if (selectedRecipe.extraIngredients.length) showToast('추가 재료를 장보기에 담았어요.');
  };

  return (
    <section className="flex flex-col" style={{ gap: 'var(--space-3)' }}>
      <div className="flex items-center justify-between" style={{ padding: '0 4px', gap: 'var(--space-2)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center" style={{ gap: 'var(--space-2)' }}>
          <span className="t-card-title">{previewOnly ? '오늘의 구출 레시피 1개' : '임박 재료 구출 레시피'}</span>
          {!previewOnly && <span className="t-sub">요리 완료 시 식비 절약 기록</span>}
        </div>
        <button type="button" onClick={() => void generateList(true)} disabled={isLoadingList} className="ui-btn ui-btn-text shrink-0" style={{ minHeight: '36px', padding: '0 6px' }}>
          <RefreshCw className={`w-4 h-4 ${isLoadingList ? 'animate-spin' : ''}`} strokeWidth={1.5} /><span>{previewOnly ? '새로고침' : '다른 레시피 보기'}</span>
        </button>
      </div>
      {aiState === 'offline' && recipes.length > 0 && <p className="t-caption" style={{ margin: '0 4px', color: 'var(--text-secondary)' }}>오프라인 레시피로 보여드려요</p>}
      {isLoadingList ? (
        <div className="thin-list-container" aria-label="레시피 불러오는 중">{[0, 1, 2].map(index => <div key={index} className="thin-row" style={{ minHeight: '64px', alignItems: 'flex-start' }}><div className="w-5 h-5 rounded-full" style={{ background: 'var(--bg-subtle)' }} /><div className="flex-1 flex flex-col" style={{ gap: '8px' }}><div className="h-4 rounded" style={{ width: `${60 + index * 7}%`, background: 'var(--bg-subtle)' }} /><div className="h-3 rounded" style={{ width: '82%', background: 'var(--bg-subtle)' }} /></div></div>)}</div>
      ) : activeRecipes.length === 0 ? (
        <div className="ui-card flex flex-col items-center text-center" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
          <Utensils className="w-6 h-6" style={{ color: 'var(--text-disabled)' }} />
          <p className="t-body-semibold" style={{ margin: 0 }}>재료가 부족해요. 영수증을 등록하거나 장보기 리스트를 확인해보세요</p>
              <button type="button" className="ui-btn ui-btn-outline" onClick={onReceipt}><Plus className="w-4 h-4" />영수증 등록</button>
        </div>
      ) : (
        <div className="thin-list-container">
          {activeRecipes.map(recipe => {
            const recipeItems = recipe.usedItemIds.map(id => safeItems.find(item => String(item.id) === String(id))).filter((item): item is RecipeFridgeItem => Boolean(item));
            return <button key={recipe.id} type="button" onClick={() => void loadDetail(recipe, [])} className="thin-row thin-row-clickable w-full text-left bg-transparent border-x-0 border-t-0" style={{ minHeight: '64px', gap: 'var(--space-3)' }}>
              <div className="flex flex-col" style={{ minWidth: 0, flex: 1, gap: '4px' }}>
                <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-2)' }}>
                  <Utensils className="w-4 h-4 shrink-0" strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
                  <span className="t-body-semibold">{recipe.title}</span>
                  <span className="ui-chip ui-chip-subtle"><Clock3 className="w-3 h-3" />{minuteLabel(recipe.timeMinutes)}</span>
                  <span className="ui-chip ui-chip-subtle">{recipe.difficulty}</span>
                </div>
                <span className="t-sub truncate">{recipe.summary}</span>
                <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
                  {recipeItems.map(item => <span key={item.id} className="t-caption flex items-center" style={{ gap: '4px', color: 'var(--text-secondary)' }}>
                    {item.expiryDays <= 1 && <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: item.expiryDays < 0 ? 'var(--color-status-urgent)' : 'var(--color-status-warning)' }} />}
                    {item.name}{item.expiryDays < 0 ? ' · 상태 확인 필요' : ''}
                  </span>)}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 shrink-0" strokeWidth={1.5} style={{ color: 'var(--text-disabled)' }} />
            </button>;
          })}
        </div>
      )}

      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,.5)', padding: 'var(--space-2)' }} onMouseDown={event => { if (event.target === event.currentTarget) closeDetail(); }}>
          <div role="dialog" aria-modal="true" aria-label={selectedRecipe.title} className="w-full max-w-2xl flex flex-col" style={{ maxHeight: '90dvh', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sheet)', boxShadow: 'var(--shadow-floating)', overflow: 'hidden' }}>
            <div className="flex items-start justify-between" style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-hairline)', gap: 'var(--space-3)' }}>
              <div style={{ minWidth: 0 }}><h2 className="t-card-title" style={{ margin: '0 0 8px 0' }}>{selectedRecipe.title}</h2><div className="flex flex-wrap" style={{ gap: '6px' }}><span className="ui-chip ui-chip-subtle">{minuteLabel(selectedRecipe.timeMinutes)}</span><span className="ui-chip ui-chip-subtle">{selectedRecipe.difficulty}</span><span className="ui-chip ui-chip-subtle">{servings}인분</span></div></div>
              <button type="button" aria-label="닫기" className="ui-btn-icon shrink-0" onClick={closeDetail}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ padding: 'var(--space-4) var(--space-5)', overscrollBehavior: 'contain' }}>
              {expiredUsedItems.length > 0 && <div className="flex items-start" style={{ padding: '10px 12px', marginBottom: 'var(--space-3)', borderRadius: 'var(--radius-btn)', backgroundColor: 'var(--color-status-warning-soft)', color: 'var(--text-primary)', gap: '8px' }}><AlertTriangle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-status-warning)' }} /><span className="t-sub">유통기한이 지난 재료가 있어요. 먹기 전에 상태를 확인하고 드세요.</span></div>}
              <div className="flex flex-wrap items-center justify-between" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <span className="t-body-semibold">인분 조절</span>
                <div className="flex items-center" style={{ gap: 'var(--space-2)' }}><button type="button" className="ui-btn-icon" aria-label="인분 줄이기" disabled={servings <= 1} onClick={() => setServings(value => Math.max(1, value - 1))}><Minus className="w-4 h-4" /></button><span className="t-body-semibold tabular-nums">{servings}인분</span><button type="button" className="ui-btn-icon" aria-label="인분 늘리기" disabled={servings >= 4} onClick={() => setServings(value => Math.min(4, value + 1))}><Plus className="w-4 h-4" /></button></div>
              </div>
              <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
                <section><h3 className="t-body-semibold" style={{ margin: '0 0 8px 0' }}>냉장고에 있어요</h3>{usedItems.map(item => <div key={item.id} className="thin-row" style={{ minHeight: '44px', padding: '8px 0' }}><div className="flex items-center" style={{ gap: '8px', minWidth: 0 }}><Check className="w-4 h-4" style={{ color: 'var(--color-primary)' }} /><span className="t-body-semibold truncate">{item.name}</span><span className="t-sub">{scaledQuantity(item.quantity, quantityMultiplier)}</span></div><span className={`ui-chip ${item.expiryDays < 0 ? 'ui-chip-urgent' : item.expiryDays <= 1 ? 'ui-chip-warning' : 'ui-chip-subtle'}`}>{expiryLabel(item.expiryDays)}</span></div>)}</section>
                {selectedRecipe.extraIngredients.length > 0 && <section><div className="flex items-center justify-between" style={{ marginBottom: '8px', gap: 'var(--space-2)' }}><h3 className="t-body-semibold" style={{ margin: 0 }}>추가로 필요해요</h3><button type="button" className="ui-btn ui-btn-text" style={{ minHeight: '34px', padding: '0 4px' }} onClick={addAllIngredients}>추가 재료 모두 담기</button></div>{selectedRecipe.extraIngredients.map(name => <div key={name} className="thin-row" style={{ minHeight: '44px', padding: '8px 0' }}><span className="t-body-semibold">{name}</span><button type="button" className="ui-btn ui-btn-text" style={{ minHeight: '34px', padding: '0 4px' }} onClick={() => onAddShoppingItem(name)}>장보기에 담기</button></div>)}</section>}
                {selectedRecipe.tools.length > 0 && <p className="t-sub" style={{ margin: 0 }}>필요 도구: {selectedRecipe.tools.join(' · ')}</p>}
                <section>
                  <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}><h3 className="t-body-semibold" style={{ margin: 0 }}>조리 단계</h3><span className="t-caption">{checkedCount}/{detail?.steps.length || 0} 완료</span></div>
                  <div style={{ height: '5px', borderRadius: '99px', background: 'var(--bg-subtle)', overflow: 'hidden', marginBottom: 'var(--space-3)' }}><div style={{ width: `${stepProgress}%`, height: '100%', background: 'var(--color-primary)', transition: 'width 200ms ease-out' }} /></div>
                  {aiState === 'offline' ? <div className="flex items-center" style={{ gap: '6px', marginBottom: '8px' }}><span className="t-caption" style={{ color: 'var(--text-secondary)' }}>AI 연결 시 사용할 수 있어요</span></div> : <div className="flex items-center overflow-x-auto" style={{ gap: '6px', marginBottom: 'var(--space-3)', paddingBottom: '4px' }}>{REFINEMENTS.map(chip => <button type="button" key={chip} disabled={aiState !== 'online' || isLoadingDetail} onClick={() => handleRefinement(chip)} className={`ui-chip ${refinements.includes(chip) ? 'ui-chip-normal' : 'ui-chip-subtle'}`} style={{ whiteSpace: 'nowrap', border: 'none', cursor: aiState === 'online' ? 'pointer' : 'not-allowed', opacity: aiState === 'online' ? 1 : .55 }}>{chip}</button>)}{refinements.length > 0 && <button type="button" className="ui-btn ui-btn-text shrink-0" onClick={() => void loadDetail(selectedRecipe, [], true)}>초기화</button>}</div>}
                  {isLoadingDetail ? <div aria-label="단계 생성 중">{[0, 1, 2].map(i => <div key={i} className="thin-row" style={{ minHeight: '68px' }}><div className="w-7 h-7 rounded-full" style={{ background: 'var(--bg-subtle)' }} /><div className="flex-1 flex flex-col" style={{ gap: '8px' }}><div className="h-4 rounded" style={{ width: '35%', background: 'var(--bg-subtle)' }} /><div className="h-3 rounded" style={{ width: '90%', background: 'var(--bg-subtle)' }} /></div></div>)}</div> : detail && <div>{detail.steps.map((step, index) => { const complete = checkedSteps.includes(index); const activeTimer = timer?.stepIndex === index ? timer.seconds : null; return <div key={`${index}-${step.title}`} className="thin-row" style={{ minHeight: '68px', alignItems: 'flex-start', gap: 'var(--space-3)' }}><button type="button" aria-label={`${step.title} 완료`} onClick={() => setCheckedSteps(list => complete ? list.filter(item => item !== index) : [...list, index])} className="flex items-center justify-center shrink-0" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid var(--border-hairline)', background: complete ? 'var(--color-primary)' : 'var(--bg-subtle)', color: '#fff' }}>{complete ? <Check className="w-4 h-4" /> : index + 1}</button><div className="flex-1" style={{ minWidth: 0 }}><div className={`t-body-semibold ${complete ? 'strike-animated is-done' : ''}`}>{step.title}</div><p className="t-sub" style={{ margin: '3px 0 0 0', lineHeight: 1.5 }}>{step.instruction}</p>{step.timerSeconds && <button type="button" className="ui-btn ui-btn-outline" style={{ minHeight: '32px', marginTop: '8px', padding: '0 9px', fontSize: '12px' }} onClick={() => setTimer(activeTimer === null ? { stepIndex: index, seconds: step.timerSeconds! } : null)}>{activeTimer === null ? `${Math.ceil(step.timerSeconds / 60)}분 타이머` : `${Math.floor(activeTimer / 60)}:${String(activeTimer % 60).padStart(2, '0')} · 중지`}</button>}</div></div>; })}{detail.tips.length > 0 && <p className="t-sub" style={{ margin: 'var(--space-3) 0 0 0' }}>팁: {detail.tips.join(' · ')}</p>}<p className="t-sub" style={{ margin: '8px 0 0 0' }}>보관: {detail.storage}</p>{detailError && <p className="t-caption" style={{ color: 'var(--text-secondary)' }}>오프라인 레시피로 보여드려요</p>}</div>}
                </section>
              </div>
            </div>
            <div style={{ padding: 'var(--space-3) var(--space-5) calc(var(--space-3) + env(safe-area-inset-bottom))', borderTop: '1px solid var(--border-hairline)', background: 'var(--bg-card)' }}>
              <p className="t-caption" style={{ margin: '0 0 8px 0' }}>사용한 재료 (필요 없는 재료는 체크를 해제하세요)</p>
              <div className="flex overflow-x-auto" style={{ gap: 'var(--space-2)', paddingBottom: '8px' }}>{usedItems.map(item => <label key={item.id} className="ui-chip ui-chip-subtle shrink-0" style={{ gap: '5px' }}><input type="checkbox" checked={selectedIngredientIds.some(id => String(id) === String(item.id))} onChange={event => setSelectedIngredientIds(ids => event.target.checked ? [...ids, item.id] : ids.filter(id => String(id) !== String(item.id)))} style={{ accentColor: 'var(--color-primary)' }} />{item.name}</label>)}</div>
              <div className="flex flex-col sm:flex-row" style={{ gap: 'var(--space-2)' }}><button type="button" className="ui-btn ui-btn-primary flex-1" disabled={selectedIngredientIds.length === 0 || isLoadingDetail} onClick={() => { if (onCook(selectedRecipe, selectedIngredientIds)) closeDetail(); }}><Check className="w-4 h-4" />이 레시피로 요리했어요</button><button type="button" className="ui-btn ui-btn-text" disabled={!detail} onClick={copyRecipe}>레시피 복사</button></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
