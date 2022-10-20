import React, {FC} from 'react'
import AddItem from '../../AddItem'
import { Styled } from './ListFooter.styled'
import { ListFooterProps } from './ListFooter.types'

const ListFooter : FC<ListFooterProps> = (props) => {
  return (
    <Styled>
      <AddItem type={props.type} parentId={props.parentId} order= {props.order} />
    </Styled>
  )
}

export default ListFooter