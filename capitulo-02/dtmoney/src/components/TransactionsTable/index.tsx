import React, { useEffect } from 'react';
import { Container } from './styles';
import { Transaction } from './Transaction';
import { api } from '../../services/api';

export const TransactionsTable = () => {
  useEffect(() => {
    api.get('transactions').then((response) => console.log(response.data));
  });

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
            amount="12.000,00"
            category="Desenvolvimento"
            date="20/12/2020"
            type="deposit"
          />
          <Transaction
            title="Desenvolvimento de site"
            amount="12.000,00"
            category="Desenvolvimento"
            date="20/12/2020"
            type="deposit"
          />
          <Transaction
            title="Desenvolvimento de site"
            amount="- 12.000,00"
            category="Desenvolvimento"
            date="20/12/2020"
            type="withdraw"
          />
        </tbody>
      </table>
    </Container>
  );
};
