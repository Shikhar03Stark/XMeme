import React, {useState, useEffect} from 'react';
import './Post.css';
import Upvote from './Upvote.js';
import Edit from './Edit.js';

const Post = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [image, setImage] = useState(props.post.url);
    const [caption, setCaption]  = useState(props.post.caption);
    const [displayTime, setDisplayTime]  = useState(props.post.lastEdit);
    const [fetched, setFetched] = useState(false);

    const updatePost = (event) => {
        event.preventDefault();
        console.log(`Edit on ${props.post.id}`);
        //PATCH
        const serverUrl = "http://localhost:8081";
        const body = {
            url: document.querySelector('input[name="url"]').value,
            caption : document.querySelector('input[name="caption"]').value,
        }
        const option = {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
        }
        
        fetch(`${serverUrl}/memes/${props.post.id}`, option).then(response => response.json())
        .then(data => {
            if(data.success){
                console.log(body);
                setDisplayTime(data.lastEdit);
                setCaption(body.caption);
                document.querySelector('input[name="url"]').value = body.url;
                document.querySelector('input[name="caption"]').value = body.caption;
                setImage(body.url);
                setFetched(false);
                console.log(caption, image);
            }
            setEditMode(false);
        });
    }
    
    console.log(editMode);
    
        useEffect(() => {
            if(!fetched){
                //convert time to human friendly form
                const date = new Date(displayTime);
                const milli = date.getTime();
                const currDate = Date.now();
                const diff = (currDate - milli)/1000;
        
                console.log(diff, diff/60, diff/3600);
                if(diff < 60){
                    setDisplayTime(`${parseInt(diff)} seconds ago`);
                }
                else if(diff/60 < 60) {
                    setDisplayTime(`${parseInt(diff/60)} minutes ago`);
                }
                else if(diff/3600 < 24){
                    setDisplayTime(`${parseInt(diff/3600)} hours ago`);
                }
                else if(diff/3600 < 48){
                    setDisplayTime(`Yesterday`);
                }
                else{
                    //return dd/mm/yyyy
                    const d = date.getDate();
                    const m = date.toLocaleDateString('default', {
                        month: 'long',
                    });
                    const y = date.getFullYear();
                    setDisplayTime(`${m} ${d} ${y}`);
                }
                setFetched(true);
            }
    
        }, [fetched])
    
    return (
        <div className="Post-container">
            <div className="Post-header">

                <div className="Post-details">
                    <span>{props.post.name} &bull; {displayTime}</span>
                </div>
                <div className="Post-votes-enclosure">
                    <div className="Post-votes">
                        <span className="Post-count">{props.post.upvotes}</span>
                    </div>
                </div>
            </div>
            {editMode?
            <>
                <form className="Post-edit" onSubmit={updatePost}>
                    <div className="Post-editBody">
                        <span className="Post-editData">
                            Caption : 
                            <input name="caption" defaultValue={caption} onChange={()=>{}} className="Post-formCaption" />
                        </span>
                        <span className="Post-editData">
                            Image Url : 
                            <input name="url" defaultValue={image} onChange={(e)=>{
                                const url = document.querySelector('input[name="url"]').value;
                                setImage(url);
                            }} className="Post-forUrl" />
                        </span>
                        <div className="Post-preview">
                        <div>
                            <img src={image} height="240px" alt="Meme Preview"/>
                        </div>
                        <button className="Post-update" onClick={updatePost} >
                            Update XMeme
                        </button>
                    </div>
                    </div>
                </form>
            </> :
            <>
                <div className="Post-caption">
                    <span className="Post-captionData">{caption}</span>
                </div>
                <div className="Post-image">
                    <img src={image} className="Post-imageData" alt="Couldn't Load Image" />
                </div>
            </>}
            <div className="Post-buttons">
                <Upvote />
                <Edit editMode={editMode} setEditMode={setEditMode} />
            </div>
        </div>
    );
}

export default Post;