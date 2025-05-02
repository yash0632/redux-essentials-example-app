import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-tiny-toast'

import { Navbar } from './components/Navbar'
import PostsLists from "@/features/posts/PostsList"
import AddPostForm from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import LoginPage from '@/features/auth/LoginPage'
import { selectCurrentUsername } from './features/auth/authSlice'
import { useAppSelector } from './app/store'
import { UsersList } from './features/users/UsersList'
import UserPage from './features/users/UserPage'
import NotificationList from '@/features/notifications/NotificationList'


const ProtectedRoute = ({children}:{children:React.ReactNode})=>{
  const username = useAppSelector(selectCurrentUsername)
  if(!username){
    return <Navigate to="/" replace/>
  }

  return children
}



function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<><AddPostForm/><PostsLists/></>}/>
                  <Route path="/posts/:postId" element={<SinglePostPage/>}/>
                  <Route path="/editPost/:postId" element={<EditPostForm/>}/>
                  <Route path="/users" element={<UsersList/>}/>
                  <Route path="/users/:userId" element={<UserPage/>}/>
                  <Route path="/notifications" element={<NotificationList/>}/>
                </Routes>
              </ProtectedRoute>
              
            }
          ></Route>
          <Route path="/posts/:postId" element={
            <>
              <SinglePostPage/>
            </>
          }></Route>
          <Route path="/editPost/:postId" element={
            <>
              <EditPostForm/>
            </>
          }></Route>
        </Routes>
        <ToastContainer/>
      </div>
    </Router>
  )
}

export default App
