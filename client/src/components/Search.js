import './Search.css';
import searchIcon from '../media/search-24px.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const Search = (props) => {

    const akw = (e) => {
        e.preventDefault();
        const value = document.querySelector('input[name="search"]').value;
        props.setQuery(value);
    }

    return (
        <div className="Search-enclosure">
            <div className="Search">
                <form onSubmit={akw}>
                    <FontAwesomeIcon icon={faSearch} />
                    <input name='search' placeholder="Search..." type="text"/>
                </form>
            </div>
        </div>
    )
}

export default Search;