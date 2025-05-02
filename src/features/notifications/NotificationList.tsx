import { useAppDispatch, useAppSelector } from "@/app/store";
import PostAuthor from "../posts/PostAuthor";
import { selectAllNotifications } from "./notificationSlice";
import { TimeAgo } from "@/components/TimeAgo";
import { useLayoutEffect,useEffect } from "react";
import { allNotificationsRead } from "./notificationSlice";
import classNames from "classnames";

export default function NotificationList(){
    const notifications = useAppSelector(selectAllNotifications);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(allNotificationsRead());
    },[])

const renderedNotifications = notifications.map(notification => {
        const notificationClassname = classNames('notification', {'new': notification.isNew})
        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>
                        <PostAuthor userId={notification.user} showPrefix={false}/>
                    </b>{' '}
                    {notification.message}
                </div>
                <TimeAgo timestamp={notification.date}/>
            </div>
        )
    })

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    )
}