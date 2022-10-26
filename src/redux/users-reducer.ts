import {ActionsTypes, UsersStateType} from "./store";
import {PostsType} from "../components/Profile/MyPosts/MyPosts";
import {ProfilePageType} from "../redux/store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

//поправить типы юзеров в UsersStateType и тип action у reducer

let initialState = {
    users: [
        {
            id: 1,
            followed: false,
            fullName: 'Dmitry',
            status: 'I am a boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            followed: true,
            fullName: 'Sasha',
            status: 'I am a boss too',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 3,
            followed: false,
            fullName: 'Andrew',
            status: 'I am a boss too',
            location: {city: 'Kiev', country: 'Ukraine'}
        },

    ],

}

const usersReducer = (state: UsersStateType = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW:
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
            return stateCopy

        default:
            return state;

    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId})

export default usersReducer;