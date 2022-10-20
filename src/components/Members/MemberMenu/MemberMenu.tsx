import React, { FC, useState } from 'react'
import { useAppSelector } from '../../../hooks/hooks';
import { shareButtonStyles } from './MemberMenu.styled'
import { MemberMenuProps } from './MemberMenu.types'
import { selectBoardsById } from '../../../features/boards/boardsSlice';
import { selectUsersIds } from '../../../features/users/usersSlice';
import { Box, Button, List, Menu } from '@mui/material';
import MemberMenuItem from '../MemberMenuItem';


const MemberMenu :FC<MemberMenuProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { id: userId } = useAppSelector((state) => state.user);
	const board = useAppSelector((state) => selectBoardsById(state, props.boardId));
	const userIds = useAppSelector((state) => selectUsersIds(state));
	const isOwner = userId === board?.ownerId ? true : false;
	const open = Boolean(anchorEl);

	function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}
	function handleClose() {
		setAnchorEl(null);
	}
  return isOwner && userIds?.length > 1 ? (
    <div>
        <Button
				id="members-menu-button"
				variant="outlined"
				sx={shareButtonStyles}
				aria-controls={open ? 'members-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOpen}
			>
				Share
			</Button>

			<Menu
				id="members-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'members-menu-button',
				}}
			>
				<Box sx={{ p: 0 }}>
					<List sx={{ width: 200, p: 0 }}>
						{userIds.map(
							(userId) =>
								Number(userId) !== board?.ownerId && (
									<MemberMenuItem
										key={userId}
										userId={Number(userId)}
										boardId={props.boardId}
									/>
								)
						)}
					</List>
				</Box>
			</Menu>
    </div>
  ) : null;
}

export default MemberMenu