import React, { FC } from 'react'
import { commentsDelete, selectCommentsById } from '../../../features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { CommentsItemProps } from './CommentsItem.types'
import { selectUsersById } from '../../../features/users/usersSlice';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { commentBoxStyle, avatarStyles, textBoxStyles, spanStyles, pStyles, iconStyles} from './CommentsItem.styled';

const CommentsItem :FC<CommentsItemProps> = (props) => {
    const { id, message, cardId, authorId } = useAppSelector((state) =>
		selectCommentsById(state, props.commentId)
	);
	const { username } = useAppSelector((state) =>
		selectUsersById(state, authorId)
	);
	const dispatch = useAppDispatch();

    function handleCommentRemove(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();
		dispatch(commentsDelete({ id, cardId }));
	}
  return (
    <div>
        <Box sx={commentBoxStyle}>
			<Avatar sx={avatarStyles}>{username.charAt(0)}</Avatar>
			<Box sx={textBoxStyles}>
				<Box component="span" sx={spanStyles}>
					{username}
				</Box>
				<Box component="p" sx={pStyles}>
					{message}
				</Box>
			</Box>
			<IconButton sx={iconStyles} onClick={handleCommentRemove}>
				<DeleteOutlineSharpIcon />
			</IconButton>
		</Box>
    </div>
  )
}

export default CommentsItem