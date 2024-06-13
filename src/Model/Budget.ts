import { BudgetType } from './BudgetTypeEnum';

export interface Budget {
  id?: string;
  value: number;
  date: Date;
  type: BudgetType;
  left?: number;
}
