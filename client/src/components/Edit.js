import React, {useState, useEffect} from 'react';
import './Edit.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
const Edit = (props) => {

    const toggleEdit = (e) => {
        if(props.editMode === false){
            props.setEditMode(true);
        }
        else{
            props.setEditMode(false);
        }
    }
    return (
        <div className="Edit-container" onClick={toggleEdit}>
            <div className="Edit-icon">
                <span className="Edit-iconData"><FontAwesomeIcon icon={faPencilAlt} /></span>
            </div>
        </div>
    )
}

export default Edit;