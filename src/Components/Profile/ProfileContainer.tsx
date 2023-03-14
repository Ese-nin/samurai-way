import React, {ComponentType, useEffect} from "react";
import {Profile} from "./Profile";
import {getProfile, getUserStatus} from "Redux/Reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "hoc/withAuthRedirect";
import {getProfileId} from "../../Redux/selectors/auth-selectors";

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType>

const ProfileContainer: React.FC<ProfileContainerPropsType> = ({match}) => {

    const authorizedUserID = useAppSelector(getProfileId)

    const dispatch = useAppDispatch()

    const refreshProfile = () => {
        let userID = '';
        let chosenUserID = match.params.userId
        if (authorizedUserID) {
            userID = chosenUserID ? chosenUserID : authorizedUserID
        }
        dispatch(getProfile(userID))
        dispatch(getUserStatus(userID))
    }

    useEffect(()=>{
        refreshProfile()
    })


        return (
            <Profile isOwner={!match.params.userId}/>
        )

}

export default compose<ComponentType>(withRouter, withAuthRedirect)(ProfileContainer)
