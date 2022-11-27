import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { getToken } from "./utils";
import AddBook from "./components/addBook/addBook";
import BorrowBook from "./components/borrowBook/borrowBook";
import Home from "./components/home/home";
import { useState } from "react";

function App() {
  const localToken = getToken();
  const [token, setToken] = useState(localToken);
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Login setToken={setToken}/>}/>
          <Route path={'/register'} element={<Register/>}/>
        </Routes>
      </Router>
    )
  }
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addBook' element={<AddBook/>}/>
          <Route path='/borrowBook' element={<BorrowBook/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
