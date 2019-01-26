import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import  './chatlist.scss'
import NewChatRoom from './newChatRoom';
class ChatList extends Component {
  render() {
    return (
       <div className="row chat_list_container" >
         <div className="col">
            <div className="row">
                <NewChatRoom />
            </div>
            <div className="row">
            {/* chat list here */}
            </div>
         </div>
       </div>
    );
  }
  
}
ChatList.propTypes ={
}
function mapStateToProps (state){
  return {
  }
}
export default connect(mapStateToProps, {  })(ChatList)