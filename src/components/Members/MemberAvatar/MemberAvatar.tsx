import React, { FC } from 'react'
import { selectUsersById } from '../../../features/users/usersSlice';
import { useAppSelector } from '../../../hooks/hooks';
import { MemberAvatarProps } from './MemberAvatar.types'
import { Avatar } from '@mui/material';

const MemberAvatar : FC<MemberAvatarProps> = (props) => {
    const { username } = useAppSelector((state) =>
		selectUsersById(state, props.memberId)
	);
  return (
    <div>
        <Avatar key={props.memberId}>{username.charAt(0)}</Avatar>
    </div>
  )
}

export default MemberAvatar