import { HomePage } from '../Model/HomePage';
import { doGet } from './HttpService';

const buildHomePage = () => {
  return doGet<HomePage>(`/home`);
};

export { buildHomePage };
