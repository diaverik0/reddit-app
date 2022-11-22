import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFromReddit } from '../slices/searchSlice';


export const SearchTool = () =>{
    const dispatch = useDispatch();
    const [subreddit, setSubreddit] = useState('');
    const [currentSubreddit, setCurrentSubreddit] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchFromReddit(subreddit));
    setCurrentSubreddit(subreddit);
    setSubreddit("");
  }
    
    return (
    <header class='top-brand'>
        <div>REDDITOR VIEW</div>
        <form onSubmit={handleSubmit}>
            <input type='text' value={subreddit} onChange={e => setSubreddit(e.target.value)}/>
            <input type='submit' value='Search'/>
        </form>
        <p>{currentSubreddit}</p>
    </header>
)}