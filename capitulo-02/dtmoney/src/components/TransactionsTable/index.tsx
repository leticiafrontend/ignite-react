import React, { useContext, useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';
import { Transaction } from './Transaction';

export const TransactionsTable = () => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              title={transaction.title}
              amount={transaction.amount}
              category={transaction.category}
              date={transaction.createAt}
              type={transaction.type}
            />
          ))}
        </tbody>
      </table>
    </Container>
  );
};
