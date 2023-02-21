import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Movie from '../components/Movie';
import Pagination from "../components/Pagination";
import Search from "../components/Search";

import styles from './Home.module.css';


function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(
        searchParams.has('page') ? parseInt(searchParams.get('page')) : 1);

    const [sortBy, setSortBy] = useState(
        searchParams.has('sort_by') ? searchParams.get('sort_by') : 'year');

    const [rating, setRating] = useState(
        searchParams.has('rating') ? parseInt(searchParams.get('rating')) : 0);

    const [genre, setGenre] = useState(
        searchParams.has('genre') ? searchParams.get('genre') : 'all');

    const [queryTerm, setQueryTerm] = useState(
        searchParams.has('query_term') ? searchParams.get('query_term') : '');

    const navigate = useNavigate();
        
    const baseUrl = 'https://yts.mx/api/v2/list_movies.json';
    let url = queryTerm === '' ? 
        `${baseUrl}?genre=${genre}&rating=${rating}&sort_by=${sortBy}&page=${currentPage}` : 
        `${baseUrl}?query_term=${queryTerm}`;

    const getMovies = async() => {
        const json = await (
            await fetch(url)
        ).json();
        setMovies(json.data.movies);
        setTotalPage(json.data.movie_count);
        setLoading(false);     
    };

    const pageChange = (page) => {
        setLoading(true);
        searchParams.set('page', page);
        setSearchParams(searchParams);
        setCurrentPage(page);
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        setLoading(true);
        setSortBy(formData.get('sort_by'));
        setRating(formData.get('rating'));
        setGenre(formData.get('genre'));
        setQueryTerm(formData.get('query_term'));
        setCurrentPage(1);

        const replaceUrl = (formData.get('query_term') !== '') ? 
            `?query_term=${formData.get('query_term')}` : 
            `?genre=${formData.get('genre')}&rating=${formData.get('rating')}&sort_by=${formData.get('sort_by')}&page=1`

        navigate(replaceUrl);
    }

    useEffect(() => {
        getMovies();
    }, [currentPage, sortBy, rating, genre, queryTerm]);

    return (
        loading ? (
            <div className={styles.loader}>
                <h1>Loading...</h1> 
            </div> 
        ) : (
            <>
                <Search 
                    searchSubmit={searchSubmit}
                    queryTerm={queryTerm}
                    genre={genre}
                    rating={rating}
                    sortBy={sortBy}
                />

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