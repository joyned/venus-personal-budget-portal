import { ExpenseType } from './ExpenseTypeEnum';

export interface ExpenseHistory {
  id?: string;
  item: string;
  value: number;
  date: Date;
  type: ExpenseType;
}
