import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {minLengthCreator, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsControls";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const onSubmit = () => {

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