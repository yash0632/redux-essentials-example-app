import { createAppAsyncThunk } from "@/app/withTypes"
import { RootState } from "@/app/store"
import { createSlice } from "@reduxjs/toolkit"
import {client} from "@/api/client"

export interface ServerNotification {
    id : string
    date: string
    message : string
    user: string
}

export interface ClientNotification extends ServerNotification {
    read : boolean
    isNew: boolean
}

const initialState : ClientNotification[] = []

export const fetchNotifications = createAppAsyncThunk(
    'notifications/fetchNotifications',
    async (_unused,thunkApi)=> {
        const allNotifications = selectAllNotifications(thunkApi.getState())
        const [latestNotification] = allNotifications;
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get<ServerNotification[]>(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.data
    }
)

const notificationSlice = createSlice({
    name:"notifications",
    initialState,
    reducers:{
        allNotificationsRead(state) {
            state.forEach(notification => {
                notification.read = true;
            })
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchNotifications.fulfilled,(state,action)=>{
            const notificationsWithMetaData = action.payload.map(notification => ({
                ...notification,
                read:false,
                isNew:true
            }))

            state.forEach(notification => {
                notification.isNew = !notification.read;
            })

            state.push(...notificationsWithMetaData)
        })
    }
})
export const {allNotificationsRead} = notificationSlice.actions;

export default notificationSlice.reducer

export const selectAllNotifications = (state:RootState) => state.notifications

export const selectUnreadNotificationsCount = (state:RootState) => {
    const allNotifications = selectAllNotifications(state);
    const unreadNotifications = allNotifications.filter(notification => !notification.read)
    return unreadNotifications.length
}