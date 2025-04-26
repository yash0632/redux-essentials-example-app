import React from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from './UserIcon'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { userLoggedOut } from '@/features/auth/authSlice'


export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = !!user;

  let navContent:React.ReactNode = null;
 
  if(isLoggedIn){
    const onLogOutClicked = () => {
      dispatch(userLoggedOut())
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to='/posts'>Posts</Link>
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
