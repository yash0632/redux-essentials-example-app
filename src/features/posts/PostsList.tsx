import { useAppSelector } from "@/app/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "@/components/TimeAgo";
import ReactionButtons from "./ReactionButtons";


export default function PostsList(){
    const posts = useAppSelector(selectAllPosts);

    const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
            <article className="post-excerpt"  key={post.id}>
                <h3>
                    <Link to={`/posts/${post.id}`}>
                    {post.title}
                    </Link>
                </h3>
                <p className="post-content">{post.content.slice(0,100)}</p>
                <p>
                    <PostAuthor userId={post.user}/>
                    <TimeAgo timestamp={post.date}/>
                </p>
                <p>
                    <ReactionButtons post={post}/>
                </p>
            </article>
    ))

    return(
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}