import React, { useState } from 'react';
import { v4 } from 'uuid';

import "./App.css";
import "./bootstrap.min.css";

import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { List, Task } from './model';


const App: React.FC = () => {

    const list0: List = {
        id: v4(),
        title: "List 0",
        items: [],
    };
    const list1: List = {
        id: v4(),
        title: "List 1",
        items: [],
    };

    const [lists, setLists] = useState<List[]>([list0,list1]);

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

        const newTask: Task = {
            id: v4(),
            title: taskTitle,
            assignedTo: assignedTo,
            priority: priority,
            completed: completed,
            desc: desc,
        }

        lists[1].items.push(newTask);
        
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
            <TaskList />
            <InputField vars={vars} setters={setters} handles={handles} />
        </div>
    );
};

export default App;
