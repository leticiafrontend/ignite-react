import styled from 'styled-components';

export const Container = styled.tr`
  td {
    padding: 1rem 2rem;
    border: 0;
    background: var(--white);
    color: var(--text);
    border-radius: 0.25rem;

    &:first-child {
      color: var(--title);
    }
  }
`;
