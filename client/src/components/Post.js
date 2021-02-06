import './Post.css';
import Upvote from './Upvote.js';
import Downvote from './Downvote.js';

const Post = (props) => {
    return (
        <div className="Post-container">
            <div className="Post-header">

                <div className="Post-details">
                    <span>Harshit &bull; 20:23PM</span>
                </div>
                <div className="Post-votes-enclosure">
                    <div className="Post-votes">
                        <span className="Post-count">12</span>
                    </div>
                </div>
            </div>
            <div className="Post-caption">
                <span className="Post-captionData">Really Nice Caption</span>
            </div>
            <div className="Post-image">
                <img src="https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg" className="Post-imageData" alt="Couldn't Load Image" />
            </div>
            <div className="Post-buttons">
                <Upvote />
                <Downvote />
            </div>
        </div>
    );
}

export default Post;