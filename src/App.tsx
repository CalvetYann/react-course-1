import React, { useState } from 'react';
import { v4 } from 'uuid';
import Modal from 'react-modal';

import "./App.css";
import "./bootstrap.min.css";

import InputFieldTask from './components/InputFieldTask';
import InputFieldList from './components/InputFieldList';

import { List, Task } from './model';
import ListComponent from './components/ListComponent';
import HeaderComponent from './components/HeaderComponent';


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

    const [modalTaskIsOpen, setModalTaskIsOpen] = useState<boolean>(false);
    const [modalListIsOpen, setModalListIsOpen] = useState<boolean>(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

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

        closeModalTask();
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

        closeModalList();
    }

    const openModalTask = () => {
        setModalTaskIsOpen(true);
    }

    const closeModalTask = () => {
        setModalTaskIsOpen(false);
    }

    const openModalList = () => {
        setModalListIsOpen(true);
    }

    const closeModalList = () => {
        setModalListIsOpen(false);
    }

    const handles = {
        addTask,
        addList,
        openModalTask,
        closeModalTask,
        openModalList,
        closeModalList,
    }

    return (
        <div className="App">
            <HeaderComponent vars={vars} handles={handles} />
            <div className='container'>
                <ListComponent vars={vars} setters={setters} />

                <Modal
                    isOpen={modalTaskIsOpen}
                    onRequestClose={closeModalTask}
                    contentLabel="Task Modal"
                    style={customStyles}
                >
                    <InputFieldTask vars={vars} setters={setters} handles={handles} />                
                </Modal>

                <Modal
                    isOpen={modalListIsOpen}
                    onRequestClose={closeModalList}
                    contentLabel="List Modal"
                    style={customStyles}
                >
                    <InputFieldList vars={vars} setters={setters} handles={handles} />
                </Modal>

                { lists.length === 0 ? <InputFieldList vars={vars} setters={setters} handles={handles} /> : null }
            </div>
        </div>
    );
};

export default App;
