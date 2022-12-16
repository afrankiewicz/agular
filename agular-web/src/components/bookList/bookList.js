import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import * as React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils";
import EmailIcon from '@mui/icons-material/Email';
import Link from "@mui/material/Link";

function returnBook(book) {
  return axios.put(`http://localhost:8080/book/${book.id}/return`, {}, { headers: { Authorization: `Bearer ${getToken()}` } })
}

async function getOwnedBooks() {
  return axios.get('http://localhost:8080/book/owned', { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(resp => resp.data)
}

async function getBorrowedBooks() {
  return axios.get('http://localhost:8080/book/borrowed', { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(resp => resp.data)
}

const style = {    margin: 0,
'font-weight': 400,
'font-size': '0.875rem',
'line-height': 1.43,
'letter-spacing': '0.01071em',
'color': 'rgba(0, 0, 0, 0.6)',
display: 'block'}

export default function BookList() {
  const [ownedBooks, setOwnedBooks] = useState([]);
  useEffect(() => {
    getOwnedBooks().then(resp => {
      setOwnedBooks(resp)
    })
  }, []);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  useEffect(() => {
    getBorrowedBooks().then(resp => {
      setBorrowedBooks(resp)
    })
  }, []);
  const handleReturnClick = async (book) => {
    await returnBook(book);
    setBorrowedBooks(borrowedBooks.filter(it => it.isbn !== book.isbn));
  }
  return (
    <>
      <Box>
        <Typography sx={{ mt: 4, mb: 2, textAlign: 'center', textTransform: 'uppercase' }} variant="h6" component="div">
          Owned books
        </Typography>
        <List style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
          {ownedBooks.map(book =>
            <ListItem key={book.isbn}>
              <ListItemText primary={book.title} secondary={book.author}/>
            </ListItem>)
          }
        </List>
      </Box>
      <Box>
        <Typography sx={{ mt: 4, mb: 2, textAlign: 'center', textTransform: 'uppercase' }} variant="h6" component="div">
          Borrowed books
        </Typography>
        <List style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
          {borrowedBooks.map(book =>
            <ListItem key={book.isbn} secondaryAction={
              <IconButton edge="end" onClick={() => handleReturnClick(book)}>
                <ReplayIcon/>
              </IconButton>
            }>
              <span>
                <ListItemText primary={book.title} secondary={'return date: 19-11-2022'}/>
                  {/*<ListItemText secondary={'return date: 19-11-2022'}/>*/}
                <Link href="mailto:omg@wp.pl" underline="hover">owner email: omg@wp.pl</Link>
              </span>
            </ListItem>)
          }
        </List>
      </Box>
    </>
  )
}
