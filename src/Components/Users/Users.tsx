import React, {useEffect} from 'react';
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "./User";
import s from './users.module.css'
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followUser, requestUsers, setCurrentPage, unfollowUser} from "Redux/Reducers/users-reducer";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "Redux/selectors/user-selectors";



export const Users: React.FC = () => {

    const users = useAppSelector(getUsers)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const filter = useAppSelector(getUsersFilter)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(requestUsers(currentPage, pageSize, {term: '', friend: null}))
    }, [])

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const follow = (userId: string) => {
        dispatch(followUser(userId))
    }
    const unfollow = (userId: string) => {
        dispatch(unfollowUser(userId))
    }

    return (
        <div className={s.container}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            {<Pagination totalItemsCount={totalUsersCount}
                         pageSize={pageSize}
                         currentPage={currentPage}
                         onPageChanged={onPageChanged}
                         portionSize={10}/>}
            {users.map(u =>
                <User key={u.id}
                      user={u}
                      followingInProgress={followingInProgress}
                      follow={follow}
                      unfollow={unfollow}/>
            )}
        </div>
    );
};


