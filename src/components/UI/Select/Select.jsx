
import react from 'react';
import React from 'react';
import button from "./Select.scss"

const Select = ({name, values, sortFn, ...props}) => {
    const sortRef = React.useRef();
    const [currentValue, setCurrentValue] = React.useState(values[0].ru);
    const [active, setActive] = React.useState(false);
    
    const clickOption = (value) => {
        sortFn(value.eng)
        setCurrentValue(value.ru);
    }



    return (
        <div className="select">
            <button onClick={()=> setActive(!active)} className="select__title">
                <span className="select__title_arrow"></span>
                <span className="select__title_desc">Сортировка по:</span>
                <span className="select__value">{currentValue}</span>
            </button>
            <div  className={ active ? "select-body  active" : "select-body"}>
                {
                    values.map((value, index) => (
                        <div className="select-body__item" key={index}>
                            <input onClick={() => clickOption(value)}  name={name} type="radio" value={value.eng} id={value.eng}/>
                            <label htmlFor={value.eng}>{value.ru}</label>
                        </div>   
                    ))
                }

            </div>
        </div>
    )
} 

export default Select;  