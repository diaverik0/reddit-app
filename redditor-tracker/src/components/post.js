
export const Post = ({item}) => {
    return (
      <li style={{border: 'solid 1px', margin: '10px'}}>
        <a href={item.imgUrl}><img style={{height:'10%'}}src={item.img} alt={item.id}/></a>
        <p>{item.title}</p>
        <p>ups: {item.upVotes}</p>
        <p>{item.content}</p>
        </li>
    )
}