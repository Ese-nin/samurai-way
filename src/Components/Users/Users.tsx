import React from 'react';
import {MapDispatchPropsType, MapStatePropsType} from "./UsersContainer";
import s from "./users.module.css"
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

export class Users extends React.Component<MapDispatchPropsType & MapStatePropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map(el => {
                        return <span key={el}
                                     className={el === this.props.currentPage ? s.selectedPage : ''}
                                     onClick={() => this.onPageChanged(el)}>
                            {el}</span>
                    })}
                </div>
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