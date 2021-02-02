import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comments/CommentProvider"
import { Comment } from "../comments/Comment"
import { AllPost } from "./AllPost"
import { Link } from "react-router-dom"


export const PostDetail = (props) => {
    const { posts, getSinglePost, post, setPost, deletePost } = useContext(PostContext)
    const { comments, setComments, getCommentsByPostId } = useContext(CommentContext)
    console.log(props)

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getSinglePost(postId)
        getCommentsByPostId(postId)
            .then(setPost(post))
            .then(setComments(comments))
        console.log("comments list? :", comments)
    }, [])

    console.log(post)
    return (
        <>
            <div>{post.title}</div>
            <div>{post.publication_date}</div>
            <div>{post.image_url}</div>
            <div>{post.content}</div>
            <div>{post.category.label}</div>
            <div>{post.username}</div>
            { parseInt(localStorage.getItem("rare_user_id")) === post.user_id ? <><button onClick={() => { deletePost(post.id).then(() => { props.history.push("/posts") }) }}>Delete Post</button> <button onClick={() => { props.history.push(`/posts/edit/${post.id}`) }}>Edit Post</button> </> : <> {""}</>
            }
            <h3>Comments</h3>
            {
                comments.map(commentObj => <Comment key={commentObj.id} comment={commentObj} props={props} />)
            }
            <Link to={{
                pathname: `/posts/addcomment`,
                state: {chosenPost: post }
                }}>Add a Comment</Link>
        </>
    )
}