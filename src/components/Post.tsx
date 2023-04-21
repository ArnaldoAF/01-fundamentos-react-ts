import  { ChangeEvent, FormEvent, useState, InvalidEvent } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export interface Author {
    name: string;
    role?: string;
    avatarUrl: string;
}

export interface CommentProps {
    id: number;
    content: Content[];
    publishedAt: Date;
    author: Author;
}

export interface Content {
    type: 'paragraph' | 'link' | string;
    content: string;
}

export interface PostProps {
    post: {
        id: number;
        author: Author;
        publishedAt: Date;
        content: Content[];
        comments: CommentProps[];
    }
}

export function Post({post}: PostProps) {
    const { author, content, publishedAt, comments } = post;
    const { name, role, avatarUrl } = author;

    const [localComments, setLocalComments] = useState<CommentProps[]>(comments);
    const [newCommentText, setNewCommentText ] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        const lastId = localComments.length ? localComments[localComments.length - 1].id + 1 : 0;
        const newComment = 
        {
            id: lastId,
            author:{
              avatarUrl: 'https://github.com/ArnaldoAF.png',
              name: 'Arnaldo Assis Ferreira'
            },
            content: [
              { type: 'paragraph', content: newCommentText },
            ],
            publishedAt: new Date()
        };


        setLocalComments([...localComments, newComment]);
        setNewCommentText('');
    }

    function handleDeleteComment(commentId: number) {
        setLocalComments(localComments.filter(comment => comment.id != commentId));
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Este campo é Obrigatório');
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={avatarUrl} alt="" />
                    <div className={styles.authorInfo}>
                        <strong>{name}</strong>
                        <span>{role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> {publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph')
                        return <p key={line.content}>{line.content}</p>
                    else if (line.type === 'link')
                        return <p key={line.content}> <a href="#">{line.content}</a></p> 
                })}
                
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="formComment"
                    placeholder='Deixa um comentário'
                    value={newCommentText}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNewCommentText(event.target.value)}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={!newCommentText.length}>Publicar</button>

                </footer>

            </form>

            <div className={styles.commentList}>
                {localComments.map(comment => {
                    return (
                        <Comment comment={comment} key={comment.id} onDeleteComment={handleDeleteComment} />
                    )
                })}
            </div>
        </article>
    )
}