import React, { useEffect, useState } from 'react'
import { boardClearStatus, boardsChangeListOrder, boardsFetchById, boardsUpdate } from '../../features/boards/boardsSlice';
import { boardsMemberFetchAll } from '../../features/boardsMember/boardsMemberSlice';
import { cardsUpdate } from '../../features/cards/cardsSlice';
import { labelsFetchAll } from '../../features/labels/labelsSlice';
import { listChangeCardOrder, listClearStatus, listsUpdate } from '../../features/lists/listsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Navbar from '../elements/Navbar'
import { useParams } from 'react-router-dom';
import { selectBoardsById } from '../../features/boards/boardsSlice';
import {CircularProgress} from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../List';
import AddItem from '../AddItem';
import { Styled } from './App.styled';

const App = () => {
    // State
	const [dndObj, setDndObj] = useState<any>({});

	// Variables
	const { boardId } = useParams();

	// Redux
	const { id: userId } = useAppSelector((state) => state.user);
	const board = useAppSelector((state) =>
		selectBoardsById(state, Number(boardId))
	);
	const { status: listUpdateStatus, entities: listEntities } = useAppSelector(
		(state) => state.lists
	);
	const { status: boardsApiStatus } = useAppSelector((state) => state.boards);
	const { status: labelsApiStatus } = useAppSelector((state) => state.labels);
	const { status: boardMemberApiStatus } = useAppSelector(
		(state) => state.boardsMember
	);

	const dispatch = useAppDispatch();
	const isUserOwner = userId === board?.ownerId ? true : false;

	// Functions
	// First init
	useEffect(() => {
		dispatch(boardsFetchById({ id: Number(boardId) }));
		dispatch(boardsMemberFetchAll({ boardId: Number(boardId) }));
		dispatch(labelsFetchAll());
		setDndObj({});
		// eslint-disable-next-line
	}, []);

	// Dispatch card order changes to api after redux changed
	useEffect(() => {
		if (dndObj && dndObj.type === 'card' && listUpdateStatus === 'succeeded') {
			// Get list Ids
			const startListId = Number(dndObj.source.droppableId);
			const finishListId = Number(dndObj.destination.droppableId);

			// Get lists
			const startList = listEntities[startListId];
			const finishList = listEntities[finishListId];

			// If Lists are the same
			// Dispatch only one list
			if (startList === finishList) {
				startList.cards.forEach((cardId: number, index: number) => {
					dispatch(cardsUpdate({ id: cardId, order: index }));
				});

				dispatch(listClearStatus());
				return;
			}

			// If List are not the same
			// Dispatch for both of them
			startList.cards.forEach((cardId: number, index: number) => {
				dispatch(
					cardsUpdate({ id: cardId, listId: startListId, order: index })
				);
			});

			finishList.cards.forEach((cardId: number, index: number) => {
				dispatch(
					cardsUpdate({ id: cardId, listId: finishListId, order: index })
				);
			});

			dispatch(listClearStatus());
		}
		// eslint-disable-next-line
	}, [listEntities]);

	useEffect(() => {
		if (dndObj && dndObj.type === 'list' && boardsApiStatus === 'succeeded') {
			const startList = board.lists;
			startList.forEach((listId: number, index: number) => {
				dispatch(listsUpdate({ id: listId, order: index }));
			});
			dispatch(boardClearStatus());
		}
	}, [board]);

	function onDragEnd(result: any) {
		const { destination, source, draggableId, type } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;
		setDndObj({ destination, source, draggableId, type });
		if (type === 'list') {
			dispatch(
				boardsChangeListOrder({ boardId, destination, source, draggableId })
			);
			return;
		}
		dispatch(listChangeCardOrder({ destination, source, draggableId }));
	}

  return (
    <Styled>
        <Navbar />
        {   boardsApiStatus === 'loading' ||
		    labelsApiStatus === 'loading' ||
			boardMemberApiStatus === 'loading' ? (
                <div><CircularProgress /></div>
        ): (
			<div className='app'>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='all-list' direction='horizontal' type='list'>
						{(provided) => (
							<div className='app-in'>
								<div className='app-list'>{board?.lists?.length > 0 &&
									board.lists.map((listId: number, index: number) => (
										<List key={listId} listId={listId} index={index} />
									))
								}</div>
								{provided.placeholder}
								<div className='add-item'> 
									<AddItem
										type="list"
										parentId={Number(boardId)}
										order={board?.lists?.length > 0 && board.lists.length}
									/>
								</div>
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
        )}
    </Styled>
  )
}
export default App