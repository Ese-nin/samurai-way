import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState('')

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.updateStatus(localStatus)
    }

    useEffect(()=>{
        setLocalStatus(props.status)
    }, [props.status])

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
                <span onDoubleClick={onEditMode}>{props.status || "Status is not defined"}</span>
            </div>
    );
}
