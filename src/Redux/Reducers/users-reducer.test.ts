import usersReducer, {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow,
    UsersType
} from "./users-reducer";

/*beforeEach(()=>{
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
        currentPage: 1,
        isFetching: false
    }
})*/

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
        currentPage: 1,
        isFetching: false,
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

    const endState = usersReducer(startState, setUsers(newUsers))

    expect(endState.users.length).toBe(2)
    expect(endState.users[1].name).toBe("Timurka")
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
        currentPage: 1,
        isFetching: false,
    }

    const endState1 = usersReducer(startState, unfollow('1'))
    const endState2 = usersReducer(startState, unfollow('3'))

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
        currentPage: 1,
        isFetching: false
    }

    const endState1 = usersReducer(startState, follow('2'))
    const endState2 = usersReducer(startState, follow('4'))

    expect(endState1.users[0].followed).toBe(false)
    expect(endState1.users[1].followed).toBe(true)
    expect(endState1.users[2].followed).toBe(false)
    expect(endState1.users[3].followed).toBe(false)

    expect(endState2.users[0].followed).toBe(false)
    expect(endState2.users[1].followed).toBe(false)
    expect(endState2.users[2].followed).toBe(false)
    expect(endState2.users[3].followed).toBe(true)
})


test('currentPage should be changed', () => {
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
        currentPage: 1,
        isFetching: false
    }

    const newCurrentPage1 = 45
    const newCurrentPage2 = 17

    const endState1 = usersReducer(startState, setCurrentPage(newCurrentPage1))
    const endState2 = usersReducer(startState, setCurrentPage(newCurrentPage2))

    expect(endState1.currentPage).toBe(newCurrentPage1)
    expect(endState2.currentPage).toBe(newCurrentPage2)
})


test('totalUsersCount should be changed', () => {
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
        currentPage: 1,
        isFetching: false
    }

    const newCount1 = 1000;
    const newCount2 = 104;

    const endState1 = usersReducer(startState, setTotalUsersCount(newCount1))
    const endState2 = usersReducer(startState, setTotalUsersCount(newCount2))

    expect(endState1.totalUsersCount).toBe(newCount1)
    expect(endState2.totalUsersCount).toBe(newCount2)
})


test('"isFetching" should be changed', () => {
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
        currentPage: 1,
        isFetching: false
    }

    const newIsFetching = true

    const endState = usersReducer(startState, toggleIsFetching(newIsFetching))

    expect(endState.isFetching).toBe(newIsFetching)
    expect(startState.isFetching).toBe(false)
})