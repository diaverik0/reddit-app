
export const Post = ({item}) => {
    return (
      <li style={{border: 'solid 1px', margin: '10px'}}>
        <a href={item.imgUrl}><img style={{height:'10%'}}src={item.img} alt={item.id}/></a>
        <h3>{item.title}</h3>
        <p>ups: {item.upVotes}</p>
        <p style={{fontSize: '10px'}}>{item.content}</p>
        </li>
    )
}