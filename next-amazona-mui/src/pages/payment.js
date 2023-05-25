import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/checkoutWizard';
import { Store } from '@/utils/Store';
import useStyles from '@/utils/styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

export default function Payment() {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');

  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod'));
    }
  }, []);
  return (
    <Layout title={'Payment Method'}>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}></form>
    </Layout>
  );
}
