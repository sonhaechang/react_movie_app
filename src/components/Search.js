
import styles from './Search.module.css';

function Search({ searchSubmit, queryTerm, genre, rating, sortBy }) {
    const genreOptions = [
        'all', 'action', 'adventure', 'animation', 'blography',
        'comaedy', 'crime', 'documentery', 'drama', 'family',
        'fantasy', 'flim-Noir', 'game-Show', 'history', 'horror', 
        'music', 'musical', 'mystery', 'news', 'reality-TV',
        'romance', 'sci-Fi', 'sport', 'talk-Show', 'thriller',
        'war', 'western']
    const ratingOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const sortByOptions = [
        'title', 'year', 'rating', 'peers', 'seeds',
        'download_count', 'like_count', 'date_added']

    return (
        <div className={styles.container}>
            <form 
                className={styles.searchForm}
                onSubmit={(e) => searchSubmit(e)}
            >
                <div>
                    <input 
                        className={styles.searchInput} 
                        name="query_term"
                        type="text" 
                        defaultValue={queryTerm !== '' ? queryTerm : null}
                    />
                </div>

                <div>
                    <select 
                        className={styles.searchSelect} 
                        name="genre"
                        defaultValue={genre !== '' ? genre : 'all'} 
                    >
                        { genreOptions.map(genre => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <select 
                        className={styles.searchSelect} 
                        name="rating"
                        defaultValue={rating !== '' ? rating : '0'}
                    >
                        { ratingOptions.map(rating => (
                            <option key={rating} value={rating}>
                                {rating}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <select 
                        className={styles.searchSelect}
                        name="sort_by"
                        defaultValue={sortBy !== '' ? sortBy : 'year'}
                    >
                        { sortByOptions.map(sortBy => (
                            <option key={sortBy} value={sortBy}>
                                {sortBy}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input type='submit' value='Search' className={styles.searchSubmit} />
                </div> 
            </form>
        </div>
    )
}

export default Search;