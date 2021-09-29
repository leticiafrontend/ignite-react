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
} from '@chakra-ui/react';
import { RiUserAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export const UsersList = () => {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiUserAddLine} />}
            >
              Criar novo
            </Button>
          </Flex>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                <Th>Data de cadastro</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th px="6">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Letícia Silva</Text>
                    <Text fontSize="sm" color="gray.300">
                      leticia.alesilva@outlook.com
                    </Text>
                  </Box>
                </Td>
                <Td>04 de Abril, 2021</Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} />}
                  >
                    Criar novo
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
};

export default UsersList;
