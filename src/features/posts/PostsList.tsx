import { useAppSelector,useAppDispatch } from "@/app/store";
import classNames from "classnames";

import { Link } from "react-router-dom";
import { selectAllPosts, selectPostsStatus,fetchPosts, selectPostsError } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "@/components/TimeAgo";
import {Spinner} from "@/components/Spinner"
import ReactionButtons from "./ReactionButtons";
import React,{useEffect, useMemo} from 'react'
import type {Post} from "./postsSlice"

import { useGetPostsQuery } from "../api/apiSlice";


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
    const {
        data:posts = [],
        isLoading,
        isSuccess,
        isFetching,
        isError,
        error
    } = useGetPostsQuery()

    const sortedPosts = useMemo(()=>{
        const sortedPosts = posts.slice()

        sortedPosts.sort((a,b) => b.date.localeCompare(a.date))
        return sortedPosts
    },[posts])


    let content: React.ReactNode;
    
    if(isLoading){
        content = <Spinner text="Loading..."/>
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map(post => <PostExcerpt key={post.id} post={post}/>)

        const containerClassname = classNames('posts-container',{
            disabled:isFetching
        })

        content = <div className={containerClassname}>{renderedPosts}</div>
    } else if(isError){
        content = <div>{error.toString()}</div>
    }

    return(
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}