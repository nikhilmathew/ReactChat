import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendMessage } from '../../Config/fireMethods'
import './chatwindow.scss'
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
    componentDidUpdate(){
        let box = document.getElementById('message_top_level_container')
        if(box)
            box.scrollTop = box.scrollHeight
    }
  render() {
    return (
       <div className="row chat_list_container" >
       {this.props.selectedRoom!=null? 
         <div className="col-12 sub_container">
                <div className="row room_title">
                    ROOM TITLE {this.props.selectedRoom!=null? this.props.selectedRoom.roomName:''}
                </div>
                <div className="row message_top_level_container" id="message_top_level_container">
                    <div className="message_container">
                    {this.props.messages!=null?this.props.messages.map(message =>(
                                
                               message.sender_id===this.props.user.uid?  
                                <div className="message  me" key={message.created_at}>
                                   {message.message}
                                </div>
                                :
                                <div className="message " key={message.created_at}>
                                   <span >other : </span>{message.message}
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
         :
         <div className="col-12 no_room_selected">
                Please select a chat room to join the conversation
        </div>
       }
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