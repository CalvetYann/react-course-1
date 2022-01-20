import React from "react";

interface Card {
    id: number;
    title: string;
    description: string;
}

const Card = (props: Card) => {

    const { id, title, description } = props;

    return (
        <div className='card-body' key={id}>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
        </div>
    )
}

export default Card;
