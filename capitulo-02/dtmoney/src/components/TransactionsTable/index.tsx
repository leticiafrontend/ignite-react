import React from 'react';
import { Container } from './styles';
import { Transaction } from './Transaction';

export const TransactionsTable = () => {
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
          <Transaction
            title="Desenvolvimento de site"
            price="12.000,00"
            category="Desenvolvimento"
            date="20/12/2020"
          />
          <Transaction
            title="Desenvolvimento de site"
            price="12.000,00"
            category="Desenvolvimento"
            date="20/12/2020"
          />
          <Transaction
            title="Desenvolvimento de site"
            price="12.000,00"
            category="Desenvolvimento"
            date="20/12/2020"
          />
        </tbody>
      </table>
    </Container>
  );
};
