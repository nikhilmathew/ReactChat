import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendMessage } from '../../Config/fireMethods'
// import PropTypes from 'prop-types'
class ChatWindow extends Component {
    state={
        text:''
    }
    constructor(props){
        super(props)

    this.typing = this.typing.bind(this)
    this.send = this.send.bind(this)
    }
    typing(e){
        this.setState({
            text:e.target.value
        })
    }
    send(){
        console.log("sending message")
        sendMessage(this.props.selectedRoom.id,this.state.text)
        this.setState({
            text:''
        })
    }
  render() {
    return (
       <div className="row chat_list_container" >
         <div className="col-12">
                <div className="row">
                    ROOM TITLE {this.props.selectedRoom!=null? this.props.selectedRoom.roomName:''}
                </div>
                <div className="row">
                    <div className="message_container">
                    {this.props.messages!=null?this.props.messages.map(message =>(
                                <div className="message " key={message.created_at}>
                                   {message.sender_id===this.props.user.uid?'': <span >{message.sender}: </span>}{message.message}
                                </div>
                            )
                            ):null
                    }
                    </div>
                    
                </div>
                <div className="input_box">
                    <input type="text" name="chat_text" onChange={this.typing} value={this.state.text} />
                    <button className="send_message" onClick={this.send} >SEND</button>
                </div>
         </div>
       </div>
    );
  }
  
}
ChatWindow.propTypes ={
}
function mapStateToProps (state){
  return {
      selectedRoom :state.chatList.currentlySelectedRoom,
      user:state.auth.user,
      messages:state.chatList.messageCache
  }
}
export default connect(mapStateToProps, {  })(ChatWindow)