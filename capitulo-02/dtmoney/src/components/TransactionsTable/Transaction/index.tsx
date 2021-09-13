import React from 'react';
import { Container } from './styles';

interface TransactionProps {
  title: string;
  price: string;
  category: string;
  date: string;
}

export const Transaction = ({
  title,
  price,
  category,
  date,
}: TransactionProps) => {
  return (
    <Container>
      <td>{title}</td>
      <td>{price}</td>
      <td>{category}</td>
      <td>{date}</td>
    </Container>
  );
};
