import { useState, FormEvent } from 'react';

import Modal from 'react-modal';

import closeImg from '../../assets/fechar.svg';
import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg';

import { Button, Container, TransactionTypeContainer } from './styles';
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  const handleCreateNewTransition = (event: FormEvent) => {
    event.preventDefault();
    api.post('/transactions', data);
  };

  const data = { title, value, category, type };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar" />
      </button>
      <Container onSubmit={handleCreateNewTransition}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          placeholder="Valor"
          value={value}
          onChange={({ target }) => setValue(Number(target.value))}
        />
        <TransactionTypeContainer>
          <Button
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            Entrada
          </Button>
          <Button
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saida" />
            Saida
          </Button>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
