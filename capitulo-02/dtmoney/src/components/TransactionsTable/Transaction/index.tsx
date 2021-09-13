import React from 'react';
import { Container } from './styles';

interface TransactionProps {
  title: string;
  amount: string;
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
      <td className={type}>R$ {amount}</td>
      <td>{category}</td>
      <td>{date}</td>
    </Container>
  );
};
