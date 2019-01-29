import { FETCHING_ROOMS,UPDATE_ROOMS, SELECT_CHAT_ROOM, FETCHING_INVITES, GET_INVITES, DELETE_INVITE,CLEAN_CHAT_REDUCER, DELETE_USER,UPDATE_MESSAGES, UNSELECT_CHAT_ROOM } from './types'
import fire from '../Config/fire'
import { rejectInvite, deleteUser } from '../Config/fireMethods'
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
export function unselectChatRoom(){
    return function(dispatch){
        dispatch({
            type:UNSELECT_CHAT_ROOM,
            payload:null
        })
    }
}
export function fetchMessages(room_id,mode){
        //console.log('fetch messages activated')
        // if(mode){
        //     if(typeof message_listener =='function')
        //         message_listener()
        // }
        return function(dispatch){
            dispatch({
                type:UPDATE_MESSAGES,
                payload:null
            })
            return fire.firestore().collection('chatrooms').doc(room_id).collection('messages').orderBy('created_at',"desc").limit(10)
            .onSnapshot(function (querySnapshot){
                let messages =[]
                querySnapshot.forEach(function(doc) {
                    let message ={
                        id:doc.id,
                        message:doc.data().message,
                        sender:doc.data().sender,
                        sender_id:doc.data().sender_id,
                        created_at:doc.data().created_at.toDate()
                    }
                    messages.push(message)
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                });
                //console.log("messages",querySnapshot)
                dispatch({
                    type:UPDATE_MESSAGES,
                    payload:messages
                })
            },
            err=>{
                //console.warn(err)
            })
        }
        
}
export function fetchRooms(){
    return function(dispatch){
        //console.log("fetch rooms method called")
        dispatch(
            {
                type: FETCHING_ROOMS,
                payload: null
            }
          );
        return fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
        .onSnapshot(function(querySnapshot) {
            //console.log("fetching rooms", querySnapshot,querySnapshot.data())
            var rooms = querySnapshot.data().chatrooms? querySnapshot.data().chatrooms:null
            //console.log(rooms)
            if(rooms){
                let chat_rooms = []
                let promises = []
                rooms.forEach((doc) =>{
                    //console.log(doc)
                    promises.push(
                    new Promise((fulfill,reject)=>{
                            fire.firestore().collection("chatrooms").doc(doc).get()
                            .then(room=>{
                                //console.warn("inside loop",room.data())
                                // chat_rooms.push(room.data())
                                fulfill(room.data())
                            })
                    })
                    )
                });
                Promise.all(promises)
                .then((result)=>{
                    //console.log(result)
                    dispatch({
                        type:UPDATE_ROOMS,
                        payload:result
                    })
                    // result.forEach(element => {
                        
                    // });
                })
                //console.log("outside loop")
                dispatch({
                    type:UPDATE_ROOMS,
                    payload:chat_rooms
                })
                //console.warn(chat_rooms)
            }else{
                dispatch({
                    type:UPDATE_ROOMS,
                    payload:null
                })
            }
            
            // //console.log("Current cities in CA: ", cities.join(", "));
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
                //console.log("fetching invites", querySnapshot.data(), querySnapshot.data()==null)
                var irooms = querySnapshot.data().rooms? querySnapshot.data().rooms:null
                //console.log(irooms)
                if(irooms){
                    let full_invite_details = []
                    irooms.forEach(async (doc) =>{
                        //console.log(doc)
                        await fire.firestore().collection("chatrooms").doc(doc).get()
                        .then(room=>{
                            //console.warn(room.data())
                            full_invite_details.push(room.data())
                            dispatch({
                                type:GET_INVITES,
                                payload:room.data()
                            })
                        })
                    });
                    //console.warn(full_invite_details)
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
              
              // //console.log("Current cities in CA: ", cities.join(", "));
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
export function kickUserFromChat(chatroom_id,user_id){
    return function(dispatch){
        deleteUser(chatroom_id,user_id)
        dispatch({
            type:DELETE_USER,
            payload:null
        })
    }
}