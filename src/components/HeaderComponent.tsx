import React from 'react';
import { Handles, Vars } from '../model';

type Props = {
    vars: Vars;
    handles: Handles;
}

const HeaderComponent = ({vars, handles}: Props) => {
  return (
    <header>
        <nav className="p-2 navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <a className="navbar-brand" href="#"><h3>ToDo List</h3></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {vars.lists.length !== 0 ? <form className="form-inline">
                <button className="btn btn-outline-primary" type="button" onClick={handles.openModalList}>Add a list</button>
                <button className="btn btn-outline-primary" type="button" onClick={handles.openModalTask}>Add a task</button>
            </form> : null }
            {vars.lists.length !== 0 ? <small className='text-light'>Number of lists : {vars.lists.length}</small> : null }
        </nav>
    </header>
  );
};

export default HeaderComponent;
