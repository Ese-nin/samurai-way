// import {followUser} from "./users-reducer";
// import {ResponseType, ResultCodes, usersAPI} from "api/api";
//
//
// jest.mock('api/api')
// const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
//
// const result: ResponseType = {
//     resultCode: ResultCodes.SUCCESS,
//     messages: [],
//     fieldsErrors: [],
//     data: {}
// }
//
// usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))
//
// test('follow thunk success', async ()=>{
//     const thunk = followUser('3')
//     const dispatchMock = jest.fn()
//     const getStateMock = jest.fn()
//
//
//     await thunk(dispatchMock, getStateMock, {})
//
//     expect(dispatchMock).toBeCalledTimes(3)
// })
export {}