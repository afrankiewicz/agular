import PropTypes from "prop-types";
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
import { setSession } from "../../utils";

async function loginUser({ email, password }) {
  return axios.post('http://localhost:8080/login', {
    email,
    password
  })
}


export default function Login({ setToken }) {
  const [email, setEmail] = useState("agata.fran@gmail.pl");
  const [password, setPassword] = useState("123");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });
    setSession(response.data.token);
    setToken(response.data.token);
  }
  return(
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ paddingTop: '5rem' }}>
        Sign in
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
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link onClick={() => navigate("/register")} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}