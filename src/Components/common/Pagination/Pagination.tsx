import React from 'react';
import s from "./Pagination.module.css";

type PaginationPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = (
    {
        totalUsersCount,
        pageSize,
        onPageChanged,
        currentPage
    }
) => {

    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div className={s.pagination}>
            {pages.map(el => {
                return <span key={el}
                             className={el === currentPage ? s.selectedPage : ''}
                             onClick={() => onPageChanged(el)}>
                            {el}</span>
            })}
        </div>
    );
};