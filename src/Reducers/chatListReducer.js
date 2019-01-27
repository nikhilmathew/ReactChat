import { UPDATE_ROOMS, FETCHING_ROOMS,SELECT_CHAT_ROOM, GET_INVITES,FETCHING_INVITES, DELETE_INVITE,CLEAN_CHAT_REDUCER } from '../actions/types'

const initialState = {
    chatRooms : [],
    currentlySelectedRoom:null,
    invitedRooms:[]
}
export default function(state = initialState,action) {
    switch (action.type){
        case CLEAN_CHAT_REDUCER:
            return {
                ...state,
                chatRooms:[],
                currentlySelectedRoom:null,
                invitedRooms:[]
            }
        case FETCHING_ROOMS:
            return {
                ...state,
            }
        case UPDATE_ROOMS:
            if(action.payload === null)
                return state
            let index = state.chatRooms.findIndex(el => el.id === action.payload.id);
            if(index === -1)
                return  {
                    ...state,
                    chatRooms:[...state.chatRooms, action.payload]
                } 
            return state;
        case SELECT_CHAT_ROOM:
                return {
                    ...state,
                    currentlySelectedRoom:state.chatRooms.find(room => room.id ===action.payload)
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