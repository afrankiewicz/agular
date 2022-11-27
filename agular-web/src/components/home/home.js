import Button from "@mui/material/Button";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import BookList from "../bookList/bookList";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ mt: 4, mb: 2, margin: 'auto' }} variant="h5">
            Community library
          </Typography>
          <Box sx={{ position: 'absolute', right: 0, paddingRight: 3 }}>
            <Button sx={{width: 150}} variant="contained" onClick={() => navigate('/addBook')}>Add book</Button>
            <Button sx={{width: 150}} variant="contained" onClick={() => navigate('/borrowBook')}>Borrow book</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{display: 'flex', justifyContent: 'space-evenly'}}>
        <BookList/>
      </Container>
    </>
  )
}