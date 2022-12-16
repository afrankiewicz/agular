import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import * as React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
function returnBook(book) {
  return axios.put(`http://localhost:8080/books/${book.id}/return`, {}, { headers: { Authorization: `Bearer ${getToken()}` } })
}

async function getOwnedBooks() {
  return axios.get('http://localhost:8080/books/owned', { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(resp => resp.data)
}

async function getBorrowedBooks() {
  return axios.get('http://localhost:8080/books/borrowed', { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(resp => resp.data)
}

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

  const handleContactOwner = (email) => {
    window.location.assign(`mailto:${email}`);
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
            <ListItem key={book.isbn}>
              <span>
                <ListItemText primary={book.title}/>
                <ListItemText primary={book.author}/>
                <ListItemText secondary={`until ${book.returnDate}`} />
                <ListItemButton disableGutters={true} onClick={() => handleReturnClick(book)}>
                  <ListItemText secondary="return now" />
                  <ListItemIcon sx={{marginLeft: '2rem'}}>
                    <ReplayIcon/>
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton disableGutters={true} onClick={() => handleContactOwner(book.owner.email)}>
                  <ListItemText secondary="contact owner" />
                  <ListItemIcon sx={{marginLeft: '2rem'}}>
                    <EmailIcon/>
                  </ListItemIcon>
                </ListItemButton>
              <Divider />
              </span>
            </ListItem>)
          }
        </List>
      </Box>
    </>
  )
}
