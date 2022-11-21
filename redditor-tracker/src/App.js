import './App.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFromReddit } from './slices/searchSlice';
import { Posts } from './components/posts.js'
import { useSelector } from 'react-redux';
import { selectSearchResults } from './slices/searchSlice.js';

function App() {
  const dispatch = useDispatch();
  const [subreddit, setSubreddit] = useState('');
  const [currentSubreddit, setCurrentSubreddit] = useState('');
  const results = useSelector(selectSearchResults)


const onSubmit = (e) => {
  e.preventDefault();
  dispatch(fetchFromReddit(subreddit));
  setCurrentSubreddit(subreddit);
  setSubreddit("");
;
}

  return (
   <wrapper>
   <header class='top-brand'>
    <div>REDDITOR VIEW</div>
    <form onSubmit={onSubmit}>
      <input type='text' value={subreddit} onChange={e => setSubreddit(e.target.value)}/>
      <input type='submit' value='Search'/>
    </form>
    </header>
    <div>
      <p>{currentSubreddit}</p>
      <Posts />
    </div>
   </wrapper>
  )
}

export default App

//Maps results form list in terms of selftext
//{results.map(item => <li>{item.content}</li>)}

//Wether to render Posts list
//{results.length ? <Posts /> : null}