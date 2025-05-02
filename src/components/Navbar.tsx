import React from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from './UserIcon'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { userLoggedOut } from '@/features/auth/authSlice'
import {logout} from '@/features/auth/authSlice'
import { fetchNotifications,selectUnreadNotificationsCount } from '@/features/notifications/notificationSlice'


export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = !!user;
  const unreadNotificationsCount = useAppSelector(selectUnreadNotificationsCount);

  let navContent:React.ReactNode = null;
 
  if(isLoggedIn){
    const onLogOutClicked = () => {
      dispatch(logout())
    }

    const fetchNewNotifications = () => {
      dispatch(fetchNotifications())
    }

    let unreadNotificationsBadge : React.ReactNode | undefined;

    if(unreadNotificationsCount > 0){
      unreadNotificationsBadge = (
        <span className='badge'>{unreadNotificationsCount}</span>
      )
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to='/posts'>Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          <button className="button small" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
        <div className='userDetails'>
          <UserIcon size={32}/>
          {user.name}
          <button className='button small' onClick={onLogOutClicked}>Log Out</button>
        </div>
      </div>
    )
  }
  
  
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        {navContent}
      </section>
    </nav>
  )
}
