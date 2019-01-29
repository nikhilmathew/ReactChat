import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { registerUser,oldUser } from '../../actions/authActions'
import './signup.scss'
class SignUp extends Component {
    state={
        email:'',
        password:'',
        name:'',
        selectedFile:null,
        loaded:0
    }
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            name:'',
            selectedFile:null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.goback = this.goback.bind(this)
    }
    goback(){
        this.props.oldUser()
    }
    onChangeFile(e){
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
          })
    }
    onChange(e){
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        console.log(this.state)
        console.log("clicked sign in ")
        this.props.registerUser(this.state.email,this.state.password,this.state.name,this.state.selectedFile)

    }
    render(){
        return(
            <div className="signin_container">
                <div className="signindiv">
                <p>Register  </p>
                <form onSubmit={this.onSubmit}>
                    <div className="name_box box">
                        <label>Name </label>
                        <input 
                            type="text"
                            name="name"
                            required
                            onChange={this.onChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="email_box box">
                        <label>Email </label>
                        <input 
                            type="email"
                            name="email"
                            required
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="password_box box">
                        <label>Password </label>
                        <input 
                            type="password"
                            name="password"
                            required
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className="profile_box box">
                        <label>Profile Pic </label>
                        <input 
                            type="file"
                            name="profilePic"
                            required
                            accept="image/*"
                            onChange={this.onChangeFile}
                        />
                    </div>
                    <br/>
                    <button type="submit" >Register</button>
                    <br/>
                    <button className="backtologin" onClick={this.goback}>Back to Login</button>
                </form>
            </div>
                
            </div>
        )
    }
}
SignUp.propTypes ={
    registerUser: PropTypes.func.isRequired,
    oldUser:PropTypes.func.isRequired
}
export default connect(null, { registerUser,oldUser })(SignUp)