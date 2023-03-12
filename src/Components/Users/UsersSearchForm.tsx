import {useFormik} from "formik";
import {FilterType} from "Redux/Reducers/users-reducer";
import s from "./users.module.css";
import React from "react";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {

    const formik = useFormik({
        initialValues: {
            friendName: '',
            friend: "null"
        },
        onSubmit: (values: FormType) => {
            const friendValue = values.friend === "null" ? null : values.friend === "true"
            onFilterChanged({term: values.friendName, friend: friendValue})
            console.log(values)
        }
    })

    return (
        <form className={s.searchForm} onSubmit={formik.handleSubmit}>
            <input
                id="friendName"
                {...formik.getFieldProps("friendName")}/>
            <select id="friend" {...formik.getFieldProps("friend")}>
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </select>
            <button type="submit">search</button>
        </form>
    )
}
type FormType = {
    friendName: string
    friend: "null" | "true" | "false"
}