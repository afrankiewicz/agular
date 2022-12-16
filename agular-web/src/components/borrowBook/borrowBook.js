import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { getToken } from "../../utils";
import { useEffect, useState } from "react";

const books = [{
  id: 1,
  isbn: '23123',
  title: 'book title',
  author: 'book author',
  language: 'pl',
  owner: { id: 1, lastName: 'owner last name', firstName: 'owner first name', email: 'owner@wpl.pl' },
  borrower: { id: 1, lastName: 'borrower last name', firstName: 'borrower first name', email: 'borrower@wpp.pl' }
},
  {
    id: 2,
    isbn: 'bbb',
    title: 'book title 2',
    author: 'book author 2',
    language: 'pl',
    owner: { id: 1, lastName: 'owner last name 2', firstName: 'owner first name 2', email: 'owner2@wpl.pl' },
    borrower: { id: 1, lastName: 'borrower last name2', firstName: 'borrower first name2', email: 'borrower2@wpp.pl' }
  },
  {
    id: 3,
    isbn: 'vvv',
    title: 'book title 3',
    author: 'book author3',
    language: 'pl',
    owner: { id: 1, lastName: 'owner last name3', firstName: 'owner first name3', email: 'owner3@wpl.pl' },
    borrower: { id: 1, lastName: 'borrower last name3', firstName: 'borrower first name3', email: 'borrower3@wpp.pl' }
  }]

async function getAvailableBooks() {
  return axios.get('http://localhost:8080/books/all', { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(resp => resp.data)
}

async function borrowBook(book) {
  return axios.put(`http://localhost:8080/books/${book.id}/borrow`,{},{ headers: { Authorization: `Bearer ${getToken()}` } })
}

export default function BorrowBook() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {getAvailableBooks().then(setAvailableBooks)}, [])

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