export const Comment = ({comm}) => {
    return (
        <li>
            <p>{comm.id}</p>
            <p>{comm.text}</p>
            <p>ups: {comm.ups}</p>
        </li>
    )
    
}