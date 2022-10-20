import React, {FC} from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { selectListsById } from '../../features/lists/listsSlice';
import { useAppSelector } from '../../hooks/hooks';
import { ListProps } from './List.types'

import { Box } from '@mui/material';
import ListFooter from './ListFooter';
import ListHeader from './ListHeader';
import CardItem from '../CardItem';
import { Styled } from './List.styled';

const List : FC<ListProps> = (props) => {
    const { title, boardId, cards } = useAppSelector((state) =>
		selectListsById(state, props.listId)
	);
  return (
    <Styled>
        <Draggable draggableId={`list-${props.listId}`} index={props.index}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<ListHeader
						dnd={provided.dragHandleProps}
						title={title}
						listId={props.listId}
						boardId={boardId}
					/>
					<Droppable droppableId={props.listId.toString()} type="card">
						{(provided) => (
							<Box
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{cards?.length > 0 &&
									cards.map((cardId: number, index: number) => (
										<CardItem
											key={cardId}
											listTitle={title}
											cardId={cardId}
											index={index}
										/>
									))}
								{provided.placeholder}
							</Box>
						)}
					</Droppable>
					<ListFooter
						type="card"
						parentId={props.listId}
						order={cards?.length > 0 ? cards.length : 0}
					/>
				</Box>
			)}
		</Draggable>
    </Styled>
  )
}

export default List