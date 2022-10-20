import React, { FC } from 'react'
import { useAppSelector } from '../../../hooks/hooks';
import { selectCheckedItemsByChecklistId } from '../../../features/checklistItems/checklistItemsSlice';
import { selectItemsByChecklistId } from '../../../features/checklistItems/checklistItemsSlice';
import { Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CheckListChipProps } from './CheckListChip.types';

const CheckListChip : FC<CheckListChipProps> = (props) => {
    const checkedItems = useAppSelector((state) =>
		selectCheckedItemsByChecklistId(state, props.checklistId)
	);
	const checklistItems = useAppSelector((state) =>
		selectItemsByChecklistId(state, props.checklistId)
	);
	const label = `${checkedItems?.length || 0}/${checklistItems?.length}`;
  
    return (
    <div>
        <Chip
			key={props.checklistId}
			icon={<CheckCircleOutlineIcon sx={{ width: '.8rem', heigth: '.8rem' }} />}
			label={label}
			color="secondary"
			sx={{ fontSize: '.7rem', padding :'.1rem' }}
		/>
    </div>
  )
}

export default CheckListChip