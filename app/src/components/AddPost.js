import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddPost = props => {
    const { posts, setPosts } = props;
    const { id } = useParams();
    const initialState = {
        description: "",
        notes: ""
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
                name="description"
                type="text"
                placeholder="Description"
                value={addInputs.description}
                onChange={handleChange}
            />
            <input 
                name="notes"
                type="text"
                placeholder="Notes"
                value={addInputs.notes}
                onChange={handleChange}
            />
            <button>Add Post</button>
        </form>
    )
}

export default AddPost;