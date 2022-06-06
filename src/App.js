import React from 'react';
import './App.css';
import TodoappState from './components/Context/TodoContext';
import Alert from './components/Alert';
import Home from "./components/Home";
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  return (
    <>
      <TodoappState>
        <Router>
          <Alert />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
          </Routes>
        </Router>
      </TodoappState>

    </>
  );
}

export default App;
