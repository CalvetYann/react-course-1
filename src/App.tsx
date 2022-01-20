import React from 'react';

import { useState } from 'react';

import List from './components/List';

import './bootstrap.min.css';

const list1: any = {
    id: 0,
    title: 'Title 1',
    items: [],
}

const App = () => {
    const [data, setData] = useState([list1]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: any) => {
        const card = { id: Math.floor(Math.random() * 1000) , title: title, description: description };
        
        list1.items.push(card);

        setData([list1]);

        e.preventDefault();
    }


    return (
        <div className='container'>
            <div className='row'>
                {data.map((currentElement) => <List id={currentElement.id} title={currentElement.title} items={currentElement.items} />)}
            </div>
            <div className='row'>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Title"/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} id="item" placeholder="Item"/>
                        <label htmlFor="item">Item</label>
                    </div>
                    {/* <select className="form-control" value={} > */}
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default App;