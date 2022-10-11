import React from 'react';
import {MapDispatchPropsType, MapStatePropsType} from "./UsersContainer";
import s from "./users.module.css"
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

export class Users extends React.Component<MapDispatchPropsType, MapStatePropsType> {

    constructor(props: MapDispatchPropsType) {
        super(props);
    }

    componentDidMount() {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    this.props.setUsers(response.data.items);
                });
    }

    render() {
        return (
            <div>
                {this.props.users.map(el =>
                    <div key={el.id}>
                <span>
                    <div>
                        <img className={s.userPhoto} src={el.photos.small !== null ? el.photos.small : userPhoto}
                             alt=""/>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => this.props.unfollow(el.id)}>Unfollow</button>
                            : <button onClick={() => this.props.follow(el.id)}>Follow</button>
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
    }
}