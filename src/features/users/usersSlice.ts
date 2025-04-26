import { PayloadAction,nanoid,createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { selectCurrentUsername } from "../auth/authSlice"
interface User{
    id:string,
    name:string
}

const usersInitialState :User[] = [
    {id:'0',name:'Tianna Jenkins'},
    {id:'1',name:"Kevin Grant"},
    {id:'2',name:'Madison Price'}
]

const usersSlice = createSlice({
    name:'users',
    initialState:usersInitialState,
    reducers:{
        userAdded:{
            reducer(state:User[],action:PayloadAction<User>){
                state.push(action.payload)
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
    }
})

export default usersSlice.reducer
export const {userAdded} = usersSlice.actions

export const selectAllUsers = (state:RootState) => state.users;

export const selectUserById = (state:RootState,userId:string|null) => state.users.find(user => user.id === userId);


export const selectCurrentUser = (state:RootState) => {
    const currentUsername = selectCurrentUsername(state);
    return selectUserById(state,currentUsername);
}