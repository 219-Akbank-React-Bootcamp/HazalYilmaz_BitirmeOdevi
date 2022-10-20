import React, { FC, useState } from 'react'
import { commentsCreate } from '../../features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { CommentsProps } from './Comments.types'
import { Avatar, Box, Button, TextField, Typography} from '@mui/material';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
import CommentsItem from './CommentsItem';

const Comments : FC<CommentsProps> = (props) => {
    const [newComment, setNewComment] = useState<string>('');
	const { username } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
		setNewComment(event.target.value);
	}

	function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		event.stopPropagation();
		if (!newComment) return;
		dispatch(commentsCreate({ cardId: props.cardId, message: newComment }));
		setNewComment('');
	}
  return (
    <div>
        <Box sx={{ mb: 4 }}>
			<Typography
				component="h3"
				variant="h5"
				sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}
			>
				<CommentSharpIcon sx={{ mr: 1 }} /> Comments
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					mb: 2,
				}}
			>
				<Avatar
					sx={{
						width: 30,
						height: 30,
						fontSize: '1rem',
						mr: 2,
					}}
				>
					{username.charAt(0)}
				</Avatar>
				<Box
					component="form"
					onSubmit={handleCommentSubmit}
					sx={{ width: 'calc(100% - 46px)', mb: 3 }}
				>
					<TextField
						fullWidth
						name="newComment"
						label="Comment"
						placeholder="Add comment"
						onChange={handleInputChange}
						value={newComment}
						required
						sx={{ mb: 1 }}
					/>
					<Button type="submit" variant="contained">
						Add
					</Button>
				</Box>

				{props.comments?.length > 0 &&
					props.comments.map((commentId) => (
						<CommentsItem key={commentId} commentId={commentId} />
					))}
			</Box>
		</Box>
    </div>
  )
}

export default Comments