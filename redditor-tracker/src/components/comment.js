const style = {
    backgroundColor: '#DDD',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px'
  }

export const Comment = ({comm}) => {
    return (
        <li style={style} key={comm.id}>
            <p>{comm.text}</p>
            <p>ups: {comm.ups}</p>
        </li>
    )
    
}