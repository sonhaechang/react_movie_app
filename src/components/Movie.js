
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

function Movie({movie}) {
    return (
        <div className={styles.movie}>
            <img 
                src={movie.medium_cover_image} 
                alt={`${movie.title}-img`} 
                className={styles.movie__img}
            />
            <div>
                <h2 className={styles.movie__title}>
                    <Link to={`/movie/${movie.id}`}>
                        {movie.title}
                    </Link>
                </h2>
                <h3 className={styles.movie__year}>
                    {movie.year}
                </h3>
                <p>
                    { 
                        movie.summary.length > 200 ? 
                        `${movie.summary.slice(0, 200)}...` : 
                        movie.summary 
                    }
                </p>
                <ul className={styles.movie__genres}>
                    {movie.genres.map((g, i) => 
                        <li key={i}>{g}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired
}

export default Movie;