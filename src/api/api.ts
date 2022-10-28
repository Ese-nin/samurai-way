import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f997526b-3fb4-4441-a83c-770b4b82cc36'
    }
})

export const getUsers = (currentPage: number = 1, pageSize: number = 5) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(resolve => resolve.data)
}

export const unfollow = (userID: string) => {
    return instance.delete(`follow/${userID}`)
        .then(res => res.data)
}

export const follow = (userID: string) => {
    return instance.post(`follow/${userID}`)
        .then(res => res.data)
}

export const authMe = () => {
    return instance.get(`auth/me`)
        .then(res => res.data)
}

export const getProfile = (userID: string = '26111') => {
    return instance.get(`profile/` + userID)
        .then(res => res.data)
}