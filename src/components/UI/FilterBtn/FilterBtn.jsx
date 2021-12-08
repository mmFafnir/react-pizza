
import React from 'react';
import button from "./FilterBtn.scss"

const FilterBtn = ({children, name, option, setSortTab, active, ...props}) => {

   
    return (
        <div className="filter-btn">
            <input onClick={() => setSortTab(children)}  type="radio" name={name} id={option} defaultChecked={active}/>
            <label htmlFor={option}>
                {children}  
            </label>
        </div>
    )
} 

export default FilterBtn;