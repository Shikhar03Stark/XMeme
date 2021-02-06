import './Search.css';
import searchIcon from '../media/search-24px.svg';

const Search = () => {
    return (
        <div className="Search-enclosure">
            <div className="Search">
                <img style={{color:'white'}} src={searchIcon}/>
                <input placeholder="Search..." type="text" />
            </div>
        </div>
    )
}

export default Search;