import { useDispatch } from 'react-redux';
import { fetchComments, deleteComments } from '../slices/searchSlice';
import { Comments } from './comments';
import { NavLink } from 'react-router-dom';


const style = {
  backgroundColor: '#EEEEEE',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px'
}

export const Post = ({item, params}) => {
    const dispatch = useDispatch();
    const parentId = item.id;
    let commentsButton;
    let imageBlock;
    const seeComments = (request) => {
      dispatch(fetchComments(request));
    }

    const handleDelete = (e) => {
      dispatch(deleteComments(parentId))
    }

    if (item.comments.length === 0){
      commentsButton = <button onClick={e => seeComments(seeComments({id: parentId, permalink: item.permalink}))}>See Comments</button>
    } else {
      commentsButton = <button onClick={e => handleDelete(e)}>Hide Comments</button>
    }

    if (item.img === 'self' || item.img === 'default'){
      imageBlock = ''
    } else {
      imageBlock = <a href={item.imgUrl}><img style={{height:'10%'}}src={item.img} alt={item.id}/></a>;
    }

    return (
      <li style={style} key={item.id}>
        <table>
        <tr>
        <th>{imageBlock}</th><th><h3>{item.title}</h3></th>
        </tr>
        </table>
        <p>r/<NavLink to={`../subreddit/${item.subreddit}`}>{item.subreddit}</NavLink> | ups: {item.upVotes} | comments: {item.commentsNum}</p>
        <p style={{fontSize: '13px'}}>{item.content}</p>
        {commentsButton}
        <Comments comments={item.comments}/>
        </li>
    )
}

//    dispatch(fetchComments(permalink))

//item.comments ? seeComments({id: parentId, permalink: item.permalink}) : handleDelete(e)
//<p>r/<NavLink to={`../subreddit/${item.subreddit}`}>{item.subreddit}</NavLink> | ups: {item.upVotes} | comments: {item.commentsNum}</p>