import React from 'react';

interface Props {
    vars: any;
    setters: any;
    handles: any;
    //addTask: (e: any) => void;
}

const InputField: React.FC<Props> = ({vars,setters, handles}: Props) => {
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
                        <select className="form-control" id='list'>
                            <option value="">Select a list</option>
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
        <div className="row mt-2">
            <form onSubmit={handles.addList} className='row'>
                <div className="row">
                    <h3>Add a new list</h3>
                </div>
                <div className="row">
                    <div className="form-floating mb-3 col-9">
                        <input type="text" className="form-control" value={vars.listTitle} onChange={(e) => setters.setListTitle(e.target.value)} id="list" placeholder="List"/>
                        <label htmlFor="list">List</label>
                    </div>
                    <div className="form-floating mb-3 col-3">
                        <input type="submit" className="btn btn-primary w-100 h-100" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default InputField;
