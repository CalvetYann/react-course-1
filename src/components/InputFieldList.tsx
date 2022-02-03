import React from 'react';

interface Props {
    vars: any;
    setters: any;
    handles: any;
    //addTask: (e: any) => void;
}

const InputFieldList: React.FC<Props> = ({vars,setters, handles}: Props) => {
  return (
    <div>
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

export default InputFieldList;