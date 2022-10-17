import usersReducer, {followAC, setUsersAC, unfollowAC, UsersType} from "./users-reducer";

test('users should be added', () => {
    const startState = {users: [
        {
            id: '1',
            photos: {small: '', large: ''},
            followed: false,
            name: "Egorka",
            status: "Hello",
            location: {country: "Belarus", city: "Minsk"},
        },
        {
            id: '2',
            photos: {small: '', large: ''},
            followed: false,
            name: "Tatyanka",
            status: "Bla-bla-bla",
            location: {country: "Russia", city: "St. Petersburg"},
        },
        {
            id: '3',
            photos: {small: '', large: ''},
            followed: false,
            name: "Timurka",
            status: "Hey, where is my team?",
            location: {country: "Tridevyatoe Tsarstvo", city: "Kitegh"},
        },
        {
            id: '4',
            photos: {small: '', large: ''},
            followed: true,
            name: "Antoshka",
            status: "Don't touch me, please",
            location: {country: "Ukraine", city: "Kiev"},
        }
    ],
        pageSize: 3,
        totalUsersCount: 25,
        currentPage: 1
    }

    const newUsers: Array<UsersType> = [
        {
            id: '666',
            photos: {small: '', large: ''},
            followed: false,
            name: "Tatyanka",
            status: "Bla-bla-bla",
            location: {country: "Russia", city: "St. Petersburg"},
        },
        {
            id: '94657',
            photos: {small: '', large: ''},
            followed: false,
            name: "Timurka",
            status: "Hey, where is my team?",
            location: {country: "Tridevyatoe Tsarstvo", city: "Kitegh"},
        },
    ]

    const endState = usersReducer(startState, setUsersAC(newUsers))

    expect(endState.users.length).toBe(6)
    expect(endState.users[5].name).toBe("Timurka")
})


test('"follow" should be "unfollow"', () => {
    const startState = {users: [
            {
                id: '1',
                photos: {small: '', large: ''},
                followed: true,
                name: "Egorka",
                status: "Hello",
                location: {country: "Belarus", city: "Minsk"},
            },
            {
                id: '2',
                photos: {small: '', large: ''},
                followed: true,
                name: "Tatyanka",
                status: "Bla-bla-bla",
                location: {country: "Russia", city: "St. Petersburg"},
            },
            {
                id: '3',
                photos: {small: '', large: ''},
                followed: true,
                name: "Timurka",
                status: "Hey, where is my team?",
                location: {country: "Tridevyatoe Tsarstvo", city: "Kitegh"},
            },
            {
                id: '4',
                photos: {small: '', large: ''},
                followed: true,
                name: "Antoshka",
                status: "Don't touch me, please",
                location: {country: "Ukraine", city: "Kiev"},
            }
        ],
        pageSize: 3,
        totalUsersCount: 25,
        currentPage: 1
    }

    const endState1 = usersReducer(startState, unfollowAC('1'))
    const endState2 = usersReducer(startState, unfollowAC('3'))

    expect(endState1.users[0].followed).toBe(false)
    expect(endState1.users[1].followed).toBe(true)
    expect(endState1.users[2].followed).toBe(true)
    expect(endState1.users[3].followed).toBe(true)

    expect(endState2.users[2].followed).toBe(false)
    expect(endState2.users[0].followed).toBe(true)
    expect(endState2.users[1].followed).toBe(true)
    expect(endState2.users[3].followed).toBe(true)
})


test('"unfollow" should be "follow"', () => {
    const startState = {users: [
            {
                id: '1',
                photos: {small: '', large: ''},
                followed: false,
                name: "Egorka",
                status: "Hello",
                location: {country: "Belarus", city: "Minsk"},
            },
            {
                id: '2',
                photos: {small: '', large: ''},
                followed: false,
                name: "Tatyanka",
                status: "Bla-bla-bla",
                location: {country: "Russia", city: "St. Petersburg"},
            },
            {
                id: '3',
                photos: {small: '', large: ''},
                followed: false,
                name: "Timurka",
                status: "Hey, where is my team?",
                location: {country: "Tridevyatoe Tsarstvo", city: "Kitegh"},
            },
            {
                id: '4',
                photos: {small: '', large: ''},
                followed: false,
                name: "Antoshka",
                status: "Don't touch me, please",
                location: {country: "Ukraine", city: "Kiev"},
            }
        ],
        pageSize: 3,
        totalUsersCount: 25,
        currentPage: 1
    }

    const endState1 = usersReducer(startState, followAC('2'))
    const endState2 = usersReducer(startState, followAC('4'))

    expect(endState1.users[0].followed).toBe(false)
    expect(endState1.users[1].followed).toBe(true)
    expect(endState1.users[2].followed).toBe(false)
    expect(endState1.users[3].followed).toBe(false)

    expect(endState2.users[0].followed).toBe(false)
    expect(endState2.users[1].followed).toBe(false)
    expect(endState2.users[2].followed).toBe(false)
    expect(endState2.users[3].followed).toBe(true)
})