import { SIGNIN,SIGNOUT, SIGNINGIN, NEWUSER, REGISTER,REGISTERING } from '../actions/types'

const initialState = {
    user: {},
    newUser:false
}
export default function(state = initialState,action) {
    switch (action.type){
        case SIGNIN:
            return {
                ...state,
                user:action.payload,
                newUser:false
            }
        case SIGNOUT:
            return {
                newUser:false,
                user:null
            }
        case SIGNINGIN:
            return{
                ...state,
                user:null,

            }  
        case NEWUSER:
            return {
                ...state,
                newUser:true
            }
        case REGISTER:
            return {
                ...state,
                user:action.payload
            }
        case REGISTERING:
            return {
                ...state,
            }
        default:
            return state;
    }
}
// const initialState = {
//   isUserSignedIn: false,
//   isInProgress: false,
//   hasError: false,
//   errorMessage: '',
//   uid: 0
// };

// export function auth(state = initialState, action) {
//   switch(action.type) {
//     case types.SIGNIN_SUCCESS:
//       const { uid } = action;
//       return {
//         ...state,
//         isUserSignedIn: true,
//         isInProgress: false,
//         uid
//       };
//     case types.SIGNIN:
//       return {
//         ...state,
//         isInProgress: true
//       };
//     case types.SIGNIN_ERROR:
//       const { errorMessage } = action;
//       return {
//         ...state,
//         hasError: true,
//         errorMessage
//       };
//     default:
//       return state;
//   }
// }
