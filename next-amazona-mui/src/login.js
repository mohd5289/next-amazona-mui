import Layout from '@/components/Layout';
import useStyles from '@/utils/styles';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Store } from '@/utils/Store';

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  console.log(state);
  const { userInfo } = state;

  // if (!userInfo) {
  //   router.push('/');
  // }
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
      alert('success login');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
  return (
    <Layout title="Login">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <Link href="/register" passHref>
              <MUILink>Register</MUILink>
            </Link>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
