import React from 'react';

type Props = {
    vars: any;
    handles: any;
}

const HeaderComponent = ({vars, handles}: Props) => {
  return (
    <header>
        <nav className="p-2 navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#"><h3>ToDo List</h3></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {vars.lists.length !== 0 ? <form className="form-inline">
                <button className="btn btn-outline-primary" type="button" onClick={handles.openModalList}>Add a list</button>
                <button className="btn btn-outline-primary" type="button" onClick={handles.openModalTask}>Add a task</button>
            </form> : null }
        </nav>
    </header>
  );
};

export default HeaderComponent;
