import React from 'react';
import '../css/checkBox.css';

const CheckBox = ({isCompleted, handleChange}) => {
    return (

        <div className="checkbox-wrapper-12">
            <div className="cbx">
                <input id="cbx-12" type="checkbox" checked={isCompleted} onChange={() => handleChange()}/>
                <label htmlFor="cbx-12"></label>
                <svg width="25" height="23" viewBox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo-12">
                        <fegaussianblur in="SourceGraphic" stdDeviation="4" result="blur"></fegaussianblur>
                        <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                        <feblend in="SourceGraphic" in2="goo-12"></feblend>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}

export default CheckBox;