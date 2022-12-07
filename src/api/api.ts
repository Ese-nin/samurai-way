import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5cd1a899-de0c-4c99-a4b1-a156f06021b6'
    }
})

export const usersAPI = {
    getUsers: function (currentPage: number = 1, pageSize: number = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(resolve => resolve.data)
    },
    unfollow: (userID: string) => {
        return instance.delete(`follow/${userID}`)
            .then(res => res.data)
    },
    follow: (userID: string) => {
        return instance.post(`follow/${userID}`)
            .then(res => res.data)
    }
}

export const profileAPI = {
    getProfile: (userID: string) => {
        return instance.get(`profile/` + userID)
            .then(res => res.data)
    },
    getProfileStatus: (userID: string) => {
        return instance.get(`profile/status/` + userID)
            .then(res => res.data)
    },
    updateProfileStatus: (status: string) => {
        return instance.put(`profile/status`, {status: status})
            .then(res => res.data)
    }
}

export const authAPI = {
    authMe: () => {
        return instance.get(`auth/me`)
            .then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe: boolean = false)  {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    logOut()  {
        return instance.delete(`auth/login`)
            .then(res => res.data)
    }
}