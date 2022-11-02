import usersReducer, {
    followSuccess, InitialStateType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowing,
    unfollowSuccess,
    UsersType
} from "./users-reducer";

let startState: InitialStateType

beforeEach(()=>{
    startState = {users: [
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
        isFetching: false,
        followingInProgress: []
    }
})

test('users should be added', () => {

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

    startState = {
        ...startState,
        users: startState.users.map(el => ({...el, followed: true}))
    }


    const endState1 = usersReducer(startState, unfollowSuccess('1'))
    const endState2 = usersReducer(startState, unfollowSuccess('3'))

    expect(endState1.users[0].followed).toBe(false)
    expect(endState1.users[1].followed).toBe(true)
    expect(endState1.users[2].followed).toBe(true)
    expect(endState1.users[3].followed).toBe(true)

    expect(endState2.users[0].followed).toBe(true)
    expect(endState2.users[1].followed).toBe(true)
    expect(endState2.users[2].followed).toBe(false)
    expect(endState2.users[3].followed).toBe(true)
})


test('"unfollow" should be "follow"', () => {

    const endState1 = usersReducer(startState, followSuccess('2'))
    const endState2 = usersReducer(startState, followSuccess('4'))

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

    const newCurrentPage1 = 45
    const newCurrentPage2 = 17

    const endState1 = usersReducer(startState, setCurrentPage(newCurrentPage1))
    const endState2 = usersReducer(startState, setCurrentPage(newCurrentPage2))

    expect(endState1.currentPage).toBe(newCurrentPage1)
    expect(endState2.currentPage).toBe(newCurrentPage2)
})


test('totalUsersCount should be changed', () => {

    const newCount1 = 1000;
    const newCount2 = 104;

    const endState1 = usersReducer(startState, setTotalUsersCount(newCount1))
    const endState2 = usersReducer(startState, setTotalUsersCount(newCount2))

    expect(endState1.totalUsersCount).toBe(newCount1)
    expect(endState2.totalUsersCount).toBe(newCount2)
})


test('"isFetching" should be changed', () => {

    const newIsFetching = true

    const endState = usersReducer(startState, toggleIsFetching(newIsFetching))

    expect(endState.isFetching).toBe(newIsFetching)
    expect(startState.isFetching).toBe(false)
})


test('array should be changed', () => {

    const followingUser = '5';

    const endState = usersReducer(startState, toggleIsFollowing(true, followingUser))

    expect(endState.followingInProgress.length).toBe(1)
    expect(endState.followingInProgress[0]).toBe(followingUser)

    const followingUser2 = '22'

    const endState2 = usersReducer(endState, toggleIsFollowing(true, followingUser2))

    expect(endState2.followingInProgress.length).toBe(2)
    expect(endState2.followingInProgress[0]).toBe(followingUser)
    expect(endState2.followingInProgress[1]).toBe(followingUser2)

    const unfollowingUser = '5';

    const endState3 = usersReducer(endState2, toggleIsFollowing(false, unfollowingUser))

    expect(endState3.followingInProgress.length).toBe(1)
    expect(endState3.followingInProgress[0]).toBe(followingUser2)
    expect(endState2.followingInProgress.length).toBe(2)
})