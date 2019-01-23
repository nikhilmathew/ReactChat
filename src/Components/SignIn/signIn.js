import React , {Component} from 'react';
import { connect } from 'react-redux';
class SignIn extends Component {
    render(){
        return(
            <div >
                <p>Sign in  </p>
            </div>
        )
    }
}

const SignInRedux = connect()(SignIn)
export default SignInRedux;