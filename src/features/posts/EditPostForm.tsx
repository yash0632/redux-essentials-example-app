import { useParams,useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/app/store"
import {editPost, selectPostById} from "./postsSlice"



interface EditPostFormElement extends HTMLFormElement{
    postTitle: HTMLInputElement;
    postContent:HTMLTextAreaElement;
}


export default function EditPostForm(){
    const navigate = useNavigate();
    const { postId } = useParams() as {postId:string};
    const dispatch = useAppDispatch();

    const post = useAppSelector(state => selectPostById(state,postId));

    



    if(!post){
        return <section>Post Not Found!</section>
    }
    const handleSubmit = (e:React.FormEvent<EditPostFormElement>)=>{
        e.preventDefault();
        const title = e.currentTarget.postTitle.value;
        const content = e.currentTarget.postContent.value;

        dispatch(editPost({
            id:postId,
            title,
            content
        }))
        navigate(`/posts/${postId}`)
    }

    return(
        <section>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="postTitle">PostTitle:</label>
                <input type="text" id="postTitle" defaultValue={post.title} required></input>

                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" required defaultValue={post.content}></textarea>

                <button type="submit">Update Post</button>
            </form>
        </section>
    )
}