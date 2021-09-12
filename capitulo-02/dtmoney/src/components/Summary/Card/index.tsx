import React from 'react';
import { Container } from './styles';

interface CardProps {
  type: string;
  image: string;
  value: string;
}

export const Card = ({ type, image, value }: CardProps) => {
  return (
    <Container>
      <div>
        <header>
          <p>{type}</p>
          <img src={image} alt="entradas" />
        </header>
        <strong>R$ {value}</strong>
      </div>
    </Container>
  );
};
