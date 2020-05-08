import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import UserCard from "./components/UserCard";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get(`http://localhost:8000/api/projects`)
         .then(res => {
             console.log({ res })
             setUsers(res.data)
         })
         .catch(err => {
             console.log({ err })
         })
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="App">
      <Route exact path="/" >
        <Home users={users} setUsers={setUsers} />
      </Route>

      <Route path="/users/:id">
        <UserCard users={users} setUsers={setUsers} />
      </Route>
    </div>
  );
}

export default App;
