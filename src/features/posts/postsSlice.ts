import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"


export interface Post{
    id:string,
    title:string,
    content:string
}


const initialState :Post[]=[
    {id:'1',title:"First Post",content:"This is the first post"},
    {id:'2',title:"Second Post",content:"This is the second post"},
    {id:'3',title:"Third Post",content:"This is the third post"},
]

export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        //state -> the state is the state of posts and not entire store state
        postAdded:(state:Post[],action:PayloadAction<{title:string,content:string}>)=>{
            state.push({
                id:nanoid(),
                title:action.payload.title,
                content:action.payload.content
            })
            
        }
    }
})

export const {postAdded} = postsSlice.actions

export default postsSlice.reducer