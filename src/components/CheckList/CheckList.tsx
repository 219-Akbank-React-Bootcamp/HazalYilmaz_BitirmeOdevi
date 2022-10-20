import React, { FC } from 'react'
import { CheckListProps } from './CheckList.types'
import CheckListParent from './CheckListParent';
import { Box, Typography } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

const CheckList : FC<CheckListProps> = (props) => {

  return (
    <div>
        <Box sx={{ mb: 8 }}>
			<Typography
				component="h3"
				variant="h5"
				sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}
			>
				<CheckBoxOutlinedIcon sx={{ mr: 1 }} /> Checklists
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					mb: 2,
				}}
			>
				{props.checklists?.length > 0 &&
					props.checklists.map((checklistId) => (
						<CheckListParent key={checklistId} checklistId={checklistId} />
					))}
			</Box>
		</Box>
    </div>
  )
}

export default CheckList