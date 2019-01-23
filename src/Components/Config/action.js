//types of action
const types = {
    SIGNIN :'SIGNIN',
    SIGNIN_SUCCESS:'SIGNIN_SUCCESS',
    SIGNIN_ERROR:'SIGNIN_ERROR'
}
//actions
function signInSuccess(uid) {
    return {
      type: types.SIGNIN_SUCCESS,
      uid
    }
  }
  
  function signInInProgress() {
    return {
      type: types.SIGNIN
    }
  }
  
  function signInError(errorMessage) {
    return {
      type: types.SIGNIN_ERROR,
      errorMessage
    }
  }

export default {
    signInSuccess,
    signInInProgress,
    signInError,
    types
}