import React from "react";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {
    follow,
    setCurrentPage,
    unfollow,
    UsersType, toggleIsFollowing, getUsers
} from "../../Redux/Reducers/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../Preloader/Preloader";

class UsersAPIComponent extends React.Component<MapDispatchPropsType & MapStatePropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
                   toggleIsFollowing={this.props.toggleIsFollowing}
            />
        </>
    }
}

export type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
}
export type MapDispatchPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowing: (isFetching: boolean, userID: string) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowing,
    getUsers
})(UsersAPIComponent);