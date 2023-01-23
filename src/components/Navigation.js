import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
    return (
        <div className={styles.nav}>
            <Link to="/">React Movie App</Link>
        </div>
    );
}

export default Navigation;