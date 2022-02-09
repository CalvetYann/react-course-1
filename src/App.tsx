import React, { FormEvent, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Modal from 'react-modal';

import "./App.css";
import "./bootstrap.min.css";

import InputFieldTask from './components/InputFieldTask';
import InputFieldList from './components/InputFieldList';

import { List, Task } from './model';
import ListComponent from './components/ListComponent';
import HeaderComponent from './components/HeaderComponent';
import FilterComponent from './components/FilterComponent';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App: React.FC = () => {    

    const [lists, setLists] = useState<List[]>([]);

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

    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filteredLists, setFilteredLists] = useState<List[]>([]);

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
        listId,
        listTitle,
        taskId,
        taskTitle,
        assignedTo,
        priority,
        completed,
        desc,
        filterStatus,
        filteredLists
    }

    const setters = {
        setLists,
        setListId,
        setListTitle,
        setTaskId,
        setTaskTitle,
        setAssignedTo,
        setPriority,
        setCompleted,
        setDesc,
        setFilterStatus,
        setFilteredLists
    }

    useEffect(() => {
        const filterTasks = () => {
            switch (filterStatus) {
                case 'complete':
                    setFilteredLists(lists.map(list => {
                        return {
                            ...list,
                            tasks: list.tasks.filter(task => task.completed)
                        }
                    }));
                    break;
                case 'incomplete':
                    setFilteredLists(lists.map(list => {
                        return {
                            ...list,
                            tasks: list.tasks.filter(task => !task.completed)
                        }
                    }));
                    break;
                default:
                    setFilteredLists(lists);
                    break;
            }
        }
        filterTasks();
    }, [filterStatus, lists]);

    const addTask = (e: FormEvent<HTMLFormElement>) => {        
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

    const addList = (e: FormEvent<HTMLFormElement>) => {
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

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const listSource = lists.find(list => list.id === source.droppableId);
        const listDestination = lists.find(list => list.id === destination.droppableId);

        if (listSource && listDestination) {
            const task = listSource.tasks.splice(source.index, 1)[0];
            listDestination.tasks.splice(destination.index, 0, task);

            setLists([...lists]);
        }
    };

    return (
        <div className="App">
            <HeaderComponent vars={vars} handles={handles} />

            <DragDropContext onDragEnd={onDragEnd}>

                <div className='container'>
                    { lists.length === 0 ? <InputFieldList vars={vars} setters={setters} handles={handles} /> : null }

                    <ListComponent vars={vars} setters={setters} />
                    <br />
                    { lists.length !== 0 ? <FilterComponent setters={setters} /> : null }

                    {/* MODALS  */}
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
                </div>
            </DragDropContext>
        </div>
    );
};

export default App;
