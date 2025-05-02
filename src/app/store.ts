import { configureStore,ThunkAction } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "@/features/users/usersSlice";
import authReducer from "@/features/auth/authSlice"
import { createAsyncThunk } from "@reduxjs/toolkit";
import notificationReducer from "@/features/notifications/notificationSlice";




const store = configureStore({
    reducer:{
        posts: postsReducer,
        users: usersReducer,
        auth: authReducer,
        notifications:notificationReducer
    }
})

// const exampleThunkFunction = (
//     dispatch : AppDispatch,
//     getState:()=> RootState
// ) => {
//     const stateBefore = getState();
//     console.log(`Counter before: ${stateBefore.counter}`)
//     dispatch(increment())
//     const stateAfter = getState();
//     console.log(`Counter after: ${stateAfter.counter}`)
// }
// store.dispatch(exampleThunkFunction)

// export const fetchItemById = createAsyncThunk(
//     'items/fetchItemById',
//     async (itemId : string)=>{
//         const item = await someHttpRequest(itemId)
//         return item;
//     }
// )

// const logAndAdd = (amount: number): AppThunk => {
//     return async(dispatch,getState)=>{
//         const stateBefore = getState();
//         console.log(`Counter before: ${stateBefore.counter}`)
//         dispatch(incrementByAmount(amount))
//         const stateAfter = getState();
//         console.log(`Counter after: ${stateAfter.counter}`)
//     }
// }





export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootStateFunc = typeof store.getState
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void,RootState,unknown,Action>


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();



export default store;