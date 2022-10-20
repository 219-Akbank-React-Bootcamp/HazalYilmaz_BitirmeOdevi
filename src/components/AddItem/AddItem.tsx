import React, {FC} from 'react'
import { Styled } from './AddItem.styled'
import { AddItemProps } from './AddItem.types'
import { useState } from 'react';
import { cardsCreate } from '../../features/cards/cardsSlice';
import { listsCreate } from '../../features/lists/listsSlice';
import { useDispatch } from 'react-redux';

const AddItem : FC<AddItemProps>= (props) => {
	const [formState, setFormState] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
    const dispatch = useDispatch();

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setInputValue(value);
	}

	function changeFormVisibility() {
		setFormState((prev) => !prev);
	}

    function handleAddItem(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (props.type === 'list') { 
            dispatch(listsCreate({
                title: inputValue,
                order: Number(props.order),
                boardId: props.parentId,
        }))}
		if (props.type === 'card') { 
            dispatch(cardsCreate({
            title: inputValue,
            order: Number(props.order),
            listId: props.parentId,
        }))}
		setInputValue('');
		changeFormVisibility();
	}

  return (
    <Styled>
        {formState ? (
            <form onSubmit={handleAddItem} className='add-item'>
                <input
                    type='text'
                    className='form-control add-item-input'
                    name='inputValue' 
                    aria-label={props.type === 'list' ? 'List Name' : 'Card Name'} 
                    placeholder={props.type === 'list' ? 'List Name' : 'Card Name'}
                    onChange={handleInputChange}
                    value={inputValue}
                    required
                />
                <button type='submit' className='btn btn-success add-btn btn-sm'>Add</button>
            </form>
        ) : (
            <div className='button-listorcard'>
                <button className='btn btn-outline-success btn-add-list btn-sm' onClick={changeFormVisibility}>{props.type === 'list' ? 'Add a list' : 'Add a card'}</button>
            </div>
        )}
    </Styled>
  )
}

export default AddItem