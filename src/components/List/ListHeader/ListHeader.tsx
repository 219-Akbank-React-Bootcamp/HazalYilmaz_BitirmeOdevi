import React, {FC, useState} from 'react'
import { listsUpdate } from '../../../features/lists/listsSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { Styled } from './ListHeader.styled'
import { ListHeaderProps } from './ListHeader.types'

const ListHeader : FC<ListHeaderProps> = (props) => {
	const [formState, setFormState] = useState<boolean>(false);
	const [listName, setListName] = useState<string>(props.title);
	const dispatch = useAppDispatch();

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setListName(value);
	}

	function changeFormVisibility() {
		setFormState((prev) => !prev);
	}

	function handleListNameChange(
		event:
			| React.FormEvent<HTMLFormElement>
			| React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
	) {
		event.preventDefault();

		if (props.title === listName || listName === '') {
			changeFormVisibility();
			return;
		}
		dispatch(listsUpdate({ id: props.listId, title: listName }));
		changeFormVisibility();
	}

  return (
    <Styled>
		{formState ? (
			<form onSubmit={handleListNameChange}>
				<input 
					className='listName-edit'
					id='listName' 
					value={listName}
					onChange={handleInputChange}
				/>
			</form>
		) : (
			<div className='listName' onDoubleClick={changeFormVisibility}>
				{props.title}
			</div>

		)}	
    </Styled>
  )
}

export default ListHeader