import {
  FormControl,
  FormLabel,
  Input as InputLib,
  InputProps as InputPropsLib,
} from '@chakra-ui/react';

interface InputProps extends InputPropsLib {
  name: string;
  label?: string;
}

export const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={label}>{label}</FormLabel>}
      <InputLib
        name={name}
        type={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: 'gray.900' }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
};
