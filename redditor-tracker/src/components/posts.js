import { Post } from './post.js'
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../slices/searchSlice.js';

export const Posts = () => {
    console.log(useSelector(selectSearchResults));
    const results = useSelector(selectSearchResults);
    return(
      <div>
        <ul>
        {Object.values(results).map((item) => (<Post item={item}/>))}
        </ul>
      </div>
    )
} 

//{results.map(item => <Post item={item} />)}
//{!results.length ? <p>Search now.</p> : <p>Search returned {results.length} results...</p>}
//useSelector(selectSearchResults)