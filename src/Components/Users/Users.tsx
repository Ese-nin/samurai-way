import React from 'react';
import {MapDispatchPropsType, MapStatePropsType} from "./UsersContainer";
import s from "./users.module.css"
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

export const Users = (props: MapStatePropsType & MapDispatchPropsType) => {

    const getUsers = () => {
        if (!props.users.length) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    props.setUsers(response.data.items);
                });
        }
    }

    /*props.setUsers(
        [{
            _id: v1(),
            photoURL: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
            followed: false,
            name: "Egorka",
            status: "Hello",
            location: {
                country: "Belarus",
                city: "Minsk",
            },
        },
            {
                _id: v1(),
                photoURL: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
                followed: false,
                name: "Tatyanka",
                status: "Bla-bla-bla",
                location: {
                    country: "Russia",
                    city: "St. Petersburg",
                },
            },
            {
                _id: v1(),
                photoURL: "https://www.esafety.gov.au/sites/default/files/2019-08/Remove%20images%20and%20video.jpg",
                followed: false,
                name: "Timurka",
                status: "Hey, where is my team?",
                location: {
                    country: "Tridevyatoe Tsarstvo",
                    city: "Kitegh",
                },
            },
            {
                _id: v1(),
                photoURL: "https://thumbs.dreamstime.com/b/cosmos-beauty-deep-space-elements-image-furnished-nasa-science-fiction-art-102581846.jpg",
                followed: true,
                name: "Antoshka",
                status: "Don't touch me, please",
                location: {
                    country: "Ukraine",
                    city: "Kiev",
                },
            },]
    )}*/

    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            {props.users.map(el =>
                <div key={el.id}>
                <span>
                    <div>
                        <img className={s.userPhoto} src={el.photos.small !== null ? el.photos.small : userPhoto}
                             alt=""/>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => props.unfollow(el.id)}>Unfollow</button>
                            : <button onClick={() => props.follow(el.id)}>Follow</button>
                        }
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{el.name}</div>
                        <div>{el.status}</div>
                    </span>
                    <span>
                        <div>{"el.location.country"}</div>
                        <div>{"el.location.city"}</div>
                    </span>
                </span>
                </div>)}
        </div>
    );
};