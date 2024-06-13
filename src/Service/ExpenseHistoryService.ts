import { ExpenseHistory } from '../Model/ExpenseHistory';
import { doDelete, doGet, doPost } from './HttpService';

const findExpensesByType = (type: string): Promise<ExpenseHistory[]> => {
  return doGet<ExpenseHistory[]>(`/expense-history?type=${type}`);
};

const totalFromCurrentMonth = (): Promise<number> => {
  return doGet('/expense-history/total');
};

const saveExpense = (expense: ExpenseHistory) => {
  return doPost('/expense-history', expense);
};

const deleteExpense = (id: string) => {
  return doDelete(`/expense-history/${id}`);
};

export {
  findExpensesByType,
  saveExpense,
  deleteExpense,
  totalFromCurrentMonth,
};
