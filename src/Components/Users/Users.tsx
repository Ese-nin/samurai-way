import React from 'react';
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "./User";
import {UsersType} from "api/api";
import s from './users.module.css'

type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (currentPage: number) => void
  users: Array<UsersType>
  unfollow: (userId: string) => void
  follow: (userId: string) => void
  toggleIsFollowing: (isFetching: boolean, userID: string) => void
  followingInProgress: string[]
}

export const Users: React.FC<UsersPropsType> = (
  {
    totalUsersCount,
    pageSize,
    currentPage,
    onPageChanged,
    followingInProgress,
    follow,
    unfollow, ...props
  }) => {

  return (
    <div className={s.container}>
      {<Pagination totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   portionSize={10}/>}
      {props.users.map(u =>
        <User key={u.id}
              user={u}
              followingInProgress={followingInProgress}
              follow={follow}
              unfollow={unfollow}/>
      )}
    </div>
  );
};