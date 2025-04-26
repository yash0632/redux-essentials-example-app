import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import {sub} from 'date-fns'
import { userLoggedOut } from "../auth/authSlice"

export interface Post{
    id:string,
    title:string,
    content:string,
    user:string,
    date:string,
    reactions: Reactions
}

export interface Reactions {
    thumbsUp: number,
    tada: number,
    heart: number,
    rocket: number,
    eyes: number
}

export type ReactionName = keyof Reactions

type PostUpdate = Pick<Post,'id'|'title'|'content'>

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}


const initialState :Post[]=[
    {id:'1',title:"First Post",content:"This is the first post",user:'0',date:sub(new Date(),{minutes:10}).toISOString(),reactions:initialReactions},
    {id:'2',title:"Second Post",content:"This is the second post",user:"2",date:sub(new Date(),{minutes:5}).toISOString(),reactions:initialReactions},
    {id:'3',title:"Third Post",content:"This is the third post",user:"1",date:sub(new Date(),{minutes:3}).toISOString(),reactions:initialReactions},
]

export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        //state -> the state is the state of posts and not entire store state
        postAdded:{
            reducer(state,action:PayloadAction<Post>){
                state.push(action.payload)
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

        editPost:(state:Post[],action:PayloadAction<PostUpdate>)=>{
            const {id,title,content} = action.payload;
            const existingPost = state.find(post=>post.id===id);
            if(existingPost){
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded:(state:Post[],action:PayloadAction<{postId:string,reaction:ReactionName}>)=>{
            const {postId,reaction} = action.payload;
            const existingPost = state.find(post=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLoggedOut,(state)=>{
            return []
        })
    }
})

export const {postAdded,editPost,reactionAdded} = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state:RootState) => state.posts;

export const selectPostById = (state:RootState,postId:string) => state.posts.find(post => post.id === postId);