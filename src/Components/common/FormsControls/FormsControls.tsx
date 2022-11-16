import React from "react";
import s from './FormControl.module.css'
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlParamsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode
}




const FormControls: React.FC<FormControlParamsType> = ({meta: {touched, error}, children}) => {

    const showError = touched && error

    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                {children}
            </div>
            {showError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {

    const {input, meta, ...restProps} = props

    return <FormControls {...props}><textarea {...input} {...restProps}/></FormControls>
}


export const Input: React.FC<WrappedFieldProps> = (props) => {

    const {input, meta, ...restProps} = props

    return <FormControls {...props}><input {...input} {...restProps}/></FormControls>
}