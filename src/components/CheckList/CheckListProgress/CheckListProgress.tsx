import React, { FC } from 'react'
import { CheckListProgressProps } from './CheckListProgress.types';
import { LinearProgress, Typography, Box } from '@mui/material';


const CheckListProgress : FC<CheckListProgressProps> = (props) => {
    const ratio = props.checklistTotal ? Math.round(100 / props.checklistTotal) : 0;
	const progress = props.checkedItemsTotal < props.checklistTotal ? props.checkedItemsTotal * ratio : 100;

  return (
    <div>
        <Box sx={{ width: '100%', pt: 2, pb: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress variant="determinate" value={progress} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography
						variant="body2"
						color="text.secondary"
					>{`${props.checkedItemsTotal}/${props.checklistTotal}`}</Typography>
				</Box>
			</Box>
		</Box>
    </div>
  )
}

export default CheckListProgress