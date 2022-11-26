import { useDispatch } from 'react-redux';
import { fetchComments } from '../slices/searchSlice';
import { Comments } from './comments';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';


export const Post = ({item, params}) => {
    const dispatch = useDispatch();
    const parentId = item.id;
    const [searchParams, setSearchParams] = useSearchParams();
    const seeComments = (request) => {
      dispatch(fetchComments(request));
    }

    return (
      <li style={{border: 'solid 1px', margin: '10px'}}>
        <a href={item.imgUrl}><img style={{height:'10%'}}src={item.img} alt={item.id}/></a>
        <h3>{item.title}</h3>
        <p>r/<NavLink to={`../subreddit/${item.subreddit}`}>{item.subreddit}</NavLink> | ups: {item.upVotes} | comments: {item.commentsNum}</p>
        <p style={{fontSize: '10px'}}>{item.content}</p>
        <button onClick={e => seeComments({id: parentId, permalink: item.permalink})} >Comments</button>
        <Comments comments={item.comments}/>
        </li>
    )
}

//    dispatch(fetchComments(permalink))