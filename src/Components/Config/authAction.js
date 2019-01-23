import loginActions from './action'
import fire from './fire'

export function signIn() {
    return (dispatch) => {
      dispatch(loginActions.signInInProgress());
  
      fire.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
          const { user: { uid, displayName, photoURL, email } } = result;
  
          firebase.database().ref(`users/${ uid }`).set({
            displayName,
            photoURL,
            email,
            lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
          });
  
          dispatch(
            loginActions.signInSuccess(uid)
          );
        })
        .catch((error) => {
          dispatch(loginActions.signInError(error.message))
        });
    }
  }
  