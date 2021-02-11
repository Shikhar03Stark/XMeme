import React, {useState, useEffect} from 'react';
import './Upvote.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';
const Upvote = (props) => {
    const [toggle, setToggle] = useState(false);
    const toggleButton = (e) => {
        e.preventDefault();
        setToggle(!toggle);
        const serverUrl = 'http://localhost:8081';
        const options = {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        if(toggle === false){
            props.setUpvotes(props.upvotes + 1);
            fetch(`${serverUrl}/memes/upvote/${props.id}`, options);
        }
        else{
            props.setUpvotes(props.upvotes - 1);
            fetch(`${serverUrl}/memes/downvote/${props.id}`, options);
        }
    }

    return (
        <>
        {toggle? 
            <div className="Upvote-container-selected" onClick={toggleButton}>
                <div className="Upvote-icon-selected">
                    <span className="Upvote-iconData-selected"><FontAwesomeIcon icon={faAngleDoubleUp} /></span>
                </div>
            </div>
            : 
        <div className="Upvote-container" onClick={toggleButton}>
            <div className="Upvote-icon">
                <span className="Upvote-iconData"><FontAwesomeIcon icon={faAngleDoubleUp} /></span>
            </div>
        </div>
        }
        </>
        
    )
}

export default Upvote;