import { configureStore } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import postsReducer from "../features/posts/postsSlice";




const store = configureStore({
    reducer:{
        posts: postsReducer
    }
})

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootStateFunc = typeof store.getState
export type RootState = ReturnType<typeof store.getState>


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();



export default store;