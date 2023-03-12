// import React from "react";
// import s from './FormControl.module.css'
// import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
// import {FieldValidatorType} from "../../../utils/validators/validators";
//
// type FormControlParamsType = {
//     meta: WrappedFieldMetaProps,
//     children: React.ReactNode
// }
//
// const FormControls: React.FC<FormControlParamsType> = ({meta: {touched, error}, children}) => {
//
//     const showError = touched && error
//
//     return (
//         <div className={s.formControl + ' ' + (showError ? s.error : '')}>
//             <div>
//                 {children}
//             </div>
//             {showError && <span>{error}</span>}
//         </div>
//     )
// }
//
//
// export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//
//     const {input, meta, ...restProps} = props
//
//     return <FormControls {...props}><textarea {...input} {...restProps}/></FormControls>
// }
//
//
// export const Input: React.FC<WrappedFieldProps> = (props) => {
//
//     const {input, meta, ...restProps} = props
//
//     return <FormControls {...props}><input {...input} {...restProps}/></FormControls>
// }


// export const fieldCreator = (
//     name: string,
//     component: React.FC<WrappedFieldProps>,
//     placeholder?: string | undefined,
//     validators?: FieldValidatorType[] | undefined,
//     type?: string,
//     text?: string
// ) => {
//     return (
//         <div>
//             <Field name={name}
//                    placeholder={placeholder}
//                    validate={validators}
//                    component={component}
//                    type={type}/> {text}
//         </div>
//     )
// }
export {}