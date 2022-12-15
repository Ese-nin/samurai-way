import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {minLengthCreator, required} from "../../utils/validators/validators";
import {fieldCreator, Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {logIn} from "../../Redux/Reducers/auth-reducer";
import {AppRootStateType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";
import s from "../common/FormsControls/FormControl.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = (props: AllPropsType) => {

    const {logIn, isAuth} = props

    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData
        logIn(email, password, rememberMe)
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>Login</h2>
        <LoginFormRedux onSubmit={onSubmit}/>
    </div>
}

const minLengthCreator6 = minLengthCreator(6)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {fieldCreator('email', Input, 'e-mail', [required])}
            {fieldCreator('password', Input, 'password', [required, minLengthCreator6], 'password')}
            {/*<div>*/}
            {/*    <Field name={'email'}*/}
            {/*           placeholder={'e-mail'}*/}
            {/*           validate={[required]}*/}
            {/*           component={Input}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field name={'password'}*/}
            {/*           type={'password'}*/}
            {/*           placeholder={'password'}*/}
            {/*           validate={[required, minLengthCreator6]}*/}
            {/*           component={Input}/>*/}
            {/*</div>*/}
            {error && <div className={s.commonErrorMessage}>
                {error}
            </div>
            }
            {fieldCreator('rememberMe', Input, undefined, undefined, 'checkbox', 'Remember me')}
            {/*<div>
                <Field name={'rememberMe'}
                       type='checkbox'
                       component={Input}/> Remember me
            </div>*/}
            <div>
                <button type={"submit"}>Login</button>
            </div>
        </form>
    )
}

const LoginFormRedux = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


type AllPropsType = MDTPType & MSTPType

type MDTPType = {
    logIn: (email: string, password: string, rememberMe: boolean) => void
}
type MSTPType = {
    isAuth: boolean
}

const mstp = (state: AppRootStateType): MSTPType => ({
    isAuth: state.auth.isAuth
})

export default connect(mstp, {logIn})(Login)