import { useState } from "react"

interface AddPostFormFields extends HTMLFormControlsCollection{
    postTitle:HTMLInputElement
    postContent:HTMLTextAreaElement
    postAuthor:HTMLSelectElement
}
import { useAppDispatch, useAppSelector } from "@/app/store"
import { addNewPost, postAdded } from "./postsSlice"
import { nanoid } from "@reduxjs/toolkit"
import { selectAllUsers, selectCurrentUser } from "../users/usersSlice"
import { useAddNewPostMutation } from "../api/apiSlice"
interface AddPostFormElement extends HTMLFormElement{
    readonly elements:AddPostFormFields
}



export default function AddPostForm(){
   
    
    const [addNewPost,{isLoading}] = useAddNewPostMutation();

    const user = useAppSelector(selectCurrentUser);


    const handleSubmit =async (e:React.FormEvent<AddPostFormElement>)=>{
        e.preventDefault();

        const {elements} = e.currentTarget;
        const id = nanoid();
        const title = elements.postTitle.value;
        const content = elements.postContent.value;
        
        const form = e.currentTarget
        const userId = user!.id;

        try{
            await addNewPost({title,content,user:userId}).unwrap()

            form.reset();
        }
        catch(err){
            console.error('Failed to save the post',err)
        }
        
    }
    

    return(
        <section>
            <h2>Add a New Posts</h2>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" defaultValue="" required/>
               
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    defaultValue=""
                    required
                />
                <button disabled={isLoading} type="submit">Save Post</button>
            </form>
        </section>
    )
}   