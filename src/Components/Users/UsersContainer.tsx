import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "Redux/store";
import {
    FilterType,
    follow,
    requestUsers,
    setCurrentPage,
    toggleIsFollowing,
    unfollow
} from "Redux/Reducers/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "Redux/selectors/user-selectors";
import {UsersType} from "api/api";

class UsersAPIComponent extends React.Component<MapDispatchPropsType & MapStatePropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        console.log(filter)
        const {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter)
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
                   onFilterChanged={this.onFilterChanged}
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
    filter: FilterType
}
export type MapDispatchPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowing: (isFetching: boolean, userID: string) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowing,
    getUsers: requestUsers
})(UsersAPIComponent);