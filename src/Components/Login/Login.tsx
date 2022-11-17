import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {minLengthCreator, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {logIn} from "../../Redux/Reducers/auth-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = (props: AllPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData
        props.logIn(email, password, rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>Login</h2>
        <LoginFormRedux onSubmit={onSubmit}/>
    </div>
}

const minLengthCreator6 = minLengthCreator(6)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'}
                       placeholder={'e-mail'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field name={'password'}
                       type={'password'}
                       placeholder={'password'}
                       validate={[required, minLengthCreator6]}
                       component={Input}/>
            </div>
            <div>
                <Field name={'rememberMe'}
                       type='checkbox'
                       component={Input}/> Remember me
            </div>
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

const mstp = (state: ReduxStateType): MSTPType => ({
    isAuth: state.auth.isAuth
})

export default connect(mstp, {logIn})(Login)