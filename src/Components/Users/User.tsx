import React from 'react';
import s from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../Redux/Reducers/users-reducer";
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UsersType
    unfollow: (userId: string) => void
    follow: (userId: string) => void
    followingInProgress: string[]
}

export const User: React.FC<UserPropsType> = (
    {
        user,
        followingInProgress,
        unfollow,
        follow
    }) => {

    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img className={s.userPhoto} src={user.photos.small !== null ? user.photos.small : userPhoto}
                             alt=""/>
                            </NavLink>
                    </div>

                    <div>
                        {user.followed

                            ? <button disabled={followingInProgress.some(f => f === user.id)}
                                      onClick={() => unfollow(user.id)
                                      }>Unfollow</button>

                            : <button disabled={followingInProgress.some(f => f === user.id)}
                                      onClick={() => follow(user.id)
                                      }>Follow</button>
                        }
                    </div>

                </span>

            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
            </span>
        </div>)
};