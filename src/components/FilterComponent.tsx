import React from 'react';
import { Setters } from '../model';

type Props = {
    setters: Setters;
}

const FilterComponent: React.FC<Props> = ({setters}: Props) => {
  return (
    <div className='d-flex justify-content-center min-w-input'>
        <div className="input-group">
            <label className="input-group-text">Filter</label>
            
            <select name="filter" id="filter" className="form-select w-50 max-w" onChange={(e) => {setters.setFilterStatus(e.target.value)}}>
                <option value="">All tasks</option>
                <option value="complete">Completed tasks</option>
                <option value="incomplete">Uncompleted tasks</option>
            </select>
        </div>
    </div>
  );
};

export default FilterComponent;
