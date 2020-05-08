import React, { useState } from "react";
import axios from "axios";

const PostCard = props => {
    const { post, posts, setPosts } = props;
    const initialState = { text: ""}
    const [postEditing, setPostEditing]  = useState(false);
    const [postInputs, setPostInputs] = useState(initialState);

    const setEditing = e => {
        e.preventDefault();
        setPostEditing(!postEditing);
        console.log("Gonna Edit this Post", post)
        axios.get(`http://localhost:8000/api/actions/${post.id}`)
             .then(res => {
                 console.log("PostById", res)
                 setPostInputs({text: res.data.text});
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    const handleChange = e => {
        e.preventDefault();
        setPostInputs({
            ...postInputs,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/actions/${post.id}`, postInputs)
             .then(res => {
                 console.log({ res })
                 setPosts([
                     ...posts.map(comment => comment.id === post.id ? res.data : comment)
                 ])
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    const handleDelete = e => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/actions/${post.id}`)
             .then(res => {
                 console.log({ res })
                 setPosts([
                     ...posts.filter(comment => comment.id !== post.id)
                 ])
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    return(
        <>
            <div>
                <h3>{post.text}</h3>
                <button onClick={setEditing} >Edit Post</button>
                <button onClick={handleDelete} >Delete Post</button>
            </div>
            {postEditing && <form onSubmit={handleEdit} >
                              <input 
                                  name="text"
                                  type="text"
                                  placeholder="Text"
                                  value={postInputs.text}
                                  onChange={handleChange}
                              />
                              <button>Edit Post</button>
                          </form>}
        </>
    )
}

export default PostCard;