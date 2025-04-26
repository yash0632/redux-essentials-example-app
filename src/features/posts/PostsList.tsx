import { useAppSelector,useAppDispatch } from "@/app/store";

import { Link } from "react-router-dom";
import { selectAllPosts, selectPostsStatus,fetchPosts, selectPostsError } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "@/components/TimeAgo";
import {Spinner} from "@/components/Spinner"
import ReactionButtons from "./ReactionButtons";
import React,{useEffect} from 'react'
import {Post} from "./postsSlice"

interface PostExcerptProps{
    post: Post
}


function PostExcerpt({post}:PostExcerptProps){
    return(
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
    )
}



export default function PostsList(){
    const posts = useAppSelector(selectAllPosts);
    const dispatch = useAppDispatch();
    const postStatus = useAppSelector(selectPostsStatus)
    const postsError = useAppSelector(selectPostsError)


    useEffect(()=>{
        if(postStatus === 'idle'){
            dispatch(fetchPosts())
        }
    },[postStatus,dispatch])

    let content: React.ReactNode;
    if(postStatus === 'pending'){
        content = <Spinner text="Loading..."/>
    } else if(postStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post}/>
        ))

    } else if (postStatus === 'failed'){
        content = <div>{postsError}</div>
    }

    const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))

    return(
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}