import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css';

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getMovie = async() => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div 
            className={styles.container}
            style={{ backgroundImage: `url(${movie.background_image})` }}
        >
            {
                loading ? (
                    <div className={styles.loader}>
                        <h1>Loading...</h1> 
                    </div> 
                ) : 

                <div className={styles.movie}>
                    <img 
                        src={movie.large_cover_image} 
                        alt={`${movie.title}-img`} 
                    />
                    <div className={styles.movie__info}>
                        <h1>{movie.title_long}</h1>
                        <ul className={styles.movie__genres}>
                            {movie.genres.map((g, i) => 
                                <li key={i}>{g}</li>
                            )}
                        </ul>
                        <h2 className={styles.movie__desc__title}>
                            description
                        </h2>
                        <p className={styles.movie__desc__content}>
                            {movie.description_intro}
                        </p>
                    </div>
                    
                </div>
            }
        </div>  
    );
}

export default Detail;