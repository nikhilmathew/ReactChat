import fire from './fire'
import * as firebase from 'firebase';
import { getInvites } from '../actions/chatlistActions';

export function addUserToFireDBOnRegistration(){
    console.log("sending data to firestore")
    return new Promise((fulfill,reject)=>{
        let { displayName, photoURL, email,uid }= fire.auth().currentUser
        fire.firestore().collection('users').doc(email).set({
            name:displayName,
            email:email,
            photoURL:photoURL,
            uid:uid,
            created_at: Date.now()
        })
        .then(result=>{
            console.log(" new user added to DB",result)
            fulfill()
        })
        .catch(err=>{
            console.log("error adding new user to firestore",err)
            reject()
        })
    })
}
export function createChatRoom(name){
    fire.firestore().collection('chatrooms').add({
        roomName:name,
        owner: fire.auth().currentUser.uid,
        ownerName: fire.auth().currentUser.displayName,
        created_at:new Date()
    })
    .then(res=>{
        console.log(res)
        let chatroomid = res.id
        let user  = fire.auth().currentUser
        fire.firestore().collection('users').doc(user.uid).update({
            chatrooms: firebase.firestore.FieldValue.arrayUnion(chatroomid)
        })
        fire.firestore().collection('chatrooms').doc(chatroomid).update({
            id:chatroomid
        })
        fire.firestore().collection('chatrooms').doc(chatroomid).update({
            members: firebase.firestore.FieldValue.arrayUnion({name:user.displayName,id:user.uid,photoURL:user.photoURL})
        })
    })
    .catch(err=>{
        console.error(err)
    })
}
export function sendInvite(email,chatroom){
    fire.firestore().collection('invites').doc(email).set({
        rooms: firebase.firestore.FieldValue.arrayUnion(chatroom)
    },
    {
        merge:true
    })
}
export function rejectInvite(id){
    fire.firestore().collection('invites').doc(fire.auth().currentUser.email).update({
        rooms:firebase.firestore.FieldValue.arrayRemove(id)
    })
    .then(()=>{
        getInvites()
    })
}
export function acceptInvite(chatroomid){
        let user  = fire.auth().currentUser
        fire.firestore().collection('users').doc(user.uid).update({
            chatrooms: firebase.firestore.FieldValue.arrayUnion(chatroomid)
        })
        fire.firestore().collection('chatrooms').doc(chatroomid).update({
            members: firebase.firestore.FieldValue.arrayUnion({name:user.displayName,id:user.uid,photoURL:user.photoURL})
        })
}
export function deleteUser(room_id,user_id){
    console.log("user deletion reeived",room_id,user_id)
    fire.firestore().collection('chatrooms').doc(room_id).get()
    .then(result=>{
        let rdata =result.data()
        console.log(rdata.members)
        fire.firestore().collection('chatrooms').doc(room_id).update({
            members: rdata.members.filter(member => member.id !== user_id)
        })
        fire.firestore().collection('users').doc(user_id).update({
            chatrooms: firebase.firestore.FieldValue.arrayRemove(room_id)
        })
    })
    
}
export function sendMessage(room_id,message){
    fire.firestore().collection('chatrooms').doc(room_id).collection('messages').add({
        sender:fire.auth().currentUser.displayName,
        sender_id:fire.auth().currentUser.uid,
        message:message,
        created_at: new Date()
    })
}