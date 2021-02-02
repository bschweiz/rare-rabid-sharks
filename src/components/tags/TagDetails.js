import React, { useContext } from "react"
import { TagContext } from "./TagProvider"



export const Tag = ({ tag, props }) => {

    const { deleteTag } = useContext(TagContext)
   
    if (localStorage.getItem("rare_user_id")) {
        return (
            <div>
                {tag.label}
                <button onClick={() => {
                    deleteTag(tag.id)
                        .then(() => {
                            props.history.push("/tags")
                        })
                }}>
                    Delete
               </button>

                <button onClick={() => {
                    
                    props.history.push({ pathname: `/tags/edit/${tag.id}`,  tagId : tag.id  })

                }}> Edit </button>
            </div>
        )
    } else {
        return (
            <div>
                No tags
            </div>
        )
    }
}



