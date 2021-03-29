import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ProvideAuth } from '../hooks/useAuth';
import { Fonts } from '../styles/fonts';

const theme = extendTheme({
  fonts: {
    heading: 'Averia Serif Libre',
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
};
export default MyApp;
