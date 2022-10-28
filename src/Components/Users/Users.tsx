import React from 'react';
import s from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../Redux/Reducers/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    users: Array<UsersType>
    unfollow: (userId: string) => void
    follow: (userId: string) => void
}

export const Users = (props: UsersPropsType) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(el => {
                    return <span key={el}
                                 className={el === props.currentPage ? s.selectedPage : ''}
                                 onClick={() => props.onPageChanged(el)}>
                            {el}</span>
                })}
            </div>
            {props.users.map(el =>
                <div key={el.id}>

                <span>
                    <div>
                        <NavLink to={'/profile/' + el.id}>
                        <img className={s.userPhoto} src={el.photos.small !== null ? el.photos.small : userPhoto}
                             alt=""/>
                            </NavLink>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': 'f997526b-3fb4-4441-a83c-770b4b82cc36'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(el.id)
                                        }
                                    });
                            }
                            }>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': 'f997526b-3fb4-4441-a83c-770b4b82cc36'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(el.id)
                                        }

                                    });
                            }
                            }>Follow</button>
                        }
                    </div>
                </span>

                    <span>
                    <span>
                        <div>{el.name}</div>
                        <div>{el.status}</div>
                    </span>
                    <span>
                        <div>{"country"}</div>
                        <div>{"city"}</div>
                    </span>
                </span>
                </div>)}
        </div>
    );
};