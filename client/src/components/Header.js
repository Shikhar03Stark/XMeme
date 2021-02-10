import './Header.css';
import Logo from './Logo';
import Search from './Search';

const Header = (props) => {
    return (
        <div className="Header-enclosure">
                <Logo />
                <Search query={props.query} setQuery={props.setQuery} />
        </div>
    )
}

export default Header;