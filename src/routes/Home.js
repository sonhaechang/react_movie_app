import { useState, useEffect } from "react";
import Movie from '../components/Movie';
import styles from './Home.module.css';
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState({});
    const [totalPage, setTotalPage] = useState(1);

    const params = new URLSearchParams(useLocation().search);
    const [currentPage, setCurrentPage] = useState(
        params.has('page') ? parseInt(params.get('page')) : 1);

    const getMovies = async() => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?page=${currentPage}&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setTotalPage(json.data.movie_count);
        setLoading(false);     
    };

    const pageChange = (page) => {
        setLoading(true);
        setCurrentPage(page);
    }

    useEffect(() => {
        getMovies();
    }, [currentPage]);

    return (
        loading ? (
            <div className={styles.loader}>
                <h1>Loading...</h1> 
            </div> 
        ) : (
            <>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        {movies.map(movie => (
                            <Movie
                                key={movie.id} 
                                movie={movie} 
                            />
                        ))}
                    </div>
                </div>

                <Pagination 
                    totalPageNum={Math.ceil(totalPage / movies.length)}
                    currentPageNum={currentPage}
                    pageChange={pageChange}
                />
            </>
        )
    );
}

export default Home;