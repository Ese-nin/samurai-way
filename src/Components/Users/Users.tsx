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
import {useHistory} from "react-router-dom";
import * as querystring from "querystring";


export const Users: React.FC = () => {

    const users = useAppSelector(getUsers)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const filter = useAppSelector(getUsersFilter)

    const dispatch = useAppDispatch()
    const history = useHistory()

    useEffect(() => {
        const {
            page,
            friend,
            term
        } = querystring.parse(history.location.search.substr(1)) as { term: string, friend: string, page: string }

        let actualPage = currentPage
        let actualFilter = filter

        if (!!page) actualPage = +page
        if (!!term) actualFilter = {...actualFilter, term: term}
        if (!!friend) actualFilter = {
            ...actualFilter,
            friend: friend === 'null' ? null : friend === 'true'
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    let finalUrlSearch = ``
    if (filter.term === "") finalUrlSearch = `?friend=${filter.friend}&page=${currentPage}`
    if (filter.friend === null) finalUrlSearch = `?term=${filter.term}&page=${currentPage}`
    if (currentPage === 1) finalUrlSearch = `?term=${filter.term}&friend=${filter.friend}`

    if (filter.term === "" && filter.friend === null) finalUrlSearch = `?page=${currentPage}`
    if (filter.term === "" && currentPage === 1) finalUrlSearch = `?friend=${filter.friend}`
    if (filter.friend === null && currentPage === 1) finalUrlSearch = `?term=${filter.term}`
    if (filter.term === "" && filter.friend === null && currentPage === 1) finalUrlSearch = ``

    useEffect(() => {
        history.push({
            pathname: '/users',
            search: finalUrlSearch
        })
    }, [filter, currentPage])

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
            <Pagination totalItemsCount={totalUsersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}
                        portionSize={10}/>
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


