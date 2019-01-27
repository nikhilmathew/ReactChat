import { FETCHING_ROOMS,UPDATE_ROOMS, SELECT_CHAT_ROOM } from './types'
import fire from '../Config/fire'

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