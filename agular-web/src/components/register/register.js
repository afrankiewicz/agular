import { useState } from "react";
import axios from "axios";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
async function registerUser({ email, password, firstName, lastName }) {
  return axios.post('http://localhost:8080/user/register', {
    email,
    password,
    firstName,
    lastName
  })
}


export default function Register() {
  const [email, setEmail] = useState("agata.fran@gmail.pl");
  const [password, setPassword] = useState("123");
  const [firstName, setFirstName] = useState("123");
  const [lastName, setLastName] = useState("123");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser({
      email,
      password,
      firstName,
      lastName,
    });
    // setToken(response.data.token);
  }
  return(
    <Container component="main" maxWidth="xs">
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