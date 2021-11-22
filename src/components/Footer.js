import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export const Footer = () => {
    const location = useLocation();
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            {location.pathname === '/About' ? (
                <Link to='/'>Home</Link>
            ) : (
                <Link to='/About'>About</Link>
            )}
        </footer>
    )
}

export default Footer;