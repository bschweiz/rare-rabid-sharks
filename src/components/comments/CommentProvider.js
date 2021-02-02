import React, {useState, useEffect} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [ comments, setComments ] = useState([])
    const [ comment, setComment ] = useState({})

    const addComment = (comments) => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comments)
        })
        .then(getComments)
    }

    const getComments = () => {
        return fetch('http://localhost:8088/comments')
        .then(res => res.json())
        .then(setComments)
    }

    const getSingleComment = (id) => {
        return fetch(`http://localhost:8088/comments/${id}`)
            .then(res => res.json())
            .then(setComments)
    }

    const getCommentsByPostId = (post_id) => {
        return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
            .then(res => res.json())
            .then(setComments)
    }

    const updateComment = (comment) => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .then(getComments)
    }

    const deleteComment = (id) => {
        return fetch(`http://localhost:8088/comments/${id}`, {
            method: "DELETE"
        })
            .then(getComments)
    }
    
    return(
        <CommentContext.Provider value={{
            comments, comment, addComment, getComments, getSingleComment, getCommentsByPostId, updateComment, deleteComment, setComments, setComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}