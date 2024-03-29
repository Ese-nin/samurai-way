import {FilterType} from "Redux/Reducers/users-reducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import s from './users.module.css'
import {useDebounce} from "hooks/useDebounce";
import {useAppSelector} from "Redux/store";
import {getUsersFilter} from "Redux/selectors/user-selectors";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {

    const filter = useAppSelector(getUsersFilter)

    const [term, setTerm] = useState('')
    const [friend, setFriend] = useState<null | boolean>(null)

    useEffect(()=>{
        setTerm(filter.term)
        setFriend(filter.friend)
    }, [filter])

    const debouncedFilterChange = useDebounce(term, 800)

    const onChangeTermHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.currentTarget.value)
    }

    useEffect(()=>{
        onFilterChanged({term, friend})
    }, [debouncedFilterChange])

    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const result = e.target.value === "null" ? null : e.currentTarget.value === "true"
        setFriend(result)
        onFilterChanged({term, friend: result})
    }

    return (
        <div className={s.searchForm}>
            Find:
            <input value={term} onChange={onChangeTermHandler}/>
            <select value={String(friend)} onChange={onChangeSelectHandler}>
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </select>
        </div>

    )
}