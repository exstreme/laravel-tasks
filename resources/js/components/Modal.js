import React, {Component} from 'react';

const ModalWindow = ({modal}) => {

    const divStyle = {
        color: "#3c763d",
        background: "#dff0d8",
        border: "#d6e9c6 1px solid",
        padding: "15px",
        display: modal.modalVisible
    };
    return (
        <div style={divStyle}>
            <strong>{modal.message}</strong>
        </div>)
}

export default ModalWindow;
