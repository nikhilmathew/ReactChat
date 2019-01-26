import fire from './fire'
import * as firebase from 'firebase';

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
        fire.firestore().collection('users').doc(fire.auth().currentUser.uid).update({
            chatrooms: firebase.firestore.FieldValue.arrayUnion(chatroomid)
        })
    })
    .catch(err=>{
        console.error(err)
    })
}