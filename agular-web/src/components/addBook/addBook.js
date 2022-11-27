import { useState } from "react";
import axios from "axios";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils";

async function addBook({ isbn, title, author, language }) {
  return axios.post('http://localhost:8080/book', {
    isbn,
    title,
    author,
    language
  }, { headers: { Authorization: `Bearer ${getToken()}` } })
}


export default function AddBook() {
  const [isbn, setIsbn] = useState((Math.random() + 1).toString(36).substring(7));
  const [title, setTitle] = useState("agata.fran@gmail.pl");
  const [author, setAuthor] = useState("agata.fran@gmail.pl");
  const [language, setLanguage] = useState("123");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({
      isbn,
      title,
      author,
      language
    });
    navigate('/')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ paddingTop: '5rem', textAlign: 'center' }}>
        Add book
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="isbn"
          label="ISBN"
          name="isbn"
          autoFocus
          onChange={e => setIsbn(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="title"
          label="Title"
          type="text"
          id="title"
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="author"
          label="Author"
          type="text"
          id="author"
          onChange={e => setAuthor(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="language"
          label="Language"
          type="text"
          id="language"
          onChange={e => setLanguage(e.target.value)}
        />

        <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Container>
      </Box>
    </Container>
  )
}