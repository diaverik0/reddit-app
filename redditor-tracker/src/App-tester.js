import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchResults, fetchFromReddit, selectAfterCode, loadMore } from "./slices/searchSlice";
import { Post } from './components/post'



function App () {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchFromReddit('3ds'));
    }, [] )
    const results = useSelector(selectSearchResults);
    const afterCode = useSelector(selectAfterCode);
    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8
      };
    
    function fetchMoreData() {
        dispatch(loadMore(afterCode));
    }


    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
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
    );
  }

export default App;
