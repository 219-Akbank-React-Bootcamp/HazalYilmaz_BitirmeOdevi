import React, { FC, useState } from 'react'
import { checklistItemDelete, checklistItemUpdate } from '../../../features/checklistItems/checklistItemsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { CheckListChildProps } from './CheckListChild.types'
import { selectChecklistItemsById } from '../../../features/checklistItems/checklistItemsSlice';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

const CheckListChild : FC<CheckListChildProps>= (props) => {
    const { id, checklistId, title, isChecked } = useAppSelector((state) =>
		selectChecklistItemsById(state, props.checklistItemId)
	);
	const dispatch = useAppDispatch();
	const [checked, setChecked] = useState<boolean>(isChecked);

	function handleToggle() {
		dispatch(checklistItemUpdate({ id, isChecked: !checked }));
		setChecked((prev) => !prev);
	}
	function handleChecklistItemDelete(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();
		dispatch(checklistItemDelete({ id, checklistId }));
	}
  return (
    <div>
        <ListItem
			key={id}
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="Delete checklist item"
					onClick={handleChecklistItemDelete}
				>
					<DeleteOutlineSharpIcon />
				</IconButton>
			}
			disablePadding
		>
			<ListItemButton role={undefined} onClick={handleToggle} dense>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={checked}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': `checkbox-list-label-${id}` }}
					/>
				</ListItemIcon>
				<ListItemText id={`checkbox-list-label-${id}`} primary={title} />
			</ListItemButton>
		</ListItem>
    </div>
  )
}

export default CheckListChild;