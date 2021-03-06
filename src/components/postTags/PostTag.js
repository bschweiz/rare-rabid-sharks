import React, { useContext, useState } from "react"
import {PostTagContext} from "./PostTagProvider"

export const PostTag = ({postTags, props}) =>{
    const {deletePostTag, setTagDeleted, tagDeleted} = useContext(PostTagContext)

    const confirmDelete =()=>{
        const d = window.confirm("Would you like to delete this?")
        if(d===true){
            deletePostTag(postTags.id)
        }
     }
     
    return(
            <div>Label: {postTags.tag.label}
            <button onClick={()=>{confirmDelete()}}>Delete Tag From Post</button>
            </div>
    )
}