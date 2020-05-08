import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddPost = props => {
    const { posts, setPosts } = props;
    const { id } = useParams();
    const initialState = {
        text: ""
    }
    const [addInputs, setAddInputs] = useState(initialState);

    const handleChange = e => {
        e.preventDefault();
        setAddInputs({
            ...addInputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/projects/${id}/actions`, addInputs)
             .then(res => {
                 console.log({ res })
                setPosts([
                    ...posts,
                    res.data
                ])
                setAddInputs(initialState)
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    return(
        <form onSubmit={handleSubmit} >
            <input 
                name="text"
                type="text"
                placeholder="Text"
                value={addInputs.text}
                onChange={handleChange}
            />
            <button>Add Post</button>
        </form>
    )
}

export default AddPost;