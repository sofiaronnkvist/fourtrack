import '../styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute/protectedRoute';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/theme';
import Head from 'next/head';

const noAuthRequired = ['/'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fourtrack</title>
        <meta name='Fourtrack' content='A better way for recording music' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AuthContextProvider>
        {/* <Theme> */}
        <ThemeProvider theme={theme}>
          {/* <Navbar /> */}
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </ThemeProvider>
        {/* </Theme> */}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
