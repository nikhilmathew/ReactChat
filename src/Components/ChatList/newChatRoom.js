import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import  './newchatroom.scss'
import { createChatRoom } from '../../Config/fireMethods'
class NewChatRoom extends Component {
    state={
        showInput:false,
        newRoomName:''
    }
  constructor(props){
    super(props)
    console.log(this.props)
    this.showRoomInput = this.showRoomInput.bind(this)
    this.hideRoomInput = this.hideRoomInput.bind(this)
    this.createChatRoom = this.createChatRoom.bind(this)
    this.updateNewRoomName = this.updateNewRoomName.bind(this)
  }
  showRoomInput(){
    console.log("new room creation started ")
    this.setState({
        showInput:true
    })
  }
  hideRoomInput(){
    console.log("new room creation cancelled ")
    this.setState({
        showInput:false,
        newRoomName:''
    })
  }
  updateNewRoomName(e){
    this.setState({
        newRoomName:e.target.value
    })
  }
  createChatRoom(){
      // call action here
      createChatRoom(this.state.newRoomName)
  }
  render() {
    return (
    <div className="row " >
         <div className="row create_room_button_container">
            <button className="show_room_input" onClick={this.showRoomInput}>Create a New Room</button>
         </div>
         { this.state.showInput?<div className="row create_room_input_container">
            <div className="col-8">
            <input type = "text" className="room_name" placeholder="enter a name for the chat room" name="chat_room" value={this.state.newRoomName} onChange={this.updateNewRoomName} />
            </div>
            <div className="col-2 cancel_button_container">
            <button className="cancel_creation" onClick={this.hideRoomInput}>X</button>
            </div>
            <div className="col-2 create_button_container">
            <button className="creat_room" onClick={this.createChatRoom}>Create</button>
            </div>
         </div>:null}
    </div>
       
    );
  }
  
}
NewChatRoom.propTypes ={
}
function mapStateToProps (state){
  return {
  }
}
export default connect(mapStateToProps, {  })(NewChatRoom)