import { Post } from './post.js'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResults, selectAfterCode } from '../slices/searchSlice.js';
import { loadMore } from '../slices/searchSlice.js';
import  InfiniteScroll from 'react-infinite-scroll-component'

export const Posts = ({params}) => {
    const dispatch = useDispatch();
    const results = useSelector(selectSearchResults);
    const afterCode = useSelector(selectAfterCode);

    const fetchMoreData = () => {
      dispatch(loadMore(afterCode));
    }

    return(
      <div>
        <InfiniteScroll
          dataLength={Object.keys(results).length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
       >
        <ul>
          {Object.values(results).map((item) => (
            <Post item={item}/>
          ))}
        </ul>
        </InfiniteScroll>
      </div>
    )
} 

//{results.map(item => <Post item={item} />)}
//{!results.length ? <p>Search now.</p> : <p>Search returned {results.length} results...</p>}
//useSelector(selectSearchResults)