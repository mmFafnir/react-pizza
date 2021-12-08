
import React from 'react';
import button from "./Button.scss"

const MyButton = ({children, click, ...props}) => {

   
    return (
        <button onClick={click} className="button">
            {children}
        </button>
    )
} 

export default MyButton;