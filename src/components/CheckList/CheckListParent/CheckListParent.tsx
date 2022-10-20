import React, { FC, useState } from 'react'
import { checklistItemCreate, selectCheckedItemsByChecklistId } from '../../../features/checklistItems/checklistItemsSlice';
import { checklistsDelete } from '../../../features/checklists/checklistsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { CheckListParentProps } from './CheckListParent.types'
import { selectChecklistsById } from '../../../features/checklists/checklistsSlice';
import { Grid, IconButton, List, ListItem, ListItemText, TextField, Typography} from '@mui/material';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import CheckListChild from '../CheckListChild';
import CheckListProgress from '../CheckListProgress';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const CheckListParent : FC<CheckListParentProps> = (props) => {
    const [newChecklistItem, setNewChecklistItem] = useState<string>('');
	const { id, cardId, title, items } = useAppSelector((state) =>
		selectChecklistsById(state, props.checklistId)
	);
	const checkedItems = useAppSelector((state) =>
		selectCheckedItemsByChecklistId(state, props.checklistId)
	);
	const dispatch = useAppDispatch();

	function handleChecklistDelete(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();
		dispatch(checklistsDelete({ id, cardId }));
	}

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
		const { value } = event.target;
		setNewChecklistItem(value);
	}

	function handleChecklistItemSubmit(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault();
		event.stopPropagation();

		if (!newChecklistItem) return;

		dispatch(
			checklistItemCreate({
				title: newChecklistItem,
				checklistId: id,
				isChecked: false,
			})
		);

		setNewChecklistItem('');
	}
  return (
    <div>
        <Grid container alignItems="center">
				<Grid item xs={11}>
					<Typography component="h4" variant="h6">
						{title}
					</Typography>
				</Grid>
				<Grid item xs={1} textAlign="right">
					<IconButton onClick={handleChecklistDelete}>
						<DeleteOutlineSharpIcon />
					</IconButton>
				</Grid>
			</Grid>

			<CheckListProgress
				checkedItemsTotal={checkedItems?.length ? checkedItems.length : 0}
				checklistTotal={items?.length ? items.length : 0}
			/>

			<Grid container alignItems="center">
				<Grid item xs={12} sx={{ pl: 1, pr: 1 }}>
					<List sx={{ width: '100%', p: 0 }}>
						{items?.length > 0 &&
							items.map((itemId: number) => (
								<CheckListChild key={itemId} checklistItemId={itemId} />
							))}

						<ListItem
							key={id}
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="Add checklist item"
									onClick={handleChecklistItemSubmit}
								>
									<AddOutlinedIcon />
								</IconButton>
							}
							sx={{ pt: 0, pb: 0, pl: 8, pr: 7 }}
						>
							<ListItemText>
								<TextField
									fullWidth
									name="newChecklistItem"
									label="Checklist item"
									placeholder="Checklist item"
									onChange={handleInputChange}
									value={newChecklistItem}
									required
								/>
							</ListItemText>
						</ListItem>
					</List>
				</Grid>
			</Grid>
    </div>
  )
}

export default CheckListParent