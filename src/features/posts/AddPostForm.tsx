interface AddPostFormFields extends HTMLFormControlsCollection{
    postTitle:HTMLInputElement
    postContent:HTMLTextAreaElement
    postAuthor:HTMLSelectElement
}
import { useAppDispatch, useAppSelector } from "@/app/store"
import { postAdded } from "./postsSlice"
import { nanoid } from "@reduxjs/toolkit"
import { selectAllUsers, selectCurrentUser } from "../users/usersSlice"
interface AddPostFormElement extends HTMLFormElement{
    readonly elements:AddPostFormFields
}



export default function AddPostForm(){
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectCurrentUser);


    const handleSubmit = (e:React.FormEvent<AddPostFormElement>)=>{
        e.preventDefault();

        const {elements} = e.currentTarget;
        const id = nanoid();
        const title = elements.postTitle.value;
        const content = elements.postContent.value;
        
        const userId = user!.id;

        console.log('Values:',{title,content})

        dispatch(postAdded(title,content,userId))
        e.currentTarget.reset();
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
                <button type="submit">Save Post</button>
            </form>
        </section>
    )
}   