import React, { FC, useState } from 'react'
import { boardResetState } from '../../../features/boards/boardsSlice';
import { boardsMemberResetState } from '../../../features/boardsMember/boardsMemberSlice';
import { cardsResetState } from '../../../features/cards/cardsSlice';
import { labelsResetState } from '../../../features/labels/labelsSlice';
import { listResetState } from '../../../features/lists/listsSlice';
import { clearUser } from '../../../features/user/userSlice';
import { usersResetState } from '../../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import useCookie from '../../../hooks/useCookie';
import { Styled } from './Navbar.styled'
import { NavbarProps } from './Navbar.types'
import { useNavigate, Link as RouterLink } from 'react-router-dom';


const Navbar : FC<NavbarProps>= (props) => {
  const [cookie, setCookie, deleteCookie] = useCookie('token', '');
	const [formState, setFormState] = useState<boolean>(false);
	const [boardName, setBoardName] = useState<string>(props.title);
	const { isLoggedIn } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleLogout(): void {
		dispatch(clearUser());
		dispatch(usersResetState());
		dispatch(boardResetState());
		dispatch(listResetState());
		dispatch(cardsResetState());
		dispatch(labelsResetState());
		dispatch(boardsMemberResetState());
		deleteCookie();
		navigate('/');
	}

	function handleClick(): void {
		navigate('/');
	}

  return (
    <Styled >
      <div className='kanban-title' onClick={handleClick}>Kanban Board</div> 
      <div className='logout' onClick={handleLogout}>
        Logout
        <span className="material-symbols-outlined logout-icon">
          navigate_next
        </span>
      </div>
    </Styled>
  )
}

export default Navbar