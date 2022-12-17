import { useState } from "react";
import axios from "axios";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Alert, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

async function registerUser({ email, password, firstName, lastName, city, street }) {
  return axios.post('http://localhost:8080/users/register', {
    email,
    password,
    firstName,
    lastName,
    city,
    street
  })
}


export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrors(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        email,
        password,
        firstName,
        lastName,
        city,
        street
      });
      navigate('/')
    } catch (e) {
      setErrors(true);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={errors} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
          Incorrect input
        </Alert>
      </Snackbar>
      <Typography component="h1" variant="h5" sx={{ paddingTop: '5rem' }}>
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last name"
          name="lastName"
          onChange={e => setLastName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          onChange={e => setCity(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
          onChange={e => setStreet(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item>
            <Link onClick={() => navigate("/login")} variant="body2">
              {"Back to sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}