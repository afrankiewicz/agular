import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import AddBook from "./components/addBook/addBook";
import BorrowBook from "./components/borrowBook/borrowBook";
import Home from "./components/home/home";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='/addBook' element={<PrivateRoute><AddBook/></PrivateRoute>}/>
          <Route path='/borrowBook' element={<PrivateRoute><BorrowBook/></PrivateRoute>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
