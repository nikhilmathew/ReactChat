import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import  './newchatroom.scss'
import { createChatRoom } from '../../../Config/fireMethods'
import banImage from '../../../assets/ban.png'
import tickImage from '../../../assets/tick.png'
class NewChatRoom extends Component {
    state={
        showInput:false,
        newRoomName:''
    }
  constructor(props){
    super(props)
    //console.log(this.props)
    this.showRoomInput = this.showRoomInput.bind(this)
    this.hideRoomInput = this.hideRoomInput.bind(this)
    this.createChatRoom = this.createChatRoom.bind(this)
    this.updateNewRoomName = this.updateNewRoomName.bind(this)
  }
  showRoomInput(){
    //console.log("new room creation started ")
    this.setState({
        showInput:true
    })
  }
  hideRoomInput(){
    //console.log("new room creation cancelled ")
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
            <input type = "text" className="room_name" autoComplete="off" placeholder="enter a name for the chat room" name="chat_room" value={this.state.newRoomName} onChange={this.updateNewRoomName} />
          </div>
          <div className="col-1 cancel_button_container">
            <img className="cancel_creation" onClick={this.hideRoomInput} src={banImage} alt="cancel"/>
          </div>
          <div className="col-1 offset-1 create_button_container">
            <img className="creat_room" onClick={this.createChatRoom} src={tickImage} alt="create"/>
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