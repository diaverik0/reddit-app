import './App.css';
import {useState} from 'react';

function App() {
  const [subreddit, setSubreddit] = useState('');
  const [postsInSubreddit, setPostsInSubredit] = useState('');

 
  let redditObject;



async function reachReddit (str) {
  const response = await fetch (`https://www.reddit.com/r/${str}.json`);
  const data = await response.json();
  console.log(data);
  redditObject = data.data.children[0].data.selftext;
  setPostsInSubredit(data.data.children[0].data.selftex);
  alert(redditObject)

  return redditObject
}

const onSubmit = (e) => {
  e.preventDefault();
  reachReddit(subreddit);
  setSubreddit('');
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
      <p>{subreddit}</p>
      <button onClick={reachReddit}>Load Reddit</button>
      <p>{postsInSubreddit}</p>
    </div>
   </wrapper>
  )
}

export default App
