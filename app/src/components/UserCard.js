import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import UserPosts from "./UserPosts";

const UserCard = props => {
    const { users, setUsers } = props;
    const { id } = useParams();
    const { push } = useHistory();
    const initialState = {
        name: ""
    }
    const [isEditing, setIsEditing] = useState(false);
    const [editInputs, setEditInputs] = useState(initialState);
    const [user, setUser] = useState({});

    const fetchUser = (userId) => {
        axios.get(`http://localhost:8000/api/projects/${userId}`)
             .then(res => {
                //  console.log({ res })
                 setUser({name: res.data.name})
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    useEffect(() => {
        fetchUser(id);
    }, [users])

    const setEdit = e => {
        e.preventDefault();
        setIsEditing(!isEditing);
        axios.get(`http://localhost:8000/api/projects/${id}`)
             .then(res => {
                //  console.log({ res })
                 setEditInputs({name: res.data.name})
             })
    }

    const handleChange = e => {
        e.preventDefault();
        setEditInputs({
            ...editInputs,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/projects/${id}`, editInputs)
             .then(res => {
                 setUsers([
                     ...users.map(user => user.id === id ? res.data : user)
                 ])
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    const handleDelete = e => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/projects/${id}`)
             .then(res => {
                //  console.log({ res })
                setUsers([
                    ...users.filter(user => user.id !== id)
                ])
                push("/")
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    return(
        <>
            <button onClick={() => {push("/")}} >HOME</button>
            <div>
                <h2>Hello, I am {user.name}</h2>
                <button onClick={setEdit} >Edit User</button>
                <button onClick={handleDelete} >Delete User</button>
            </div>
            {isEditing && <form onSubmit={handleEdit} >
                              <input 
                                  name="name"
                                  type="text"
                                  placeholder="Name"
                                  value={editInputs.name}
                                  onChange={handleChange}
                              />
                              <button>Edit User</button>
                          </form>}
            <UserPosts id={id} />
            
        </>
    )
}

export default UserCard;