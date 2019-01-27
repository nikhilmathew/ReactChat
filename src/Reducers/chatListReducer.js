import { UPDATE_ROOMS, FETCHING_ROOMS,SELECT_CHAT_ROOM } from '../actions/types'

const initialState = {
    chatRooms : [],
    currentlySelectedRoom:null
}
export default function(state = initialState,action) {
    switch (action.type){
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
        default:
            return state;
    }
}