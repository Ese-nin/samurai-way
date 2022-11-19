import appReducer, {initializeApp, InitialStateType} from "./app-reducer";

let startState: InitialStateType;

beforeEach(()=>{
    startState = {
        initializedSuccess: false
    }
})

test('initialized status should be changed', () => {

    const endState = appReducer(startState, initializeApp())

    expect(endState.initializedSuccess).toBe(true)
})