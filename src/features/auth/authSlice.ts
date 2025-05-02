import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "@/app/store"

import { createAppAsyncThunk } from "@/app/withTypes"
import { client } from "@/api/client"
import { create } from "domain"

interface AuthState {
    username: string| null
}

const initialState :AuthState = {
    username: null
}

export const login = createAppAsyncThunk(
    'auth/login',
    async(username : string) => {
        await client.post('/fakeApi/login',{username})
        return username
    }
)

export const logout = createAppAsyncThunk(
    'auth/logout',
    async ()=> {
        await client.post('/fakeApi/logout',{})
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userLoggedIn:(state,action:PayloadAction<string>)=>{
            state.username = action.payload
        },

        userLoggedOut:(state)=>{
            state.username = null;
        }
    },
    extraReducers:builder => {
        builder
        .addCase(login.fulfilled,(state,action)=>{
            state.username = action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.username = null
        })
    }
})

export const {userLoggedIn,userLoggedOut} = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUsername = (state:RootState) => state.auth.username