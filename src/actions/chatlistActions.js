import { FETCHING_ROOMS,UPDATE_ROOMS, SELECT_CHAT_ROOM, FETCHING_INVITES, GET_INVITES, DELETE_INVITE,CLEAN_CHAT_REDUCER } from './types'
import fire from '../Config/fire'
import { rejectInvite } from '../Config/fireMethods'

export function cleanStateOnleaveHome(){
    return function(dispatch){
        dispatch({
            type:CLEAN_CHAT_REDUCER,
            payload:null
        })
    }
}
export function selectChatRoom(room){
    return function(dispatch){
        dispatch({
            type:SELECT_CHAT_ROOM,
            payload:room
        })
    }
}
export function fetchRooms(){
    return function(dispatch){
        console.log("fetch rooms method called")
        dispatch(
            {
                type: FETCHING_ROOMS,
                payload: null
            }
          );
        return fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
        .onSnapshot(function(querySnapshot) {
            console.log("fetching rooms", querySnapshot.data().chatrooms)
            var rooms = querySnapshot.data().chatrooms? querySnapshot.data().chatrooms:null
            console.log(rooms)
            if(rooms){
                let chat_rooms = []
                rooms.forEach(async (doc) =>{
                    console.log(doc)
                    await fire.firestore().collection("chatrooms").doc(doc).get()
                    .then(room=>{
                        console.warn(room.data())
                        chat_rooms.push(room.data())
                        dispatch({
                            type:UPDATE_ROOMS,
                            payload:room.data()
                        })
                    })
                });
                console.warn(chat_rooms)
            }else{
                dispatch({
                    type:UPDATE_ROOMS,
                    payload:null
                })
            }
            
            // console.log("Current cities in CA: ", cities.join(", "));
        });
    }
}
export function getInvites(){
    return function (dispatch){
        dispatch(
            {
                type: FETCHING_INVITES,
                payload: null
            }
          );
          return fire.firestore().collection("invites").doc(fire.auth().currentUser.email)
          .onSnapshot(function(querySnapshot) {
            if(querySnapshot.data()!=null){
                console.log("fetching invites", querySnapshot.data(), querySnapshot.data()==null)
                var irooms = querySnapshot.data().rooms? querySnapshot.data().rooms:null
                console.log(irooms)
                if(irooms){
                    let full_invite_details = []
                    irooms.forEach(async (doc) =>{
                        console.log(doc)
                        await fire.firestore().collection("chatrooms").doc(doc).get()
                        .then(room=>{
                            console.warn(room.data())
                            full_invite_details.push(room.data())
                            dispatch({
                                type:GET_INVITES,
                                payload:room.data()
                            })
                        })
                    });
                    console.warn(full_invite_details)
                }else{
                    dispatch({
                        type:GET_INVITES,
                        payload:null
                    })
                }
            }else{
                dispatch({
                    type:GET_INVITES,
                    payload:null
                })
            }
              
              // console.log("Current cities in CA: ", cities.join(", "));
          });   
    }
}
export function deleteInvite(id){
    return function(dispatch){
        rejectInvite(id)
        dispatch({
            type:DELETE_INVITE,
            payload:id
        })
    }
}