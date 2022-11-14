import dialogsReducer, {addMessageAC} from "./dialogs-reducer";

test('message should be added to array', () => {
    const startState = {
        dialogs: [
            {id: "1", name: "Leonid"},
            {id: "2", name: "Victoria"},
            {id: "3", name: "Tamara"},
            {id: "4", name: "Stepan"},
            {id: "5", name: "George"},
            {id: "6", name: "Kate"},
            {id: "7", name: "Maria"},
        ],
        messages: [
            {id: "8", message: "Hi, how are you?"},
            {id: "9", message: "I'm busy"},
            {id: "10", message: "Where you from?"},
            {id: "11", message: "A-a-a-a-a-a"},
        ],
    }

    const message1 = 'How are you?';
    const message2 = 'One two three';

    const endState1 = dialogsReducer(startState, addMessageAC(message1))
    const endState2 = dialogsReducer(startState, addMessageAC(message2))

    expect(endState1.messages.length).toBe(5)
    expect(endState1.messages[4].message).toBe(message1)
    expect(endState2.messages.length).toBe(5)
    expect(endState2.messages[4].message).toBe(message2)

});