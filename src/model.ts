import { FormEvent } from "react";

export interface Task{
    id: string;
    title: string;
    assignedTo: string;
    priority: string;
    completed: boolean;
    desc: string;
}

export interface List {
    id: string;
    title: string;
    tasks: Task[];
}

export interface Vars {
    lists: List[];
    listId: string;
    listTitle: string;
    taskId: string;
    taskTitle: string;
    assignedTo: string;
    priority: string;
    completed: boolean;
    desc: string;
}

export interface Setters {
    setLists: (lists: List[]) => void;
    setListId: (id: string) => void;
    setListTitle: (title: string) => void;
    setTaskId: (id: string) => void;
    setTaskTitle: (title: string) => void;
    setAssignedTo: (assignedTo: string) => void;
    setPriority: (priority: string) => void;
    setCompleted: (completed: boolean) => void;
    setDesc: (desc: string) => void;
}

export interface Handles {
    addTask: (e: FormEvent<HTMLFormElement>) => void;
    addList: (e: FormEvent<HTMLFormElement>) => void;
    openModalTask: () => void;
    closeModalTask: () => void;
    openModalList: () => void;
    closeModalList: () => void;
}