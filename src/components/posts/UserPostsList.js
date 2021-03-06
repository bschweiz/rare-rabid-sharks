import React, {useContext, useEffect} from "react"
import {PostContext} from "./PostProvider"
import {Post} from "./Post"
import { Link } from "react-router-dom"


export const UserPostList = (props) =>{
    const { posts, getPostsByUserId } = useContext(PostContext)

    useEffect(() =>{
        getPostsByUserId()
    }, [])

    return (
        <div>
            <h3>My Posts</h3>
            <Link to="/posts/create">Create New Post</Link>
            {
                posts.map(p => <Post key={p.id} post={p} props={props}/>)
            }
        </div>
    )
}