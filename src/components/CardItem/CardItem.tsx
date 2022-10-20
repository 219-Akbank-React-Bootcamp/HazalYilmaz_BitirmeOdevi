import React, { FC, useState } from 'react'
import { cardLabelsCreate, cardLabelsDelete } from '../../features/cardLabels/cardLabelsSlice';
import { cardsDelete, cardsUpdate } from '../../features/cards/cardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Styled } from './CardItem.styled'
import { CardItemProps } from './CardItem.types'
import { selectCardLabelsByCardId } from '../../features/cardLabels/cardLabelsSlice';
import {selectCardsById} from '../../features/cards/cardsSlice';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Breadcrumbs, Modal, Typography, TextField, Chip, IconButton} from '@mui/material';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import CheckListChip from '../CheckList/CheckListChip';
import LabelsBox from '../Labels/LabelsBox';
import Checklists from '../CheckList';
import Comments from '../Comments';
import CheckListAdder from '../CheckList/CheckListAdder';
import LabelsPicker from '../Labels/LabelsPicker';
import Labels from '../Labels';
import DueDatePicker from './DueDatePicker';

const CardItem : FC<CardItemProps> = (props) => {
    const {
		id,
		listId,
		title,
		description,
		duedate,
		comments,
		checklists,
		labels,
	} = useAppSelector((state) => selectCardsById(state, props.cardId));
	const cardLabels = useAppSelector((state) =>
		selectCardLabelsByCardId(state, props.cardId)
	);
	const dispatch = useAppDispatch();

	// States
	const [open, setOpen] = useState<boolean>(false);
	const [newDueDate, setNewDueDate] = useState<Date | null>(
		duedate ? new Date(duedate) : null
	);
	const [newLabels, setNewLabels] = useState<number[]>(
		labels?.length > 0 ? [...labels] : []
	);
	const [formValues, setFormValues] = useState<{
		title: string;
		description: string;
	}>({
		title: title,
		description: description || '',
	});

	// Functions
	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		// If due Date changed
		// Dispatch Card Changes
		if (newDueDate) {
			dispatch(
				cardsUpdate({
					id,
					title: formValues['title'] || title,
					description: formValues['description'] || '',
					duedate: newDueDate && formatDate(newDueDate),
				})
			);
			setOpen(false);
			return;
		}

		// labels added
		// dispatch card label
		if (newLabels.length > 0 && newLabels.length !== labels.length) {
			newLabels.forEach((label) => {
                dispatch(cardLabelsCreate({ labelId: label, cardId:props.cardId}))
            });
		} else if (cardLabels?.length && newLabels.length !== labels.length) {
			labels.forEach((label: number) => {
				const cardLabel = cardLabels.find((item) => item.labelId === label);
                dispatch(cardLabelsDelete({ id: cardLabel.id, cardId: props.cardId, labelId: label }))
				
			});
		}

		// if no due date
		// Dispatch Card Changes
		if (
			formValues['title'] !== title ||
			formValues['description'] !== description
		) {
			dispatch(
				cardsUpdate({
					id,
					title: formValues['title'] || title,
					description: formValues['description'] || '',
				})
			);
		}

		setOpen(false);
	}

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
		const { name, value } = event.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function formatDate(date: Date | string) {
		if (typeof date === 'string') date = new Date(date);

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}-${month < 10 ? `0${month}` : month}-${
			day < 10 ? `0${day}` : day
		}`;
	}

	function handleDueDateChange(selectedDueDate: Date | null) {
		setNewDueDate(selectedDueDate);
	}

	function handleLabelsChange(labelsArray: number[]) {
		setNewLabels([...labelsArray]);
	}

	function handleCardDelete(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();
		dispatch(cardsDelete({ id, listId }));
	}

  return (
    <Styled className='card-item'>
        <Draggable key={props.cardId} draggableId={props.cardId.toString()} index={props.index}>
				{(provided) => (
					<Box
						className='card'
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						key={props.cardId}
						onClick={handleOpen}
					>
						<Box component="header" className='card-header'>
							<div className='card-title'>
								{title}
							</div>
							<IconButton
								className='card-delete-icon'
								aria-label="delete this card"
								size="small"
								sx={{ p: 0 }}
								onClick={handleCardDelete}
							>
								<DeleteOutlineSharpIcon />
							</IconButton>
						</Box>
						<Box className='card-body'>
                            <Chip
								className='card-chip'
                                icon={<AccessTimeSharpIcon />}
                                label={new Date(duedate).toDateString()}
                                color="warning"
                                sx={{ mr: 1, mb: 1 }}
                            />
				
							{checklists?.length > 0 &&
								checklists.map((checklistId: number) => (
									<CheckListChip key={checklistId} checklistId={checklistId} />
								))}
						</Box>
						
					</Box>
				)}
		</Draggable>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className='card-detail' 
					sx={{ 	backgroundColor: '#fff',
							m: 'auto auto', 
							display: 'flex',  
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'flex-start',
							borderRadius: '7px',
							width: '80vh',
							padding: '20px',

						}}
				>
					<Box  className='modal-headers'>
						<DueDatePicker
							cardDueDate={newDueDate}
							onDueDateChange={handleDueDateChange}
						/>
						<LabelsPicker
							cardId={id}
							cardLabels={labels}
							onLabelsSave={handleLabelsChange}
						/>
						<CheckListAdder cardId={id} />

						<IconButton
							onClick={handleClose}
							sx={{ color: '#fff', ml: 'auto' }}
						>
							<CloseSharpIcon />
						</IconButton>
					</Box>

					<Box component="main" 
						sx={{
							display: 'flex',  
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'flex-start',
							borderRadius: '7px',
							width: '100%',
							padding: '20px',
							fontSize: '.7rem',
							color: '#323232',
						}}>
						<Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mb: 4 }}>
							<Typography color="text.primary">{props.listTitle}</Typography>
							<Typography color="text.primary">{title}</Typography>
						</Breadcrumbs>

						{newDueDate && (
							<Box sx={{ mb: 5 }}>
								<Typography
									component="h3"
									variant="h5"
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										alignItems: 'center',
										mb: 1,
									}}
								>
									<AccessTimeSharpIcon sx={{ mr: 1 }} /> Duedate
								</Typography>
								<Chip
									icon={<AccessTimeSharpIcon />}
									label={newDueDate.toDateString()}
									color="warning"
								/>
							</Box>
						)}

						{newLabels?.length > 0 && (
							<Labels cardId={id} cardLabels={newLabels} />
						)}

						<Box sx={{ mb: 8 }}>
							<TextField
								fullWidth
								sx={{ mb: 2 , fontSize: '.7rem'}}
								name="title"
								label="Title"
								placeholder="Title"
								onChange={handleInputChange}
								value={formValues['title'] || title}
								required
							/>
							<TextField
								fullWidth
								multiline
								minRows={3}
								name="description"
								label="Description"
								placeholder="Description"
								onChange={handleInputChange}
								value={formValues['description']}
								required
							/>
						</Box>

						{checklists?.length > 0 && <Checklists checklists={checklists} />}

						<Comments cardId={id} comments={comments}  />
					</Box>
				</Box>
			</Modal>
    </Styled>
)}

export default CardItem