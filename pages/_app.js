import '../styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar/navbar';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute/protectedRoute';
import { Toaster } from 'react-hot-toast';

const noAuthRequired = ['/', '/login', '/signup'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
      
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
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
