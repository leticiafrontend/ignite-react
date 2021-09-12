import React from 'react';

import { Card } from './Card';
import { Container } from './styles';

import entradas from '../../assets/entradas.svg';
import saidas from '../../assets/saidas.svg';
import total from '../../assets/total.svg';

export const Summary = () => {
  return (
    <Container>
      <Card type="Entradas" image={entradas} value="1.000,00" />
      <Card type="Saídas" image={saidas} value="1.000,00" />
      <Card type="Total" image={total} value="1.000,00" />
    </Container>
  );
};
