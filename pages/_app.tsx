import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min' as string);
  }, []);

  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
