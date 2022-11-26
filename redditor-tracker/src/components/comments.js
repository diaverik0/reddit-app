import { Comment } from './comment';

export const Comments = ({comments}) => {
    return (
        <ul>
          {Object.values(comments).map((comment) => (<Comment comm={comment}/>))}
        </ul>
    )
    
}