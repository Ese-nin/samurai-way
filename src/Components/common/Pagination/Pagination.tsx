import React, {useState} from 'react';
import s from "./Pagination.module.css";

type PaginationPropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (currentPage: number) => void
  portionSize: number
}

export const Pagination: React.FC<PaginationPropsType> = (
  {
    totalItemsCount,
    pageSize,
    onPageChanged,
    currentPage,
    portionSize
  }
) => {

  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.pagination}>
      {portionNumber > 1 &&
          <button onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}>prev</button>}

      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(el => {
        return <span key={el}
                     className={el === currentPage ? s.selectedPage : s.page}
                     onClick={() => onPageChanged(el)}>
                            {el}</span>
      })}

      {portionCount > portionNumber &&
          <button onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}>next</button>}
    </div>
  );
};