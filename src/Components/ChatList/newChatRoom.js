import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      let name = this.state.newRoomName.trim()
      if(name!=='')
        createChatRoom(this.state.newRoomName)
      this.setState({
        showInput:false,
        newRoomName:''
    })
  }
  render() {
    return (
    <div className="row " >
      <div className="col-12">
        <div className="row create_room_button_container">
              <button className="show_room_input" onClick={this.showRoomInput}>Create a New Room</button>
        </div>
        { this.state.showInput?
        <div className="row create_room_input_container">
          <div className="col-8">
            <input type = "text" className="room_name" autocomplete="off" placeholder="enter a name for the chat room" name="chat_room" value={this.state.newRoomName} onChange={this.updateNewRoomName} />
          </div>
          <div className="col-1 cancel_button_container">
            <img className="cancel_creation" onClick={this.hideRoomInput} src="https://firebasestorage.googleapis.com/v0/b/reactchat-7902e.appspot.com/o/iconfinder_ban_1608568.png?alt=media&token=a81b998a-6142-486b-8a9e-687511b28504"/>
          </div>
          <div className="col-1 offset-1 create_button_container">
            <img className="creat_room" onClick={this.createChatRoom} src="https://firebasestorage.googleapis.com/v0/b/reactchat-7902e.appspot.com/o/iconfinder_Dialog-Apply-64_55520.png?alt=media&token=07174ff3-a4ff-40bf-9c30-913e05e7d910"/>
          </div>
        </div>
        :null}
      </div>
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