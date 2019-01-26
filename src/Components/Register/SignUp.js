import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { registerUser } from '../../actions/authActions'
class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            name:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
        this.props.registerUser(this.state.email,this.state.password,this.state.name)

    }
    render(){
        return(
            <div >
                <p>Sign Up  </p>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name </label>
                        <input 
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={this.state.name}
                        />
                    </div>
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
            </div>
        )
    }
}
SignUp.propTypes ={
    registerUser: PropTypes.func.isRequired,
}
export default connect(null, { registerUser })(SignUp)