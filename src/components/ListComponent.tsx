import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import TaskComponent from './TaskComponent'

import './List.css'
import { List, Setters, Task, Vars } from '../model';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
    vars: Vars;
    setters: Setters;
}

const ListComponent: React.FC<Props> = ({vars, setters}: Props) => {

    const deleteList = (id: string, length: number) => {
        if(window.confirm("Are you sure you want to delete this list?") && length === 0) {
            setters.setLists(vars.lists.filter((list: List) => list.id !== id));
        }
    }


    return <div className='row'>
        {
            vars.lists.map((list: List) => {

                return (
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>{list.title}</h3>
                            </div>
                            <Droppable droppableId={list.id}>
                                {
                                    (provided) => (
                                        <div className='card-body' ref={provided.innerRef} {...provided.droppableProps}>
                                            {
                                                list.tasks.map((task: Task, index: number) => {
                                                    return <TaskComponent index={index} task={task} listId={list.id} vars={vars} setters={setters} key={task.id} />
                                                })
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <div className='card-footer'>
                                <p>Number of tasks : {list.tasks.length}</p>
                                <p>Number of completed tasks : {list.tasks.filter((task: Task) => task.completed).length}/{list.tasks.length}</p>
                                <button disabled={ list.tasks.length !== 0 } onClick={ () => deleteList(list.id, list.tasks.length) } type="button" className="btn btn-danger"><span className='icon'><AiFillDelete /></span></button>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>;
};

export default ListComponent;
