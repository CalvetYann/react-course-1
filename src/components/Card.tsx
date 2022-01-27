import React from "react";

import './Card.css';

interface Card {
    id: number;
    title: string;
    description: string;
    listId: number;
}

const Card = (props: Card) => {

    const { id, title, description, listId } = props;

    const completeTask = (id: any) => {
        let card = document.getElementById(listId+"-"+id);
        card!.classList.toggle('complete');

    };

    return (
        <div className='card-body' id={listId+"-"+id} key={id}>
            <div className="col-11">
                <h5 className='card-title'>{title}</h5>
                <p className='card-text'>{description}</p>
            </div>
            <div className="col-1">
                <input type="checkbox" className="form-control" name={"cb"+id} onChange={() => completeTask(id)}/>
            </div>
        </div>
    )
}

export default Card;
