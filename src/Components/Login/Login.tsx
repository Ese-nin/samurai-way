import React from 'react'
import {connect} from "react-redux";
import {logIn} from "../../Redux/Reducers/auth-reducer";
import {AppRootStateType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";
import {useFormik} from "formik";
import s2 from '../common/FormsControls/FormControl.module.css'
import * as Yup from 'yup';


const Login = (props: AllPropsType) => {

    const {logIn, isAuth} = props

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>Login</h2>
        <LoginForm logIn={logIn}/>
    </div>
}

const LoginForm: React.FC<MDTPType> = ({logIn}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Must be 6 characters or more').required('Required')
        }),
        onSubmit: values => {
            const {email, password, rememberMe} = values
            logIn(email, password, rememberMe)
            formik.resetForm()
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email &&
                    <div className={s2.commonErrorMessage}>{formik.errors.email}</div>}
            </div>
            <div>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password &&
                    <div className={s2.commonErrorMessage}>{formik.errors.password}</div>}
            </div>
            <div>
                <input id="rememberMe"
                       type="checkbox"
                       checked={formik.values.rememberMe}
                       {...formik.getFieldProps('rememberMe')}
                />
                Remember Me
            </div>

            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}


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