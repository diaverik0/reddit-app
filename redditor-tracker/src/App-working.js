import './App.css';
import { Posts } from './components/posts.js';
import { SearchTool } from './components/searchTool';

import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
} from "react-router-dom";


function App() {

  return (
   <wrapper>
    <SearchTool />
      <div>
    <Posts />
    </div>
   </wrapper>
  )
}

export default App

const SubredditResults = () => {
  return (
    <p>Subreddit Results here:</p>
  )
} 

const ContentResults = () => {
  return (
    <p>Content Results here:</p>
  )
} 


//Maps results form list in terms of selftext
//{results.map(item => <li>{item.content}</li>)}

//Wether to render Posts list
//{results.length ? <Posts /> : null}

/*
  const router = createBrowserRouter([
    {path: '/subreddit',
    element: <SubredditResults />},
    {path: '/content',
    element: <ContentResults />}
  ])

        <NavLink to="/reddit">Reddit</NavLink>
      <NavLink to="/content">Content</NavLink>
      <RouterProvider router={router}/>

<Routes>
          <Route path="/subreddit">
              <SubredditResults />
          </Route>
          <Route path="/content">
              <ContentResults />
          </Route>
        </Routes>
*/