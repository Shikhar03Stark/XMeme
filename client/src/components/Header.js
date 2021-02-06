import './Header.css';
import Logo from './Logo';
import Search from './Search';

const Header = () => {
    return (
        <div className="Header-enclosure">
                <Logo />
                <Search />
        </div>
    )
}

export default Header;