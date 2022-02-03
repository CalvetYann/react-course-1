import React, { useState } from 'react';
import { v4 } from 'uuid';

import "./App.css";
import "./bootstrap.min.css";

import InputFieldTask from './components/InputFieldTask';
import InputFieldList from './components/InputFieldList';

import { List, Task } from './model';


const App: React.FC = () => {

    const list0: List = {
        id: v4(),
        title: "List 0",
        items: [],
    };

    const [lists, setLists] = useState<List[]>([list0]);

    const [list, setList] = useState<List>();
    const [listId, setListId] = useState<string>("");
    const [listTitle, setListTitle] = useState<string>("");
    
    const [taskId, setTaskId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [assignedTo, setAssignedTo] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>("");

    const vars = {
        lists,
        list,
        listId,
        listTitle,
        taskId,
        taskTitle,
        assignedTo,
        priority,
        completed,
        desc,
    }

    const setters = {
        setLists,
        setList,
        setListId,
        setListTitle,
        setTaskId,
        setTaskTitle,
        setAssignedTo,
        setPriority,
        setCompleted,
        setDesc,
    }

    const addTask = (e: any) => {
        e.preventDefault();

        if(!listId || !taskTitle || !assignedTo || !priority || !desc) {
            return alert('Please fill in all fields');
        }

        const newTask: Task = {
            id: v4(),
            title: taskTitle,
            assignedTo: assignedTo,
            priority: priority,
            completed: completed,
            desc: desc,
        }

        lists.forEach(list => {
            if(list.id === listId) {
                list.items.push(newTask);
            }
        });
        
        setLists([...lists]);

        setTaskTitle("");
        setAssignedTo("");
        setPriority("");
        setDesc("");

        console.log("Task", newTask);
        console.log("Lists", lists);
    }

    const addList = (e: any) => {
        e.preventDefault();

        if(!listTitle) {
            return alert('Please fill in all fields');
        }

        const newList: List = {
            id: v4(),
            title: listTitle,
            items: [],
        }
        setLists([...lists, newList]);
        setListTitle("");

        console.log("List", newList);
    }

    const handles = {
        addTask,
        addList,
    }

    return (
        <div className='container'>
            {/* <ListList /> */}
            {lists.map((list: List) => {
                return (
                    <div key={list.id} className='row'>
                        <div className='col-12'>
                            <h2>{list.title}</h2>
                            <hr />
                        </div>
                        <div className='col-12'>
                            <ul className='list-group'>
                                {list.items.map((task: Task) => {
                                    return (
                                        <li key={task.id} className='list-group-item'>
                                            <div className='row'>
                                                <div className='col-9'>
                                                    {task.title}
                                                </div>
                                                <div className='col-3'>
                                                    {task.assignedTo}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    {task.desc}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                );
            })}
            <InputFieldTask vars={vars} setters={setters} handles={handles} />
            <InputFieldList vars={vars} setters={setters} handles={handles} />
        </div>
    );
};

export default App;
