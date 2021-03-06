import React, { useContext } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import { useHistory } from "react-router-dom"

// component responsible for rendering a single category

export const Category = ({ category }) => {
    const { removeCategory } = useContext(CategoryContext)
    const history = useHistory()

    const confirmDelete =(id)=>{
        const d = window.confirm("Would you like to delete this?")
        if(d===true){
            removeCategory(id)
        }
    }

    return (<section className="category">
        <div className="category__label">{category.label}</div>
        <button onClick={
                () => {
                    confirmDelete(category.id) 
                }
            }>
                Delete
            </button>
            <button onClick={() => {
                history.push(`/categories/edit/${category.id}`)
            }}>Edit
            </button>
    </section>
    )
}