import React, {useContext, useRef, useEffect, useState} from "react"
import {PostTagContext} from "./PostTagProvider"
import {TagContext} from "../tags/TagProvider"

export const AddTagForm = (props) =>{
    const {addPostTag, getPostTagsByPostId, postTags, setPostTags, relatedPostTags} = useContext(PostTagContext)
    const {tags, getTags} = useContext(TagContext)
    const postTag = useRef(null)
    const [tagArrayState, setTagArray] = useState([])
    const [filteredTagResults, setFilteredTagResults] = useState([])

    // const checkForExistingRelationship = () =>{
    //     const tagResults = [];
    //     for(const t of tags){
    //         for(const pt of postTagLabel){
    //             if(pt !== t.label) tagResults.push(t)
    //         }
    //     }
    // return setFilteredTagResults(tagResults);
    // }

    useEffect(() =>{
        getPostTagsByPostId(parseInt(props.match.params.postId))
        getTags()
        .then(
            // checkForExistingRelationship()
        )
    },[])

    const checkForChecked = (event) =>{
        const tagArray = tagArrayState
            if(event.target.checked){
                if(!tagArray.includes(parseInt(event.target.value))){
                        tagArray.push(parseInt(event.target.value))
                }
            } else{
                if(tagArray.indexOf(parseInt(event.target.value)) !== -1){
                    console.log("????")
                        tagArray.splice(tagArray.indexOf(parseInt(event.target.value)), 1)
                }
        }
        setTagArray(tagArray)
    }
    const tagLabels = tags.map(t=>{
        return t.label
    })
    // console.log(tagLabels)

    const postTagLabel = relatedPostTags.map(pt=>{
        return pt.tag_id
    })




    const constructNewPostTag = () =>{
        addPostTag({
            post_id: props.match.params.postId,
            tag_array: tagArrayState
        })
        .then(()=>props.history.push("/posts"))
        .then(setFilteredTagResults([]))
    }

    


    return (
        <form>

        <fieldset>
                <div className="form-group">
                    {console.log(postTagLabel)}
                    {console.log(tags)}
                    {

                        tags.map((t)=>{
                            if(!postTagLabel.find(pt=>parseInt(pt) === parseInt(t.id)))
                          return(

                              <>
                        <input type="checkbox" key={t.id} name={t.label} value={t.id} ref={postTag} onChange={e=>checkForChecked(e)}>
                        </input>
                        <label htmlFor={t.label}>{t.label}</label>
                        </>    
                        )  
                                  }
                        )
                    }   
            </div>
        </fieldset>

                <button type="submit"  onClick={evt => {
                evt.preventDefault()
                constructNewPostTag()
            }}>Submit</button>
                    </form>
    )
}