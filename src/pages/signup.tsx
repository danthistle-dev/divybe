import { Button, IconButton } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { BiShow, BiHide, BiInfoCircle } from 'react-icons/bi';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Center, Heading, Link, Text, VStack, UnorderedList, ListItem } from '@chakra-ui/layout';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import GoogleSignIn from '../components/google-sign-in';

const SignUp = () => {
  // @ts-ignore
  const { signup, user, isLoading } = useAuth();
  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, togglePassword] = useState(false);
  const [showConfirm, toggleConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const onSubmit = (data: { email: string; password: string }) => {
    signup(data.email, data.password);
  };

  return (
    <Center minH="100vh" p="0.5rem">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '25rem' }}>
        <VStack p="1rem" border="1px" borderRadius="lg" borderColor="gray.300" spacing={5}>
          <Heading as="h1">Create an account</Heading>
          <FormControl isRequired isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" name="email" type="email" ref={register({ required: true })} />
            <FormErrorMessage>{errors.email && 'Please enter a valid email'}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: 8,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?!.*[\s])/,
              }}
              render={({ onChange, value }) => (
                <InputGroup size="md">
                  <Input
                    value={value}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    onChange={(e) => {
                      setPasswordCheck(e.target.value);
                      onChange(e.target.value);
                    }}
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
              )}
            />
            <FormErrorMessage>
              {errors.password && 'Password must satisfy all conditions'}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.confirm)}>
            <FormLabel htmlFor="confirm">Confirm password</FormLabel>
            <InputGroup size="md">
              <Input
                id="confirm"
                name="confirm"
                type={showConfirm ? 'text' : 'password'}
                ref={register({ required: true, validate: (val) => val === passwordCheck })}
              />
              <InputRightElement w="2.5rem">
                <IconButton
                  size="sm"
                  aria-label="show"
                  icon={<Icon as={showConfirm ? BiHide : BiShow} />}
                  onClick={() => toggleConfirm(!showConfirm)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.confirm && 'Passwords must match'}</FormErrorMessage>
            <FormHelperText>
              <Popover placement="right">
                <PopoverTrigger>
                  <IconButton
                    aria-label="password rules"
                    icon={<Icon as={BiInfoCircle} boxSize="1rem" />}
                    variant="unstyled"
                    size="xs"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <Text>Your password must contain:</Text>
                    <UnorderedList stylePosition="inside">
                      <ListItem>at least 8 characters</ListItem>
                      <ListItem>at least one digit</ListItem>
                      <ListItem>at least one upper case character</ListItem>
                      <ListItem>at least one lower case character</ListItem>
                      <ListItem>
                        at least one special character: <b>!@#$%&*^</b>
                      </ListItem>
                      <ListItem>no white space</ListItem>
                    </UnorderedList>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormHelperText>
          </FormControl>
          <Button colorScheme="pink" isFullWidth type="submit" isLoading={isLoading}>
            Sign up
          </Button>
          <GoogleSignIn />
          <Text>
            Already have an account?{' '}
            <Link color="pink.500" href="/signin">
              Sign in
            </Link>
          </Text>
        </VStack>
      </form>
    </Center>
  );
};

export default SignUp;
