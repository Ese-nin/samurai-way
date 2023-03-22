import {instance, ResponseType} from "./api";
import {PhotosType} from "./profile-api";

export const usersAPI = {
    getUsers: function (currentPage: number = 1, pageSize: number = 5, term: string = '', friend: boolean | null = null) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? `` : `&friend=${friend}`))
            .then(res => res.data)
    },
    unfollow: (userID: string) => {
        return instance.delete<ResponseType>(`follow/${userID}`)
            .then(res => res.data)
    },
    follow: (userID: string) => {
        return instance.post<ResponseType>(`follow/${userID}`)
            .then(res => res.data)
    }
}

export type UsersType = {
    name: string;
    id: number;
    uniqueUrlName?: string;
    photos: PhotosType;
    status?: string;
    followed: boolean;
}

export type UsersResponseType = {
    items: UsersType[];
    totalCount: number;
    error?: string;
}