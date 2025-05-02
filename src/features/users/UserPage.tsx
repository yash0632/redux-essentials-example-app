import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { selectUserById } from "./usersSlice";
import { selectPostById, selectPostsByUser } from "../posts/postsSlice";

export default function UserPage(){
    const {userId} = useParams<Record<string,string>>();

    let content : React.ReactNode;

    if(!userId){

        <h1>Error : UserId Not Found</h1>
        
    }
    else{
        const user = useAppSelector(state => selectUserById(state,userId));

        if(!user){
            content = (
                
                    <h2>User Not Found</h2>
                
            )
            
        }
        else{
            const postsForUser = useAppSelector(state =>
                selectPostsByUser(state,user.id)
            )
    
            const postTitles = postsForUser.map(post => (
                <li key= {post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))
    
            content = (
                <>
                    <h2>{user.name}</h2>
                    <ul>{postTitles}</ul>
                </>
            )
        }
    }

    return (
        <section>
            {content}
        </section>
    )
}