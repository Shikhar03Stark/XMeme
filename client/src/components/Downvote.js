import './Downvote.css';
import DownArrow from '../media/angle-arrow-down.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
const Downvote = (props) => {
    return (
        <div className="Downvote-container">
            <div className="Downvote-icon">
                <span className="Downvote-iconData"><FontAwesomeIcon icon={faAngleDoubleDown} /></span>
            </div>
        </div>
    )
}

export default Downvote;