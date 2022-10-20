import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Navbar from '../elements/Navbar';
import { Styled } from './Boards.styled'
import { usersFetchAll } from '../../features/users/usersSlice';
import {CircularProgress} from '@mui/material';
import BoardItem from '../BoardsItem/BoardsItem';
import { boardsCreate, selectBoardsAll } from '../../features/boards/boardsSlice';

const Boards = () => {
    const boards = useAppSelector(selectBoardsAll);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { status: boardsApiStatus } = useAppSelector((state) => state.boards);
	const { status: usersApiStatus } = useAppSelector((state) => state.users);

	useEffect(() => {
		dispatch(usersFetchAll());
	}, []); 

	// create new board
	async function createNewBoard(): Promise<void> {
		await dispatch(boardsCreate({ title: 'untitled' }))
			.then((response: any) => navigate(`/boards/${response.payload.id}`))
			.catch((error) => console.log(error));
	}
  return (
    <Styled>
		<Navbar />
		{boardsApiStatus === 'loading' || usersApiStatus === 'loading' ? (
				<CircularProgress />
		) : (
				<div className='container'>
					<div className='board'>
						{boards?.length > 0 &&
							boards.map((board) => (
								<div id={board.id}>
									<BoardItem board={board} />
								</div>
							))
						}
						{/* Add new card */}
						<div id={boards?.length > 0 ? boards[boards.length - 1].id + 1 : 1} className=''>
							<div onClick={createNewBoard} className='board-card'>
								<div className='board-card-icon'>
								<span className="material-symbols-outlined board-card-icon-in">add_box</span>
								</div>
								<div className='board-card-text'>Add New</div>
							</div>
						</div>
					</div>
				</div>
		)}
	
    </Styled>
  )}

export default Boards