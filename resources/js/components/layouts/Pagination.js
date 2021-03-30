import React, { useContext } from "react";
import { paginationList } from "../pages/Users";

const Pagination = ({ pageChange }) => {
    /* Get the necessary data from the parent class */
    const { usersPerPage, totalUsers, currentPage } = useContext(
        paginationList
    );
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const firstPage = pageNumbers[0];
    const lastPage = pageNumbers[pageNumbers.length - 1];

    /* Render page numbers depends on some condition */
    const renderPageNumbers = pageNumbers.map((number) => {
        if (currentPage >= 4 && number == 2) {
            return (
                <li className="page-item disabled" key={number}>
                    <span className="page-link">...</span>
                </li>
            );
        }
        if (currentPage == number) {
            return (
                <li key={number} className="page-item active">
                    <a
                        className="page-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => pageChange(number)}
                    >
                        {number}
                    </a>
                </li>
            );
        } else if (
            number == currentPage + 1 ||
            number == currentPage - 1 ||
            number == lastPage ||
            number == firstPage
        ) {
            return (
                <li key={number} className="page-item">
                    <a
                        className="page-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => pageChange(number)}
                    >
                        {number}
                    </a>
                </li>
            );
        }
        if (currentPage <= lastPage - 3 && number == lastPage - 1) {
            return (
                <li className="page-item disabled" key={number}>
                    <span className="page-link">...</span>
                </li>
            );
        }
    });

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li
                        className={
                            currentPage == pageNumbers[0]
                                ? "page-item disabled"
                                : "page-item"
                        }
                    >
                        <a
                            className="page-link"
                            style={{ cursor: "pointer" }}
                            onClick={() => pageChange(currentPage - 1)}
                            tabIndex="-1"
                        >
                            Previous
                        </a>
                    </li>
                    {renderPageNumbers}
                    <li
                        className={
                            currentPage == pageNumbers[pageNumbers.length - 1]
                                ? "page-item disabled"
                                : "page-item"
                        }
                    >
                        <a
                            className="page-link"
                            style={{ cursor: "pointer" }}
                            onClick={() => pageChange(currentPage + 1)}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
