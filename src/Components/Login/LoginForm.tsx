import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import s2 from "../Dialogs/Dialogs.module.css";

type PropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    captchaUrl: string | null
}

export const LoginForm: React.FC<PropsType> = ({logIn, captchaUrl}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(4, 'Must be 4 characters or more').required('Required')
        }),
        onSubmit: values => {
            const {email, password, rememberMe, captcha} = values
            logIn(email, password, rememberMe, captcha)
        },
    });

    return (
        <form style={{display: "flex", flexDirection: "column"}} onSubmit={formik.handleSubmit}>
            <div>
                <p>To log in get registered
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}> here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
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

            {
                captchaUrl &&
                <div>
                    <img width="200px" src={captchaUrl} alt="captcha"/><br/>
                    <input id="captcha"
                           {...formik.getFieldProps('captcha')}
                    />
                </div>
            }

            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}