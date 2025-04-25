import { useAppSelector } from "@/app/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function PostsList(){
    const posts = useAppSelector(state => state.posts);

    const renderedPosts = posts.map(post => (
            <article className="post-excerpt"  key={post.id}>
                <h3>
                    <Link to={`/posts/${post.id}`}>
                    {post.title}
                    </Link>
                </h3>
                <p className="post-content">{post.content.slice(0,100)}</p>
            </article>
    ))

    return(
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}