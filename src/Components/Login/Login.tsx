import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData

    }

    return <div>
        <h2>Login</h2>
        <LoginFormRedux onSubmit={onSubmit}/>
    </div>
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} placeholder={'e-mail'} component={'input'}/>
            </div>
            <div>
                <Field name={'password'} type={'password'} placeholder={'password'} component={'input'}/>
            </div>
            <div>
                <Field name={'rememberMe'} type='checkbox' component={'input'}/> Remember me
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