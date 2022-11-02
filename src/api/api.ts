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
    },
    getProfile: (userID: string = '26111') => {
        return instance.get(`profile/` + userID)
            .then(res => res.data)
    }
}

export const authAPI = {
    authMe: () => {
        return instance.get(`auth/me`)
            .then(res => res.data)
    }
}