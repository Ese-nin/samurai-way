import {v1} from "uuid";
import profileReducer, {addPostAC, profilePageType, textareaChangeAC} from "./profile-reducer";

let startState: profilePageType

beforeEach(()=>{
    startState = {
        profile: {
            aboutMe: "я круто чувак 1001%",
            contacts: {
                /*"facebook": "facebook.com",
                "website": null,
                "vk": "vk.com/dimych",
                "twitter": "https://twitter.com/@sdf",
                "instagram": "instagra.com/sds",
                "youtube": null,
                "github": "github.com",
                "mainLink": null*/
            },
            lookingForAJob: true,
            lookingForAJobDescription: "не ищу, а дурачусь",
            fullName: "samurai dimych",
            userId: 2,
            photos: {
                small: "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
                large: "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
            }
        },
        posts: [
            {id: v1(), message: "Hallo, mein freund", likesCount: 3},
            {id: v1(), message: "It's my first post", likesCount: 45},
            {id: v1(), message: "Good bye", likesCount: 1792}
        ],
        newPostText: "IT-Kamasutra",
        status: ''
    };
})

test('newPostText should be changed', () => {

    const message1 = 'How are you?';
    const message2 = 'One two three';

    const endState1 = profileReducer(startState, textareaChangeAC(message1))
    const endState2 = profileReducer(startState, textareaChangeAC(message2))

    expect(endState1.newPostText).toBe(message1)
    expect(endState2.newPostText).toBe(message2)
});


test('new post should be added', () => {

    const message1 = 'How are you?';
    const message2 = 'One two three';

    const endState1 = profileReducer(startState, addPostAC(message1))
    const endState2 = profileReducer(startState, addPostAC(message2))

    expect(endState1.posts.length).toBe(4)
    expect(endState2.posts.length).toBe(4)
    expect(endState1.posts[3].message).toBe(message1)
    expect(endState2.posts[3].message).toBe(message2)
    expect(endState1.newPostText).toBe('')
    expect(endState2.newPostText).toBe('')
})