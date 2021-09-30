import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { Input } from './../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const sigInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória'),
});

const Home = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sigInFormSchema),
  });

  const { errors, isLoading } = formState;
  const handleSignIn: SubmitHandler<SignInFormData> = (data) => {
    console.log(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            name="email"
            type="email"
            label="E-mail"
            {...register}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            {...register}
            error={errors.password}
          />
          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Home;
