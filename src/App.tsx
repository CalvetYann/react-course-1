import React, { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { v4 } from 'uuid';

import List from './components/List';

import './bootstrap.min.css';

const list: any = {
    id: 0,
    title: 'Title 0',
    items: [],
}

const App = () => {

    const [data, setData] = useState([list]);

    const [listTitle, setListTitle] = useState('');

    const addList = () => {
        if (listTitle !== '') {
            const newList = {
                id: data.length,
                title: listTitle,
                items: [],
            }
            setData([...data, newList]);
            setListTitle('');
        } else {
            alert('Please enter a title');
        }
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');

    const handleSubmit = (e: any) => {
        if(title === '' || description === '' || id === ''){
            alert('Some fields are empty');
            e.preventDefault();
            return;
        }

        const card = { id: v4() , title: title, description: description };
        
        let listId = parseInt(id);

        data[listId].items.push(card);
        
        setData([...data]);
        
        setTitle('');
        setDescription('');
        
        e.preventDefault();

        console.log("Source avant", data[listId]);
    }


    const handleDragEnd = ({destination, source} :any) => {
        console.log("from", source);
        console.log("to", destination);
        if (!destination) {
            return;
        } 

        if(destination.index === source.index && destination.droppableId === source.droppableId){
            return;
        }

        let itemCopy;
        data[source.droppableId].items.forEach((item :any) => {
            if (item.id === source.index) {
                itemCopy = item;
            }            
        });

        console.log("itemCopy", itemCopy);
        

        const listSource = {...data[source.droppableId]};
        const listDestination = {...data[destination.droppableId]};

        console.log("listSource", listSource);
        console.log("listDestination", listDestination);
        
        listSource.items.splice(source.index, 1);
        listDestination.items.splice(destination.index, 0, itemCopy);

        data[source.droppableId] = listSource;
        data[destination.droppableId] = listDestination;
        
        setData([...data]);
    }

    return (
        <div className='container'>
            <div className='row'>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {data.map((currentElement) => <List id={currentElement.id} title={currentElement.title} items={currentElement.items} />)}
                </DragDropContext>
            </div>
            <div className='row'>
                <h2>Add a new element</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Title"/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} id="item" placeholder="Item"/>
                        <label htmlFor="item">Item</label>
                    </div>
                    <select className="form-control" onChange={e => setId(e.target.value)}>
                        <option value="">Select a list</option>
                        {data.map((currentElement) => <option value={currentElement.id}>{currentElement.title}</option>)}
                    </select>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
            <br />
            <div className='row'>
                <h2>Add a new list</h2>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={listTitle} onChange={e => setListTitle(e.target.value)} id="listTitle" placeholder="Title"/>
                    <label htmlFor="listTitle">Title</label>
                </div>
                <button className='btn btn-primary w-25' onClick={addList}>Add List</button>
            </div>
        </div>
    );
}

export default App;