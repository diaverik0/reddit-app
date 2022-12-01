import styles from '../style-modules/mystyle.module.css'

export const Comment = ({comm}) => {
    return (
        <li id={styles.singleComment} key={comm.id}>
            <p className={styles.commentText}>"{comm.text}"</p>
            <p className={styles.commentUps}>ups: {comm.ups}</p>
        </li>
    )
    
}