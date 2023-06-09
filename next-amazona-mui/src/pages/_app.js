import '@/styles/globals.css';
import { Store, StoreProvider } from '@/utils/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StoreProvider>
      <PayPalScriptProvider deferLoading={true} >
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </StoreProvider>
  );
}
