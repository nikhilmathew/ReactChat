import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login, newUser } from '../../actions/authActions'
import './signin.scss'
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
        //console.log("clicked sign in ")
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
            <div className="signin_container">
                <div className="signindiv">
                    {this.props.failed!==null?<p className="failed_status">{this.props.failed.message}</p>:''}
                    <p>Sign in  </p>
                    <form onSubmit={this.onSubmit}>
                        <div className="email_box box">
                            <label>Email: </label>
                            <input 
                                type="email"
                                name="email"
                                autoComplete="off"
                                required
                                minLength="6"
                                onChange={this.onChange}
                                value={this.state.email}
                            />
                        </div>
                        <div className="password_box box">
                            <label>Password: </label>
                            <input 
                                type="password"
                                name="password"
                                autoComplete="off"
                                required
                                pattern="[A-Za-z0-9]{6,15}"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </div>
                        <br/>
                        <button type="submit" >Login</button>
                    </form>
                    <p className="new_user">New User? <button onClick={this.newUser}>Sign Up</button></p>
                </div>
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
function mapStateToProps(state){
    return{
        failed:state.auth.failed
    }
}
export default connect(mapStateToProps, { login,newUser })(SignIn)