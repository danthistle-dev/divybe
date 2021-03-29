import { Box, Heading, HStack, Button } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  // @ts-ignore
  const { signout } = useAuth();

  return (
    <Box p="0.75rem" bg="pink.500">
      <HStack justify="space-between">
        <Heading color="white">divybe</Heading>
        <Button
          variant="outline"
          color="white"
          _hover={{ color: 'pink.500', bg: 'white' }}
          onClick={() => signout()}
          size="sm"
        >
          Sign out
        </Button>
      </HStack>
    </Box>
  );
};

export default Header;
