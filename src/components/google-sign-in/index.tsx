import { Button, Icon } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../hooks/useAuth';

const GoogleSignIn = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <Button
      type="button"
      leftIcon={<Icon as={FcGoogle} />}
      colorScheme="pink"
      variant="outline"
      isFullWidth
      onClick={() => signInWithGoogle()}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignIn;
