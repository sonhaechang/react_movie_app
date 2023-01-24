import { Link } from "react-router-dom";
import styles from './Pagination.module.css'

function Pagination({ totalPageNum, currentPageNum, pageChange }) {
    const totalPage = [...Array(totalPageNum+1).keys()].slice(1);
    let firstNum = currentPageNum - (currentPageNum%10);
    let lastNum = firstNum + 10;

    if (firstNum === currentPageNum) {
        firstNum = firstNum - 10;
        lastNum = lastNum - 10;
    }

    return (
        <nav style={{ paddingBottom: '100px' }}>
            <ul className={styles.pagination}>
                {/* Array(totalPage).fill().map((_, i) */}
                <li key='-1' className={styles.pageItem}>
                    <Link
                        to={`/?page=${currentPageNum-1}`}
                        className={
                            `
                                ${styles.pageLink}
                                ${(currentPageNum === 1) ? styles.disabled : null}
                            `
                        }
                        onClick={() => pageChange(currentPageNum-1)}
                    >
                        &laquo;
                    </Link>
                </li>
                {totalPage.slice(firstNum, lastNum).map((i) => (
                    <li 
                        key={i} 
                        className={styles.pageItem}>
                        <Link
                            to={`/?page=${i}`}
                            className={
                                `
                                    ${styles.pageLink} 
                                    ${(i === currentPageNum) ? styles.active : null}
                                `
                            }
                            onClick={() => pageChange(i)}
                        >
                            {i}
                        </Link>
                    </li>
                ))}
                <li key='-2' className={styles.pageItem}>
                    <Link
                        to={`/?page=${currentPageNum+1}`}
                        className={
                            `
                                ${styles.pageLink}
                                ${(currentPageNum === totalPageNum) ? styles.disabled : null}
                            `
                        }
                        onClick={() => pageChange(currentPageNum+1)}
                    >
                        &raquo;
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;