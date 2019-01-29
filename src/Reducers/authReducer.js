import { SIGNIN,SIGNOUT, SIGNINGIN, NEWUSER, REGISTER,REGISTERING, SIGNINFAILED, OLDUSER } from '../actions/types'

const initialState = {
    loggedin:false,
    user: {},
    newUser:false,
    failed:null
}
export default function(state = initialState,action) {
    switch (action.type){
        case SIGNIN:
            return {
                ...state,
                loggedin:true,
                user:action.payload,
                newUser:false,
                failed:null
            }
        case SIGNOUT:
            return {
                ...state,
                newUser:false,
                user:null,
                loggedin:false
            }
        case OLDUSER:
            return {
                ...state,
                newUser:false
            }
        case SIGNINGIN:
            return{
                ...state,
                user:null,
                failed:null

            }  
        case SIGNINFAILED:
            return {
                ...state,
                failed:action.payload
            }
        case NEWUSER:
            return {
                ...state,
                newUser:true
            }
        case REGISTER:
            return {
                ...state,
                user:action.payload,
                loggedin:true
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
