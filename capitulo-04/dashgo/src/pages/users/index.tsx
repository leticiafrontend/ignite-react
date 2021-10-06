import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
  Text,
  useBreakpointValue,
  Spinner,
  Link as LinkC,
} from '@chakra-ui/react';
import Link from 'next/link';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import { RiUserAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from '../../hooks/useUsers';
import { useState } from 'react';

export const UsersList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  console.log(data);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handlePrefetchUser = async (userId: number) => {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      },
    );
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiUserAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              Falha ao obter dados dos usuários
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      color="gray.300"
                      width="8"
                    >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Th px={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Th>
                        <Td>
                          <Box>
                            <LinkC
                              color="purple"
                              onMouseEnter={() =>
                                handlePrefetchUser(Number(user.id))
                              }
                            >
                              <Text fontWeight="bold">
                                {user.name}
                              </Text>
                            </LinkC>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} />}
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default UsersList;
