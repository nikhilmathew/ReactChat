import { SIGNIN, SIGNOUT, SIGNINGIN, NEWUSER, REGISTERING, REGISTER } from './types'
import fire from '../Config/fire'
// import { addUserToFireDBOnRegistration } from '../Config/fireMethods'

export function silentLogin(user){
    return function(dispatch){
        dispatch({
            type:SIGNIN,
            payload:user
        })
    }
}
export function login(email,password){
    return function(dispatch){
        console.log("sign in method called")
        dispatch(
            {
                type: SIGNINGIN,
                payload: null
            }
          );
        return fire.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
            console.log(result)
          let { user } = result;
          dispatch(
            {
                type: SIGNIN,
                payload: user
            }
          );
        })
        .catch((error) => {
          dispatch({
            type: SIGNOUT,
            payload: null
        })
        });
    }
}
export function logout(){
    console.log("logout called")
    return function(dispatch){
        return fire.auth().signOut()
        .then(res=>{
            console.log("logout",res)
            dispatch(
                {
                    type:SIGNOUT,
                    payload:null
                }
            )
        })
    }
        
    
}
export function newUser(){
    console.log("new user , show registration page")
    return function(dispatch){
        dispatch({
            type:NEWUSER,
            payload:null
        })
    }
}
export function registerUser(email,password,displayName){
    return function(dispatch){
        dispatch(
            {
                type: REGISTERING,
                payload: null
            }
          );

        return fire.auth().createUserWithEmailAndPassword(email, password)
                .then(result=>{
                    console.log(result)
                    result.user.updateProfile({
                        displayName: displayName,
                        photoURL: "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-512.png"
                      }).then(function() {
                        // Update successful.
                        console.log("user name and pic updated",result,result.user)
                        let { displayName, photoURL, email,uid }= fire.auth().currentUser
                        fire.firestore().collection('users').doc(uid).set({
                            name:displayName,
                            email:email,
                            photoURL:photoURL,
                            uid:uid,
                            created_at: new Date()
                        })
                        .then(result=>{
                            console.log(" new user added to DB",result)
                        })
                        .catch(err=>{
                            console.log("error adding new user to firestore",err)
                        })
                            dispatch({
                                type:REGISTER,
                                payload:result.user
                            })
                      }).catch(function(error) {
                        // An error happened.
                      });
                    
                })
                .catch(function(error) {
                    // Handle Errors here.
                    console.log("registration errors ",error)
                    // ...
                });
    }

}
 //   firebase.database().ref(`users/${ uid }`).set({
        //     displayName,
        //     photoURL,
        //     email,
        //     lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
        //   });
