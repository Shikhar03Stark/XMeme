import './Upvote.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';
const Upvote = (props) => {
    return (
        <div className="Upvote-container">
            <div className="Upvote-icon">
                <span className="Upvote-iconData"><FontAwesomeIcon icon={faAngleDoubleUp} /></span>
            </div>
        </div>
    )
}

export default Upvote;