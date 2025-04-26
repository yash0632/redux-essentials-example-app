import {useParams,useNavigate} from "react-router-dom"
import { RootState, useAppSelector } from "@/app/store";
import { useSelector } from "react-redux";
import {selectPostById} from "./postsSlice"
import { selectCurrentUsername } from "../auth/authSlice";
import ReactionButtons from "./ReactionButtons";

export default function SinglePostPage(){
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.postId;

    const post = useAppSelector(state => selectPostById(state,postId!));
    const currentUsername = useAppSelector(selectCurrentUsername)!

    if(!post){
        return(
            <section>
                <h2>Post Not Found!</h2>
            </section>
        )
    }

    const canEdit = currentUsername === post.user;
    return(
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