import {useParams} from "react-router-dom"
import { RootState, useAppSelector } from "@/app/store";
import { useSelector } from "react-redux";

export default function SinglePostPage(){
    const params = useParams();
    const postId = params.postId;

    const post = useAppSelector(state => state.posts.find(post => post.id === postId));

    if(!post){
        return(
            <section>
                <h2>Post Not Found!</h2>
            </section>
        )
    }

    return(
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
            </article>
        </section>
    )


}