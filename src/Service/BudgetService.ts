import { Budget } from '../Model/Budget';
import { doGet, doPost } from './HttpService';

const findBudget = (): Promise<Budget[]> => {
  return doGet<Budget[]>('/budget');
};

const saveBudget = (body: Budget[]): Promise<Budget[]> => {
  return doPost('/budget', body);
};

export { findBudget, saveBudget };
