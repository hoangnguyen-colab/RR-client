import '../styles/globals.css';
import { SocketProvider } from '@contexts/SocketContext';
import { UserProvider } from '@contexts/UserContext';
import { AuthProvider } from '@contexts/AuthContext';
import cookie from 'cookie';
import App from 'next/app';
function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </SocketProvider>
  )
}

MyApp.getInitialProps = async appContext => {
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    authenticated = !!request.cookies.token;
  }
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated };
};

export default MyApp
