import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface Transactions {
  id: number;
  title: string;
  amount: number;
  category: string;
  createAt: string;
  type: 'deposit' | 'withdraw';
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<Transactions[]>([]);

export const TransactionsContextProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  useEffect(() => {
    api
      .get('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
};
