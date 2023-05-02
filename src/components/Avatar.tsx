import styles from './Avatar.module.css';
import {ImgHTMLAttributes} from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
    src: string;
    alt?: string
}
export function Avatar(props: AvatarProps) {
    const { src, hasBorder = true, ...otherProps } = props;
    return (
        <img {...otherProps} className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt="" />
    )
}