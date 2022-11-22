import {
    createBrowserRouter,
    RouterProvider,
    NavLink,
    Outlet,
    Route,
    Form
  } from "react-router-dom";

import { SearchTool } from "./components/searchTool";
import { Posts } from './components/posts'

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/subreddit",
        element: <p>Subreddit Results Here...</p>},
        { path: "/content",
        element: <p>Content Results Here...</p>}
        ],
    
  }]);

function App () {
    return (
        <div>
        <SearchTool/>
        <RouterProvider router={router} />
        </div>
    )

}

function Root () {
    return(
        <div>
        <ul>
            <li><NavLink to="/subreddit">Subreddit</NavLink></li>
            <li><NavLink to="/content">Content</NavLink></li>
        </ul>
        <Form method="get" action='/subreddit' onSubmit={console.log('submitted')}>
        <input type="text" name="title"/>
        <button type="submit">Submit</button>
        </Form>
        <Outlet />
        </div>
    )
}

function MyForm () {

}

export default App