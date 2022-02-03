import React, { useState } from 'react';
import { v4 } from 'uuid';

import "./App.css";
import "./bootstrap.min.css";

import InputFieldTask from './components/InputFieldTask';
import InputFieldList from './components/InputFieldList';

import { List, Task } from './model';
import ListComponent from './components/ListComponent';


const App: React.FC = () => {

    // const list0: List = {
    //     id: v4(),
    //     title: "List 0",
    //     tasks: [],
    // };

    const [lists, setLists] = useState<List[]>([]);

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
                list.tasks.push(newTask);
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
            tasks: [],
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
            <ListComponent vars={vars} setters={setters} />
            {
                lists.length > 0 && <InputFieldTask vars={vars} setters={setters} handles={handles} />                
            }
            {/* <InputFieldTask vars={vars} setters={setters} handles={handles} /> */}
            <InputFieldList vars={vars} setters={setters} handles={handles} />
        </div>
    );
};

export default App;
