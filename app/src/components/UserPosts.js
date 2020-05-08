import React, { useState, useEffect } from "react";
import axios from "axios";

import PostCard from "./PostCard";
import AddPost from "./AddPost";

const UserPosts = props => {
    const { id } = props;
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get(`http://localhost:8000/api/projects/${id}/actions`)
             .then(res => {
                 console.log({ res })
                 setPosts(res.data)
             })
             .catch(err => {
                 console.log({ err })
             })
    }

    useEffect(() => {
        fetchPosts(id);
        console.log("posts", posts)
    }, [])

    return(
        <>
            {posts && posts.map(post => {
                return <PostCard key={post.id} post={post} posts={posts} setPosts={setPosts} />
            })}
            <br/>
            <AddPost posts={posts} setPosts={setPosts}  />
        </>
    )
}

export default UserPosts;