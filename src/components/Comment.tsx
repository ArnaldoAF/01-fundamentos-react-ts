import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'; 
import { useState } from 'react';
import {CommentProps} from './Post';

interface ComentLocalProps {
    comment: CommentProps;
    onDeleteComment: (id: number) => void;
}

export function Comment({comment, onDeleteComment}: ComentLocalProps) {
    const { author, content, publishedAt, id } = comment;
    const { name, avatarUrl } = author;

    const [likeCount, setLikeCount] = useState(0);

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={avatarUrl}/>
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{name}</strong>
                            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> {publishedDateRelativeToNow}</time>
                        </div>
                        <button onClick={() => onDeleteComment(id)} title="Deletar contário">
                            <Trash size={24}/>
                        </button>
                    </header>

                    {content.map(line => {
                    if (line.type === 'paragraph')
                        return <p key={line.content}>{line.content}</p>
                    else if (line.type === 'link')
                        return <p key={line.content}> <a href="#">{line.content}</a></p> 
                    })}
                
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>


                    </button>
                </footer>

            </div>
        </div>
    )
}