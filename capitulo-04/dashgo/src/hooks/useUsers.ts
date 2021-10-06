import { useQuery } from 'react-query';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('users');
  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    };
  });
  return users;
};

export const useUsers = (page: number) => {
  return useQuery(['users', page], getUsers, {
    staleTime: 1000 * 60 * 10,
  });
};
