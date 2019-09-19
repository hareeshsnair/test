import React from 'react'
import './Input.css'

export default function Input(props) {
    let inputElement = null;

    const inputClasses = []

    if(props.invalid && props.touched) {
        inputClasses.push('error')
    }

    switch(props.elementType) {
        case ('input') :
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
    }

    return (
        <div className="inputDiv">
            <label>{props.elementConfig.placeholder}</label>
            {inputElement}
        </div>
    )
}
