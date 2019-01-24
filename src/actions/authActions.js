import { SIGNIN, SIGNOUT } from './types'
import fire from '../Config/fire'
export const login = (email,password) => dispatch => {
    return function(dispatch){
        fire.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
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
export const logout = dispatch =>{
    console.log("logout called")
        fire.auth().signOut()
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
 //   firebase.database().ref(`users/${ uid }`).set({
        //     displayName,
        //     photoURL,
        //     email,
        //     lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
        //   });
