import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
class ChatWindow extends Component {
  render() {
    return (
       <div className="row chat_list_container" >
         <div className="col-12">
                <div className="row">
                    ROOM TITLE {this.props.selectedRoom!=null? this.props.selectedRoom.roomName:''}
                </div>
                <div className="row">
                    
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
      rooms:state.chatList.chatRooms
  }
}
export default connect(mapStateToProps, {  })(ChatWindow)