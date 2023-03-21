import React from 'react';
import s from "./users.module.css";
import userPhoto from "assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UsersType} from "api/api";
import {Button} from "antd";

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

                            ? <Button disabled={followingInProgress.some(f => +f === user.id)}
                                      onClick={() => unfollow(user.id.toString())
                                      }>Unfollow</Button>

                            : <Button disabled={followingInProgress.some(f => +f === user.id)}
                                      onClick={() => follow(user.id.toString())
                                      }>Follow</Button>
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