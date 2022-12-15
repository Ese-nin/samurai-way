import React from 'react';
import {UsersType} from "../../Redux/Reducers/users-reducer";
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "./User";

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
        <div>
            {<Pagination totalUsersCount={totalUsersCount}
                         pageSize={pageSize}
                         currentPage={currentPage}
                         onPageChanged={onPageChanged}/>}
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