import {instance, ResponseType} from "./api";

export const authAPI = {
    authMe: () => {
        return instance.get<ResponseType<{ email: string, id: number, login: string }>>(`auth/me`)
            .then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post<ResponseType<{ id: number }>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    }
}