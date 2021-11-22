import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAddClick, showAddTaskForm }) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h2>{title}</h2>
            {location.pathname === '/' && (
                <Button
                    color={showAddTaskForm ? 'red' : 'green'}
                    text={showAddTaskForm ? 'HIDE' : 'ADD'}
                    onClick={onAddClick} />
            )}
        </header>
    )
};

Header.defaultProps = {
    title: 'Task Tracker'
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;