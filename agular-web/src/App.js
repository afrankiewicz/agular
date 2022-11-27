import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import List from "./List";
import Item from "./Item";
import Login from "./components/login/login";
import Register from "./components/register/register";
import BookList from "./components/bookList/book-list";


function setToken(userToken) {
  localStorage.setItem('token', userToken);
}

function getToken() {
  return localStorage.getItem('token');
}

function App() {
  const token = getToken();
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Login setToken={setToken}/>}/>
          <Route path={'/login'} element={<Login setToken={setToken}/>}/>
          <Route path={'/register'} element={<Register/>}/>
        </Routes>
      </Router>
    )
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          {/*<Route path='/login' element={<Login setToken={setToken}/>}/>*/}
          {/*<Route path='/register' element={<Register/>}/>*/}
          <Route path='/' element={<BookList/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
