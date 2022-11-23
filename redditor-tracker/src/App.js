import {
    createBrowserRouter,
    RouterProvider,
    NavLink,
    Outlet,
    useParams,
    Form
  } from "react-router-dom";

import { SearchTool } from "./components/searchTool";
import { Posts } from './components/posts'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFromReddit, selectSearchResults, getSearchTerm, selectTerm } from "./slices/searchSlice";
import { useState } from 'react';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/",
        element: <Home />},
        { path: "results/:term",
        element: <Results />}
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
    const dispatch = useDispatch();;

    return(
        <div>
        <NavLink to="/">Home</NavLink>
        <MyForm term={term} setTerm={setTerm}/>
        <Outlet />
        </div>
    )
}


function Home () {
    const dispatch = useDispatch();
    dispatch(getSearchTerm(''));
    useEffect(() => {
        dispatch(fetchFromReddit('popular'))}, []);
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
    dispatch(getSearchTerm(term));
    useEffect(() => {
        dispatch(fetchFromReddit(term))}, [term]);
    return (
        <div>
        <p>Search Results...</p>
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