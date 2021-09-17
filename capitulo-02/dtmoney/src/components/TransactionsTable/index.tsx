import React, { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { Container } from './styles';
import { Transaction } from './Transaction';

export const TransactionsTable = () => {
  const { transactions } = useContext(TransactionsContext);

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
