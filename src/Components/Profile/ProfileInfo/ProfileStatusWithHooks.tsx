import React, {ChangeEvent, useEffect, useState} from 'react';
import {updateUserStatus} from "Redux/Reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {getProfileStatusSelector} from "Redux/selectors/profile-selectors";

export const ProfileStatusWithHooks: React.FC = () => {

    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState('')

    const status = useAppSelector(getProfileStatusSelector)

    const dispatch = useAppDispatch()

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(localStatus))
    }

    useEffect(()=>{
        setLocalStatus(status)
    }, [status])

    return (
        editMode
            ?
            <div>
                <input onChange={onChangeStatus}
                       onBlur={offEditMode}
                       value={localStatus}
                       autoFocus/>
            </div>
            :
            <div>
                <b>Status: </b><span onDoubleClick={onEditMode}>{status || "Status is not defined"}</span>
            </div>
    );
}
