export type BillType = '관리비' | '수도세' | '전기세' | '가스비' | '통신·구독' | '월세' | '기타';
export type BillSource = 'manual' | 'contract';

export interface BillItem {
  id: number | string;
  type: BillType;
  name: string;
  amount: number;
  prevAmount: number;
  dueDay: number;
  paidMonths: string[];
  splitIncluded: boolean;
  icon: string;
  source: BillSource;
}

export type BillStatusKind = 'paid' | 'overdue' | 'today' | 'upcoming';
export interface BillStatus {
  dDay: number;
  kind: BillStatusKind;
  label: string;
}

export function getBillStatus(bill: Pick<BillItem, 'dueDay' | 'paidMonths'>, today: string): BillStatus {
  const [year, month, day] = today.split('-').map(Number);
  const yearMonth = `${year}-${String(month).padStart(2, '0')}`;
  const lastDay = new Date(year, month, 0).getDate();
  const dueDate = new Date(year, month - 1, Math.min(Math.max(1, bill.dueDay || 1), lastDay));
  const todayDate = new Date(year, month - 1, day);
  const dDay = Math.round((dueDate.getTime() - todayDate.getTime()) / 86400000);
  if (bill.paidMonths.includes(yearMonth)) return { dDay, kind: 'paid', label: '납부 완료' };
  if (dDay < 0) return { dDay, kind: 'overdue', label: '기한 지남' };
  if (dDay === 0) return { dDay, kind: 'today', label: '오늘 마감' };
  return { dDay, kind: 'upcoming', label: `${dDay}일 남음` };
}

const iconByType: Record<BillType, string> = {
  '관리비': 'building', '수도세': 'droplets', '전기세': 'zap', '가스비': 'flame', '통신·구독': 'wifi', '월세': 'building', '기타': 'building'
};
const validTypes: BillType[] = ['관리비', '수도세', '전기세', '가스비', '통신·구독', '월세', '기타'];

function inferDueDay(item: any, today: string): number {
  const textDay = String(item.dueDate || '').match(/매월\s*(\d{1,2})일/);
  if (textDay) return Math.min(31, Math.max(1, Number(textDay[1])));
  const [year, month, day] = today.split('-').map(Number);
  const textDiff = String(item.dueDate || '').match(/(\d{1,3})일\s*남음/);
  const legacyDiff = Number.isFinite(Number(item.dDay)) ? Number(item.dDay) : Number(textDiff?.[1] || 0);
  const guessed = new Date(year, month - 1, day + legacyDiff).getDate();
  return Math.min(31, Math.max(1, guessed));
}

export function normalizeBills(value: unknown, today: string, selectedIds: Array<string | number> = [1, 2, 3]): BillItem[] {
  if (!Array.isArray(value)) return [];
  const yearMonth = today.slice(0, 7);
  return value.map((raw: any, index) => {
    const type: BillType = validTypes.includes(raw?.type) ? raw.type : raw?.type === '통신/구독' ? '통신·구독' : '기타';
    const source: BillSource = raw?.source === 'contract' || raw?.fromContract ? 'contract' : 'manual';
    const id = raw?.id ?? `bill-${index}-${Date.now()}`;
    const paidMonths = Array.isArray(raw?.paidMonths)
      ? raw.paidMonths.filter((month: unknown) => typeof month === 'string')
      : raw?.isPaid ? [yearMonth] : [];
    return {
      id,
      type,
      name: String(raw?.name || ''),
      amount: Math.max(0, Number(raw?.amount) || 0),
      prevAmount: Math.max(0, Number(raw?.prevAmount ?? raw?.amount) || 0),
      dueDay: Math.min(31, Math.max(1, Number(raw?.dueDay) || inferDueDay(raw, today))),
      paidMonths,
      splitIncluded: typeof raw?.splitIncluded === 'boolean' ? raw.splitIncluded : selectedIds.includes(id),
      icon: iconByType[type],
      source
    };
  });
}

export function billIconForType(type: BillType): string {
  return iconByType[type];
}

export function sortBillsByStatus(bills: BillItem[], today: string): BillItem[] {
  return [...bills].sort((a, b) => {
    const statusA = getBillStatus(a, today);
    const statusB = getBillStatus(b, today);
    const group = (kind: BillStatusKind) => kind === 'paid' ? 1 : 0;
    if (group(statusA.kind) !== group(statusB.kind)) return group(statusA.kind) - group(statusB.kind);
    return statusA.dDay - statusB.dDay;
  });
}
