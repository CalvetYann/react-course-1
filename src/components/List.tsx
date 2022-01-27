import React from 'react';

import Card from './Card';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import './List.css';

interface List{
  id :number,
  title :string,
  items :any[],
};

//component
const List = (props :List) => {

  //destructuration de props
  const {id, title, items} = props;

  return (
    <div className='listContainer w-25'>
        <h5>{ title }</h5>
        <Droppable droppableId={""+id}>
          {(provided, snapshot) => {
            return (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='list'
              >
                {items.map((currentElt) =>
                  <Draggable key={currentElt.id} index={currentElt.id} draggableId={""+currentElt.id}>
                  {(provided) => {
                      return (
                        <li 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='card m-1'
                          key={currentElt.id}
                        ><Card id={currentElt.id} title={currentElt.title} description={currentElt.description} /></li>)}
                      }
                  </Draggable>
                )}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
        {/* <ul >
            {items.map((currentElt) => <li className='card m-1'><Card id={currentElt.id} title={currentElt.title} description={currentElt.description} listId={id} /></li>)}
        </ul> */}
    </div>

  )
}

//export
export default List;