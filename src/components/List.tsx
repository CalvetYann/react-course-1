import React from 'react';

import Card from './Card';

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
  console.log(id, title);

  return (
    <div className='listContainer w-25'>
        <h5>{ title }</h5>
        <ul className='list'>
            {items.map((currentElt) => <li className='card m-1'><Card id={currentElt.id} title={currentElt.title} description={currentElt.description} /></li>)}
        </ul>
    </div>

  )
}

//export
export default List;