import styles from './Avatar.module.css';

interface AvatarProps {
    hasBorder?: boolean;
    src: string;
    alt?: string
}
export function Avatar(props: AvatarProps) {
    const { src, hasBorder = true } = props;
    return (
        <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt="" />
    )
}