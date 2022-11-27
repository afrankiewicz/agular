import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import * as React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils";

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


function returnBook(book) {
  console.log('return', book)
  return undefined;
}

async function getOwnedBooks() {
  return axios.get('http://localhost:8080/book/owned', { headers: { Authorization: `Bearer ${getToken()}` } })
}

export default function BookList() {
  const [ownedBooks, setOwnedBooks] = useState([]);
  useEffect( () => {
    getOwnedBooks().then(books => setOwnedBooks(books))
  }, []);
  return (
    <>
      <Box>
        <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h6" component="div">
          Owned books
        </Typography>
        <List style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
          {[].map(book =>
            <ListItem key={book.isbn}>
              <ListItemText primary={book.title} secondary={book.author}/>
            </ListItem>)
          }
        </List>
      </Box>
      <Box>
        <Typography sx={{ mt: 4, mb: 2 , textAlign: 'center'}} variant="h6" component="div">
          Borrowed books
        </Typography>
        <List style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
          {books.map(book =>
            <ListItem key={book.isbn} secondaryAction={
              <IconButton edge="end" onClick={() => returnBook(book)}>
                <ReplayIcon />
              </IconButton>
            }>
              <ListItemText primary={book.title} secondary={book.author}/>
            </ListItem>)
          }
        </List>
      </Box>
    </>
  )
}
