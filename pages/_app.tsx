// _app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    /* @ts-ignore Next.js AppProps type does not work for pageProps.session here 😔 */
    < SessionProvider session={pageProps.session} >
      <Component {...pageProps} />
    </SessionProvider >
  );
};

export default App;