import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { getToken } from "../../utils";
import { useEffect, useState } from "react";

async function getBorrowedBooks() {
  return axios.get('http://localhost:8080/book', { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(resp => resp.data)
}

async function borrowBook(book) {
  return axios.put(`http://localhost:8080/book/${book.id}/borrow`,{},{ headers: { Authorization: `Bearer ${getToken()}` } })
}

export default function BorrowBook() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {getBorrowedBooks().then(setAvailableBooks)}, [])

  const handleBookBorrow = async (book) => {
    await borrowBook(book);
    navigate(-1);
  }
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ paddingTop: '5rem', textAlign: 'center' }}>
        Books to borrow
      </Typography>
      <List style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
        {availableBooks.map(book =>
          <ListItem key={book.isbn} secondaryAction={
            <IconButton edge="end" onClick={() => handleBookBorrow(book)}>
              <PanToolAltIcon/>
            </IconButton>
          }>
            <ListItemText primary={book.title} secondary={book.author}/>
          </ListItem>)
        }
      </List>
      <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Container>
    </Container>
  )
}