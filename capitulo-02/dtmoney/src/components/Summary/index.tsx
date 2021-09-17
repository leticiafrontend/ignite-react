import { useTransactions } from '../../hooks/useTransactions';

import { Card } from './Card';
import { Container } from './styles';

import entradas from '../../assets/entradas.svg';
import saidas from '../../assets/saidas.svg';
import total from '../../assets/total.svg';

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraw: 0,
      total: 0,
    },
  );
  console.log(summary);
  return (
    <Container>
      <Card
        type="Entradas"
        image={entradas}
        value={new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.deposits)}
      />
      <Card
        type="Saídas"
        image={saidas}
        value={new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.withdraw)}
      />
      <Card
        type="Total"
        image={total}
        value={new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.total)}
      />
    </Container>
  );
};
