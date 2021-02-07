import './Form.css'
const Form = () => {
    const postMessage = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className="Form-container">
            <div className="message">
                {//<Message />
}
            </div>
            <div className="Form-heading">
                <span>Create Your XMeme</span>
            </div>
            <div className="Form-body">
                <form method="POST">
                    <div name="owner">
                        <span>Owner* : </span>
                        <input input="text" name="owner" placeholder="XMeme Owner"/>
                        <br />
                    </div>
                    <div name="caption">
                        <span>Caption* : </span>
                        <input input="text" name="caption" placeholder="Enter Caption"/>
                        <br />
                    </div>
                    <div name="url">
                        <span>Image Url* : </span>
                        <input input="text" name="url" placeholder="Enter XMeme Url"/>
                        <br />
                    </div>
                    <div className="Form-preview">
                        <div>
                            Image Preview
                        </div>
                    </div>
                    <button className="Form-button" onClick={postMessage}>POST</button>

                </form>
            </div>
        </div>
    )
}

export default Form;