import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import {sub} from 'date-fns'
import { userLoggedOut } from "../auth/authSlice"
import {client} from "@/api/client"
import { createAppAsyncThunk } from "@/app/withTypes"



export interface Post{
    id:string,
    title:string,
    content:string,
    user:string,
    date:string,
    reactions: Reactions
}

type NewPost = Pick<Post, 'title' | 'content' | 'user'>

export interface Reactions {
    thumbsUp: number,
    tada: number,
    heart: number,
    rocket: number,
    eyes: number
}

export type ReactionName = keyof Reactions

type PostUpdate = Pick<Post,'id'|'title'|'content'>

interface PostsState{
    posts: Post[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
}

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}


const initialState :PostsState = {
    posts: [],
    status : 'idle',
    error: null
}

export const fetchPosts = createAppAsyncThunk('posts/fetchPosts',
    async()=>{
        const response = await client.get<Post[]>('/fakeApi/posts')
        return response.data
    },
    {
        condition(arg,thunkApi){
            const postsStatus = selectPostsStatus(thunkApi.getState())
            if(postsStatus !== 'idle'){
                return false;
            }
        }
    }
)

export const addNewPost = createAppAsyncThunk(
    'posts/addNewPost',
    async(initialPost:NewPost)=>{
        const response = await client.post<Post>('/fakeApi/posts',initialPost)
        return response.data;
    }
)


export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        //state -> the state is the state of posts and not entire store state
        postAdded:{
            reducer(state,action:PayloadAction<Post>){
                state.posts.push(action.payload)
            },
            prepare(title:string,content:string,userId:string){
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        user:userId,
                        date: new Date().toISOString(),
                        reactions:initialReactions
                    }
                }
            }
        },  
        editPost:(state:PostsState,action:PayloadAction<PostUpdate>)=>{
            const {id,title,content} = action.payload;
            const existingPost = state.posts.find(post=>post.id===id);
            if(existingPost){
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded:(state:PostsState,action:PayloadAction<{postId:string,reaction:ReactionName}>)=>{
            const {postId,reaction} = action.payload;
            const existingPost = state.posts.find(post=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLoggedOut,(state)=>{
            return initialState;
        })
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status = 'pending';
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.posts.push(...action.payload)
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message ?? 'Unknown Error'
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            state.posts.push(action.payload)
        })
    }
})

export const {postAdded,editPost,reactionAdded} = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state:RootState) => state.posts.posts;

export const selectPostById = (state:RootState,postId:string) => state.posts.posts.find(post => post.id === postId);

export const selectPostsStatus = (state:RootState) => state.posts.status;

export const selectPostsError = (state:RootState) => state.posts.error;

//store -> configureStore object where current redux application state lives -> has both dispatch function and getState function

//slice Reducer -> createSlice has reducer function which create their own action creaters and also extraReducers for other action generateed at other place

//selector -> state:R
//typeof store.getState -> ReturnType -> RootState
//useAppDispatch -> useDispatch
//useAppSelector -> useSelector
//reducer : prepare and reducer function