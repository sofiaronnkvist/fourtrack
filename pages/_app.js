import '../styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar/navbar';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute/protectedRoute';

const noAuthRequired = ['/', '/login', '/signup'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <Navbar />
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
