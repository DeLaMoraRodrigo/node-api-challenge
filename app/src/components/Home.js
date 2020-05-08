import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import AddUser from "./AddUser";

const Home = props => {
    const { users, setUsers } = props;

    const fetchUsers = () => {
        axios.get(`http://localhost:8000/api/projects`)
             .then(res => {
                 setUsers(res.data)
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return(
        <>
            {users && users.map(user => {
                return <NavLink to={`/users/${user.id}`} key={user.id} ><h2 key={user.id} >{user.name}</h2></NavLink>
            })}
            <AddUser users={users} setUsers={setUsers} />
        </>
    )
}

export default Home;