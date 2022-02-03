import React, { useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Task, List } from '../model';


import './Task.css';

type Props = {
    task: Task;
    listId: string;
    vars: any;
    setters: any;
}

const TaskComponent: React.FC<Props> = ({task, listId, vars, setters}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(task.title);
    const [editAssignedTo, setEditAssignedTo] = useState<string>(task.assignedTo);
    const [editPriority, setEditPriority] = useState<string>(task.priority);
    const [editDesc, setEditDesc] = useState<string>(task.desc);

    const completeTask = (id: string) => {
        setEdit(false);
        setters.setLists(vars.lists.map((list: List) => {
            if (list.id === listId) {
                list.tasks = list.tasks.map((task: Task) => 
                    task.id === id ? {...task, completed:!task.completed} : task 
                );          
            }
            return list;
        }));
    }

    const deleteTask = (id: string) => {
        setters.setLists(vars.lists.map((list: any) => {
            if (list.id === listId) {
                list.tasks = list.tasks.filter((task: any) => task.id !== id);
            }
            return list;
        }))
    }

    const editTask = (e: React.FormEvent, id: string) => {
        e.preventDefault();

        if(editTitle === "" || editAssignedTo === "" || editPriority === "" || editDesc === "") {
            alert("Please fill in all fields");
            return;
        }

        setters.setLists(vars.lists.map((list: List) => {
            if (list.id === listId) {
                list.tasks = list.tasks.map((task: Task) => 
                    task.id === id ? {...task, title: editTitle, assignedTo: editAssignedTo, priority: editPriority, desc: editDesc} : task
                );          
            }
            return list;
        }));

        setEdit(false);
    }

    return (
        <div className='row'>
            <form onSubmit={(e) => { editTask(e, task.id) }}>
                <div className={`card p-0 mt-2 ${task.completed ? "alert-success" : edit ? "alert-warning" : ""}`}>
                    
                    {
                        edit ? (
                            <span>
                                <div className="card-header">
                                    <input className='form-control' value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }} />
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <input className='form-control' value={editAssignedTo} onChange={(e) => { setEditAssignedTo(e.target.value) }} />
                                        <input className='form-control' value={editPriority} onChange={(e) => { setEditPriority(e.target.value) }} />
                                    </div>
                                    <div className='row'>
                                        <input className='form-control' value={editDesc} onChange={(e) => { setEditDesc(e.target.value) }} />
                                    </div>
                                </div>
                            </span>
                        ): (
                            <span>
                                <div className="card-header">
                                    <h5>{task.title}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <h6 className='col-6'>{task.assignedTo}</h6>
                                        <h6 className='col-6'>{task.priority}</h6>
                                    </div>
                                    <div className='row'>
                                        <p>{task.desc}</p>
                                    </div>
                                </div>
                            </span>
                        )
                    }

                    <div className="card-footer">
                        <div className="btn-group" role="group">
                            { !edit ? <button disabled={edit} onClick={() => completeTask(task.id)} type="button" className="btn btn-success"><MdDone /></button> : null }
                            { edit ? ( <input type="submit" className="btn btn-success" value="Save" /> ) : ( task.completed ? null : <button className="btn btn-warning" disabled={task.completed} onClick={() => { setEdit(!edit) }}><AiOutlineEdit /></button> ) }
                            { !edit ? <button disabled={edit} onClick={() => deleteTask(task.id)} type="button" className="btn btn-danger"><AiFillDelete /></button> : null }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TaskComponent;
