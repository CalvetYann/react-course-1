import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import TaskComponent from './TaskComponent'

import './List.css'

type Props = {
    vars: any;
    setters: any;
}

const ListComponent: React.FC<Props> = ({vars, setters}: Props) => {

    const deleteList = (id: string, length: number) => {
        if(window.confirm("Are you sure you want to delete this list?") && length === 0) {
            setters.setLists(vars.lists.filter((list: any) => list.id !== id));
        } else {
            alert("You can't delete this list, there are tasks on it!");
        }
    }


    return <div className='row'>
        {
            vars.lists.map((list: any) => {

                return (
                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>{list.title}</h3>
                            </div>
                            <div className='card-body'>
                                {
                                    list.tasks.map((task: any) => {
                                        return <TaskComponent task={task} listId={list.id} vars={vars} setters={setters} key={task.id} />
                                    })
                                }
                            </div>
                            <div className='card-footer'>
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
