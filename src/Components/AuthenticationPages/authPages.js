import React , { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../SignIn/signIn';
import SignUp from '../Register/SignUp'
class AuthPages extends Component {
    
    render(){
        return(
            <div >
                { this.props.newuser?<SignUp/>:<SignIn/>}
            </div>
        )
    }
}
// const mapStateToProps = state => ({
//     login:state.auth.user
// })

function mapStateToProps(state){
    return{
        newuser:state.auth.newUser
    }
}
export default connect(mapStateToProps, { })(AuthPages)