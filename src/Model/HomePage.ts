import { Budget } from './Budget';

export interface HomePage {
  lastMonthCredit: number;
  currentMonthCredit: number;
  creditDiff: number;

  lastMonthDebit: number;
  currentMonthDebit: number;
  debitDiff: number;

  budget: Budget[];

  fixExpenseTotal: number;
  ifoodExpenseTotal: number;
  appCarExpenseTotal: number;
  girlfriendExpenseTotal: number;
}
