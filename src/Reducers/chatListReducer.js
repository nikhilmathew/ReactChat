import { UPDATE_ROOMS, FETCHING_ROOMS,SELECT_CHAT_ROOM, GET_INVITES,FETCHING_INVITES, DELETE_INVITE,CLEAN_CHAT_REDUCER, UPDATE_MESSAGES, UNSELECT_CHAT_ROOM } from '../actions/types'
// import { fetchMessages } from '../actions/chatlistActions'
const initialState = {
    
    chatRooms : [],
    currentlySelectedRoom:null,
    invitedRooms:[],
    messageCache:null
}
export default function(state = initialState,action) {
    switch (action.type){
        case CLEAN_CHAT_REDUCER:
            return {
                ...state,
                chatRooms:[],
                currentlySelectedRoom:null,
                invitedRooms:[],
                messageCache:[]
            }
        case FETCHING_ROOMS:
            return {
                ...state,
            }
        case UPDATE_ROOMS:
            if(action.payload === null)
                return state
            else
                return  {
                    ...state,
                    chatRooms:action.payload//[...state.chatRooms, action.payload]
                } 
        case UNSELECT_CHAT_ROOM:
                return {
                    ...state,
                    currentlySelectedRoom:null,
                    messageCache:null
                }
        case SELECT_CHAT_ROOM:
                // if(state.currentlySelectedRoom!==null){
                //     // fetchMessages(action.payload,false)
                //     return {
                //         ...state,
                //         currentlySelectedRoom:state.chatRooms.find(room => room.id ===action.payload),
                //         messageCache:null
                //     }
                // }else{
                    // fetchMessages(action.payload,true)
                    return {
                        ...state,
                        currentlySelectedRoom:state.chatRooms.find(room => room.id ===action.payload),
                        messageCache:null
                    }
                // }
        case UPDATE_MESSAGES:
                return{
                    ...state,
                    messageCache:action.payload
                }
        case FETCHING_INVITES:
                return state
        case GET_INVITES:
                if(action.payload === null)
                    return state
                let index1 = state.invitedRooms.findIndex(el => el.id === action.payload.id);
                if(index1 === -1)
                    return  {
                        ...state,
                        invitedRooms:[...state.invitedRooms, action.payload]
                    } 
            return state;
        case DELETE_INVITE:
            let arr = state.invitedRooms.filter(item => item.id !== action.payload)
               return {
                   ...state,
                   invitedRooms:arr
               }
        default:
            return state;
    }
}