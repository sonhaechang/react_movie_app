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
                    <span
                        className={
                            `
                                ${styles.pageLink}
                                ${(currentPageNum === 1) ? styles.disabled : null}
                            `
                        }
                        onClick={() => pageChange(currentPageNum-1)}
                    >
                        &laquo;
                    </span>
                </li>
                {totalPage.slice(firstNum, lastNum).map((i) => (
                    <li key={i} className={styles.pageItem}>
                        <span
                            className={
                                `
                                    ${styles.pageLink} 
                                    ${(i === currentPageNum) ? styles.active : null}
                                `
                            }
                            onClick={() => pageChange(i)}
                        >
                            {i}
                        </span>
                    </li>
                ))}
                <li key='-2' className={styles.pageItem}>
                    <span
                        className={
                            `
                                ${styles.pageLink}
                                ${(currentPageNum === totalPageNum) ? styles.disabled : null}
                            `
                        }
                        onClick={() => pageChange(currentPageNum+1)}
                    >
                       &raquo; 
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;