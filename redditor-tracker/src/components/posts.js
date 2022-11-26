import { Post } from './post.js'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResults, selectAfterCode } from '../slices/searchSlice.js';
import { loadMore } from '../slices/searchSlice.js';

export const Posts = ({params}) => {
    const dispatch = useDispatch();
    const results = useSelector(selectSearchResults);
    const afterCode = useSelector(selectAfterCode);

    const loadMorePosts = () => {
      dispatch(loadMore(afterCode));
    }

    return(
      <div>
        <ul>
        {Object.values(results).map((item) => (<Post item={item} params={params}/>))}
        </ul>
        <button onClick={(e) => loadMorePosts()}>Load More Posts</button>
      </div>
      
    )
} 

//{results.map(item => <Post item={item} />)}
//{!results.length ? <p>Search now.</p> : <p>Search returned {results.length} results...</p>}
//useSelector(selectSearchResults)