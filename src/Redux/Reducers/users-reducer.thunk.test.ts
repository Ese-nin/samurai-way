import {usersAPI} from "api/users-api";
import {
    followSuccess,
    followUser,
    toggleIsFollowing,
    unfollowSuccess,
    unfollowUser
} from "./users-reducer";
import {ResponseType, ResultCodes} from "api/api";
import Mock = jest.Mock;


jest.mock('api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

let response: ResponseType;
let dispatchMock: Mock;
let getStateMock: Mock;

describe("Users thunk", () => {
    beforeEach(() => {
        response = {
            resultCode: ResultCodes.SUCCESS,
            messages: [],
            fieldsErrors: [],
            data: {}
        }

        dispatchMock = jest.fn()
        getStateMock = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('follow thunk success', async () => {

        usersAPIMock.follow.mockReturnValue(Promise.resolve(response))

        const thunk = followUser('3')

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowing(true, "3"))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess("3"))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowing(false, "3"))
    })

    test('unfollow thunk success', async () => {

        usersAPIMock.unfollow.mockReturnValue(Promise.resolve(response))

        const thunk = unfollowUser('6')

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowing(true, "6"))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess("6"))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowing(false, "6"))
    })
})
