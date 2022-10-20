import React, { FC, useState } from 'react'
import { boardsMemberCreate, boardsMemberDelete } from '../../../features/boardsMember/boardsMemberSlice';
import { BoardsMemberInterface } from '../../../features/boardsMember/boardsMemberSlice.types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { MemberMenuItemProps } from './MemberMenuItem.types'
import { selectUsersById } from '../../../features/users/usersSlice';
import { selectBoardsMemberByUserId } from '../../../features/boardsMember/boardsMemberSlice';
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

const MemberMenuItem : FC<MemberMenuItemProps> = (props) => {
    const { username } = useAppSelector((state) =>
		selectUsersById(state, props.userId)
	);
	const boardMember: BoardsMemberInterface = useAppSelector((state) =>
		selectBoardsMemberByUserId(state, props.userId)
	);
	const dispatch = useAppDispatch();

	const [checked, setChecked] = useState<boolean>(
		props.userId === boardMember?.userId ? true : false
	);

	function handleToggle() {
        if (!checked) {
			dispatch(boardsMemberCreate({ userId: props.userId, username, boardId: props.boardId }));
		} else {
			dispatch(boardsMemberDelete({ id: boardMember.id, userId : props.userId, boardId: props.boardId }));
		}
		setChecked((prev) => !prev);
	}
  return (
    <div>
        <ListItem key={props.userId} disablePadding>
			<ListItemButton role={undefined} onClick={handleToggle} dense>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={checked}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': `checkbox-list-label-${props.userId}` }}
					/>
				</ListItemIcon>
				<ListItemText id={`checkbox-list-label-${props.userId}`} primary={username} />
			</ListItemButton>
		</ListItem>
    </div>
  )
}

export default MemberMenuItem