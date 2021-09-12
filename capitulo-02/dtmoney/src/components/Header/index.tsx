import React from 'react';

import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

export const Header = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="dtmoney" />
        <button type="button">Nova transação</button>
      </Content>
    </Container>
  );
};
