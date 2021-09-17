import React from 'react';
import { Container } from './styles';

interface TransactionProps {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'deposit' | 'withdraw';
}

export const Transaction = ({
  title,
  amount,
  category,
  date,
  type,
}: TransactionProps) => {
  return (
    <Container>
      <td>{title}</td>
      <td className={type}>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(amount)}
      </td>
      <td>{category}</td>
      <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(date))}</td>
    </Container>
  );
};
