import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import PostsLists from "@/features/posts/PostsList"
import AddPostForm from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm/>
                <PostsLists/> 
              </>
            }
          ></Route>
          <Route path="/posts/:postId" element={
            <>
              <SinglePostPage/>
            </>
          }></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
