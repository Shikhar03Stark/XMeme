import './Form.css';
import Message from './Message.js';
import serverUrl from '../serverUrl/serverUrl'
import React, {useState, useEffect} from 'react';

const Form = ({setPostId}) => {
    const [owner, setOwner] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [flash, setFlash] = useState({
        type: '',
        message: '',
    })

    const postMessage = (event) => {
        event.preventDefault();
        //create JSON Payload
        const payload = {
            name: owner,
            url: image,
            caption: caption
        };

        //fetch options
        const options = {
            method : 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body : JSON.stringify(payload)
        }

        //fetch
        fetch(`${serverUrl}/memes`, options).then(response => response.json())
        .then(data => {
            //render meesage
            const msg = data.flash;
            setFlash(msg);
            if(data.success){
                //empty fields
                setOwner('');
                setCaption('');
                setImage('');
                //setPostID to display in Posts
                setPostId(data.id);
            }
            setTimeout(() => {
                setFlash({
                    type: '',
                    message: '',
                });
            }, 5000);
        })
    }

    return (
        <div className="Form-container">
            <div className="message">
                <Message type={flash.type} message={flash.message}/>
            </div>
            <div className="Form-heading">
                <span>Create Your XMeme</span>
            </div>
            <div className="Form-body">
                <form method="POST">
                    <div name="owner">
                        <span>Owner* : </span>
                        <input value={owner} input="text" name="owner" placeholder="XMeme Owner" onChange={() => {
                            const field = document.querySelector('input[name="owner"]').value;
                            setOwner(field);
                        }}/>
                        <br />
                    </div>
                    <div name="caption">
                        <span>Caption* : </span>
                        <input value={caption} input="text" name="caption" placeholder="Enter Caption" onChange={() => {
                            const field = document.querySelector('input[name="caption"]').value;
                            setCaption(field);
                        }}/>
                        <br />
                    </div>
                    <div name="url">
                        <span>Image Url* : </span>
                        <input value={image} input="text" name="url" placeholder="Enter XMeme Url" onChange={() => {
                            const field = document.querySelector('input[name="url"]').value;
                            setImage(field);
                        }}/>
                        <br />
                    </div>
                    <div className="Form-preview">
                        <div>
                            <img src={image} height="320px" width="320px" alt="Meme Preview"/>
                        </div>
                    </div>
                    <button className="Form-button" onClick={postMessage}>POST</button>

                </form>
            </div>
        </div>
    )
}

export default Form;