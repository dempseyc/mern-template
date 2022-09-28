import Link from 'next/link'
import Avatar from '@mui/material/Avatar';

const UserAvatar = ({name,image}) => {
    return (
        <span className='UserAvatar'>
            <Link href="/home/user"><a>
            <Avatar alt={name} src={image} sx={{display: "inline-block"}}/>
            </a></Link>
        </span>
    )
};

export default UserAvatar;