import './Message.css';
import React, {useEffect, useState} from 'react';

const Message = (props) => {

    const [type, setType] = useState(props.type);

    function removeMessage(milli){
        setTimeout(() => {
            document.querySelector(".Message-body").style.display = 'none';
        }, milli);
    }

    useEffect(() => {
        if(props.type.length > 0){
            document.querySelector(".Message-body").style.display = 'flex';
            removeMessage(6000);
        }
        else{
            removeMessage(0);
        }
    })

    return (
        <div className={`Message-body ${props.type}`}>
            <div className="Message-message">
                <span>{props.message}</span>
            </div>
        </div>
    )
}

export default Message;