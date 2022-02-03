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
    items: Task[];
}