import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login, newUser } from '../../actions/authActions'

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.newUser = this.newUser.bind(this)
    }
    onChange(e){
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        console.log("clicked sign in ")
        this.props.login(this.state.email,this.state.password)

    }
    newUser(){
        this.props.newUser()
    }
    componentWillMount(){
        // this.props.login()
    }
    render(){
        return(
            <div >
                <p>Sign in  </p>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Email </label>
                        <input 
                            type="email"
                            name="email"
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                    </div>
                    <div>
                        <label>Password </label>
                        <input 
                            type="password"
                            name="password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                    </div>
                    <br/>
                    <button type="submit" >Login</button>
                </form>
                <p>New User? <button onClick={this.newUser}>Sign Up</button></p>
            </div>
        )
    }
}
// const mapStateToProps = state => ({
//     login:state.auth.user
// })

SignIn.propTypes ={
    login: PropTypes.func.isRequired,
    newUser: PropTypes.func.isRequired
}
export default connect(null, { login,newUser })(SignIn)