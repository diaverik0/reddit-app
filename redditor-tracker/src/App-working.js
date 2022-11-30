import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
  useParams,
  Form
} from "react-router-dom";

import { Posts } from './components/infiniteposts'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMore, fetchFromReddit, fetchFromRedditInfo, selectAfterCode} from "./slices/searchSlice";
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/",
      element: <Home />},
      { path: "results/:term",
      element: <Results />,},
      { path: "subreddit/:subreddit",
      element: <Subreddit />
      }
      ],
  
}]);

function App () {

  return (
      <div>
      <RouterProvider router={router} />
      </div>
  )

}


function Root () {

  const [term, setTerm] = useState('');

  return(
      <div>
      <nav style={{backgroundColor: '#ddd', width: '100%', display: 'flex', padding: '20px'}}>
      <span style={{color: 'red'}}><NavLink to="/">Home</NavLink></span>
      <span style={{display: 'block'}}><MyForm term={term} setTerm={setTerm} /></span>
      </nav>
      <br/>
      <Outlet />
      </div>
  )
}


function Home () {
  const dispatch = useDispatch();
  const afterCode = useSelector(selectAfterCode)
  useEffect(() => {
      dispatch(fetchFromReddit('popular'))}, dispatch);
  return (
      <div>
      <p>What's popular right now!</p>
        <Posts />
      </div>
  )
}

function Results () {
  const dispatch = useDispatch();
  let { term } = useParams();
  useEffect(() => {
      dispatch(fetchFromRedditInfo(term))}, [term]);
  return (
      <div>
      <p>Search Results...</p>
      <Posts params={term}/>
      </div>
  )
}

function Subreddit () {
  const dispatch = useDispatch();
  let { subreddit } = useParams();
  useEffect(() => {
      dispatch(fetchFromReddit(subreddit))}, [dispatch]);
  return (
      <div>
      <p>R/{subreddit}</p>
      <Posts />
      </div>
  )
}

function MyForm ({term, setTerm}) {
  return(
      <Form method="get" action={`/results/${term}`} >
      <input type="text" value={term} onChange={e => setTerm(e.target.value)} placeholder="Type to search..." required='true'/>
      <button type="submit" >Submit</button>
      </Form>
  )
}

export default App

/*
<Form method="get" action='/subreddit' onSubmit={console.log('submitted')}>
<input type="text" name="title"/>
<button type="submit">Submit</button>
</Form>
*/