import React, { FC, useState } from 'react'
import { checklistsCreate } from '../../../features/checklists/checklistsSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { CheckListAdderProps } from './CheckListAdder.types'
import { TextField, IconButton, Popover, Box, Button } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

const CheckListAdder : FC<CheckListAdderProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [inputValue, setInputValue] = useState<string>('');
	const dispatch = useAppDispatch();
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}
	function handleClose() {
		setAnchorEl(null);
	}
	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setInputValue(value);
	}
	function handleAddItem(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		event.stopPropagation();
		dispatch(
			checklistsCreate({
				title: inputValue,
				cardId : props.cardId,
			})
		);

		setInputValue('');
		handleClose();
	}
  return (
    <div>
        <IconButton aria-label="Add a checklist" onClick={handleClick}>
				<CheckBoxOutlinedIcon />
			</IconButton>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box sx={{ p: 2 }}>
					<Box component="form" autoComplete="off" onSubmit={handleAddItem}>
						<TextField
							autoFocus
							fullWidth
							sx={{ mb: 2 }}
							name="inputValue"
							label="Add a checklist"
							placeholder="Add a checklist"
							onChange={handleInputChange}
							value={inputValue}
							required
						/>
						<Button type="submit" variant="contained">
							Add
						</Button>
					</Box>
				</Box>
			</Popover>
    </div>
  )
}

export default CheckListAdder