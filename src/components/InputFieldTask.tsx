import React from 'react';

interface Props {
    vars: any;
    setters: any;
    handles: any;
    //addTask: (e: any) => void;
}

const InputFieldTask: React.FC<Props> = ({vars,setters, handles}: Props) => {
  return (
    <div>
        <div className='row mb-2'>
            <form onSubmit={handles.addTask}>
                <div className="row">
                    <h3>Add a new task  </h3>
                </div>
                <div className="row">
                    <div className="form-floating mb-3 col-3">
                        <input type="text" className="form-control" value={vars.taskTitle} onChange={(e) => setters.setTaskTitle(e.target.value)} id="title" placeholder="Title"/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3 col-3">
                        <input type="text" className="form-control" value={vars.assignedTo} onChange={(e) => setters.setAssignedTo(e.target.value)} id="list" placeholder="List"/>
                        <label htmlFor="list">Assigned To</label>
                    </div>
                    <div className="form-floating mb-3 col-3">
                        <input type="text" className="form-control" value={vars.priority} onChange={(e) => setters.setPriority(e.target.value)} id="priority" placeholder="Priority"/>
                        <label htmlFor="priority">Priority</label>
                    </div>
                    <div className="form-floating mb-3 col-3">
                        <select className="form-control" id='list' value={vars.listId} onChange={(e) => setters.setListId(e.target.value)}>
                            <option value="">Select a list</option>
                            {vars.lists.map((list: any) => {
                                return (
                                    <option value={list.id}>{list.title}</option>
                                );
                            })}
                        </select>
                        <label htmlFor="list">List</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={vars.desc} onChange={(e) => setters.setDesc(e.target.value)} id="description" placeholder="Description"/>
                        <label htmlFor="description">Description</label>
                    </div>
                </div>
                    <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
        </div>
    </div>
  );
};

export default InputFieldTask;