export interface Expense {
  id: string;
  date: string;
  name: string;
  amount: number;
  category: Category;
}

export type Category = 'Food' | 'Home Rent' | 'Studies' | 'Miscellaneous';

export interface MonthlyExpenditure {
  Food: number;
  'Home Rent': number;
  Studies: number;
  Miscellaneous: number;
}