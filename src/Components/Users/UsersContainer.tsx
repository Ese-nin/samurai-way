import React from "react";
import {useAppSelector} from "Redux/store";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {getIsFetching} from "Redux/selectors/user-selectors";

const UsersPage: React.FC = () => {

    const isFetching = useAppSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users />
    </>
}

export default UsersPage