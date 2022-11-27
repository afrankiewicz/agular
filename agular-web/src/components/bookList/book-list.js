import { Grid, List, ListItem, ListItemText } from "@mui/material";
import * as React from 'react';


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


const flexContainer = {
  // display: 'flex',
  'flex-direction': 'column',
  padding: 10,
};


export default function BookList() {

  // return (
  //   <List dense={true} style={flexContainer}>
  //     <ListItem>
  //       {books.map(book => <ListItemText primary={book.author}/>)}
  //     </ListItem>
  //   </List>
  // )
  return (
    <List style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
      {books.map(book =>
        <ListItem>
          <ListItemText primary={book.author}/>
        </ListItem>)
      }
    </List>
  )
}
