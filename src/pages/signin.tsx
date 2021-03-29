import { Button, IconButton } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { BiShow, BiHide } from 'react-icons/bi';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Center, Heading, Link, Text, VStack } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import GoogleSignIn from '../components/google-sign-in';

const SignUp = () => {
  // @ts-ignore
  const { user, signin, isLoading } = useAuth();
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, togglePassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const onSubmit = (data: { email: string; password: string }) => {
    signin(data.email, data.password);
  };

  return (
    <Center minH="100vh" p="0.5rem">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '25rem' }}>
        <VStack p="1rem" border="1px" borderRadius="lg" borderColor="gray.300" spacing={5}>
          <Heading as="h1">Sign in</Heading>
          <FormControl isRequired isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" name="email" type="email" ref={register({ required: true })} />
            <FormErrorMessage>{errors.email && 'Please enter a valid email'}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                ref={register({ required: true })}
              />
              <InputRightElement w="2.5rem">
                <IconButton
                  size="sm"
                  aria-label="show"
                  icon={<Icon as={showPassword ? BiHide : BiShow} />}
                  onClick={() => togglePassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password && 'Please enter a password'}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="pink" isFullWidth type="submit">
            Sign in
          </Button>
          <GoogleSignIn />
          <Text>
            Don't have an account?{' '}
            <Link color="pink.500" href="/signup">
              Sign up
            </Link>
          </Text>
        </VStack>
      </form>
    </Center>
  );
};

export default SignUp;
