import React, { FC } from 'react'
import { MemberProps } from './Member.types'
import { AvatarGroup } from '@mui/material';
import MemberAvatar from '../MemberAvatar';

const Member : FC<MemberProps> = (props) => {
  return (
    <div>
        <AvatarGroup
			max={props.maxAvatar}
			sx={{
				'& .MuiAvatar-root': {
					width: 30,
					height: 30,
					fontSize: '1rem',
				},
			}}
		>
			{props.memberIds.map((memberId: number) => (
				<MemberAvatar key={memberId} memberId={memberId} />
			))}
		</AvatarGroup>
    </div>
  )
}

export default Member