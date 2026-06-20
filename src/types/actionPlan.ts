export interface ActionPlanRecord {
  id: string;
  date: string;
  responses: Record<number, { score: 'FM'|'PM'|'NM'|'NA'|null; notes: string }>;
  focusIds: number[];
}
