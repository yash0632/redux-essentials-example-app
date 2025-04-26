import { PayloadAction,nanoid,createSlice } from "@reduxjs/toolkit"
import { RootState, useAppSelector } from "@/app/store"
import { selectCurrentUsername } from "../auth/authSlice"
import {client} from "@/api/client"
import { createAppAsyncThunk } from "@/app/withTypes"
interface User{
    id:string,
    name:string
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers',
    async ()=> {
        const response = await client.get<User[]>('/fakeApi/users')
        return response.data
    },
    {
        condition(arg,thunkApi){
            const userStatus = selectUsersStatus(thunkApi.getState())
            if(userStatus !== 'idle'){
                return false;
            }
        }
    }
)


interface UserState {
    users: User[],
    status: 'idle' | 'pending' | 'fulfilled' | 'failed'
    error: string | null
}


const userInitialState :UserState = {
   users: [],
   status: 'idle',
   error: null
}

const usersSlice = createSlice({
    name:'users',
    initialState:userInitialState,
    reducers:{
        userAdded:{
            reducer(state:UserState,action:PayloadAction<User>){
                state.users.push(action.payload)
            },
            prepare(name:string){
                return {
                    payload:{
                        id:nanoid(),
                        name
                    }
                    
                }
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state,action)=>{
            state.status = 'pending'
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status = 'fulfilled'
            state.users.push(...action.payload)
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message ?? 'Unknown Error'
        })
    }
})

export default usersSlice.reducer
export const {userAdded} = usersSlice.actions

export const selectAllUsers = (state:RootState) => state.users.users;

export const selectUserById = (state:RootState,userId:string|null) => state.users.users.find(user => user.id === userId);


export const selectCurrentUser = (state:RootState) => {
    const currentUsername = selectCurrentUsername(state);
    return selectUserById(state,currentUsername);
}

export const selectUsersStatus = (state:RootState) => state.users.status