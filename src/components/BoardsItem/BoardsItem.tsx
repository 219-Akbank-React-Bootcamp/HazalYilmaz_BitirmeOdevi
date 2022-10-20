import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { boardsDelete } from '../../features/boards/boardsSlice';
import Member from '../Members/Member';
import { Link } from 'react-router-dom';
import { Styled } from './BoardsItem.styled';

interface AppPropInterface {
	board: any;
}

function BoardItem({ board }: AppPropInterface) {
	const { id: userId } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const isOwner = userId === board?.ownerId ? true : false;

	return (
		<Styled>
			<Link to ={`/boards/${board?.id}`} className='card-top' >
				<div>
					{board?.members?.length > 0 && <Member memberIds={board.members} />}
				</div>
				<div className='board-cards'>
					<div className='board-card-icons'>
						<span className="material-symbols-outlined">layers</span>
					</div>
					<div className='board-cards-text'>{board?.title}</div>
				</div>
			</Link>
			<div className='card-bottom'>
				{isOwner && <button className='card-bottom-delete' onClick={() => dispatch(boardsDelete({ id: board?.id }))}>delete</button> }
			</div>
		
	</Styled>
	);
}

export default BoardItem;
