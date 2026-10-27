export type HomeNextAction = {
  type: 'bill' | 'recycle' | 'fridge' | 'routine' | 'clear';
  targetId?: string | number;
  targetName?: string;
  title: string;
  detail: string;
  hotspotId?: string;
};

type BillCandidate = { id: string | number; name: string; dDay: number };
type FridgeCandidate = { id: string | number; name: string; expiryDays: number };
type RoutineCandidate = { id: string | number; title: string; completedToday: boolean };

/** Returns the single next home action in the product priority order. */
export function getNextAction(input: {
  bills: BillCandidate[];
  recycleTypes: string[];
  recycleDone: boolean;
  fridgeItems: FridgeCandidate[];
  routines: RoutineCandidate[];
}): HomeNextAction {
  const bill = [...input.bills].filter(item => item.dDay <= 0).sort((a, b) => a.dDay - b.dDay)[0];
  if (bill) return { type: 'bill', targetId: bill.id, targetName: bill.name, title: `${bill.name} 공과금 납부하기`, detail: '오늘 마감 공과금', hotspotId: 'bills' };

  if (!input.recycleDone && input.recycleTypes.length) {
    return { type: 'recycle', title: '오후 8시 · 분리수거 배출하기', detail: `오늘 ${input.recycleTypes.length}종 배출`, hotspotId: 'recycle' };
  }

  const food = [...input.fridgeItems].filter(item => item.expiryDays <= 0).sort((a, b) => a.expiryDays - b.expiryDays)[0];
  if (food) return { type: 'fridge', targetId: food.id, targetName: food.name, title: `${food.name} 상태 확인하고 먼저 먹기`, detail: food.expiryDays < 0 ? `유통기한 ${Math.abs(food.expiryDays)}일 지남 · 상태 확인 필요` : '오늘 유통기한 만료', hotspotId: 'fridge' };

  const routine = input.routines.find(item => !item.completedToday);
  if (routine) return { type: 'routine', targetId: routine.id, targetName: routine.title, title: `${routine.title} 완료하기`, detail: '이번 주 미완료 루틴', hotspotId: 'chores' };

  return { type: 'clear', title: '오늘은 다 끝났어요', detail: '오늘 챙길 일이 모두 완료됐어요' };
}
