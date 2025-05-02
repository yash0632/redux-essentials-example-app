import {useParams,useNavigate} from "react-router-dom"
import { RootState, useAppSelector } from "@/app/store";
import { useSelector } from "react-redux";
import {selectPostById} from "./postsSlice"
import { selectCurrentUsername } from "../auth/authSlice";
import ReactionButtons from "./ReactionButtons";
import { useGetPostQuery } from "../api/apiSlice";
import type {Post} from "./postsSlice"
import { Spinner } from "@/components/Spinner";

export default function SinglePostPage(){
    
    const params = useParams();
    const postId = params.postId as string;

    const {
        data:post,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetPostQuery(postId!);

    let content :React.ReactNode;


    if(isFetching){
        content = <Spinner text={"Loading..."}></Spinner>
    }
    else if(isSuccess){
        content = <PostView post={post}></PostView>
    }
    else if(isError){
        content = <div>{error.toString()}</div>
    }

    
    return(
        <>
            {content}
            
        </>
    )
    

    
    


}

function PostView({post}:{post:Post}){
    const navigate = useNavigate();
    const currentUsername = useAppSelector(selectCurrentUsername)
    const canEdit = currentUsername === post.user;
    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <ReactionButtons post={post}/>
                {canEdit && (
                    <button onClick={()=>{
                        navigate(`/editPost/${post.id}`,{replace:true})
                    }}>Edit Post</button>
                )}

                
            </article>
        </section>
    )
}