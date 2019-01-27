import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendInvite } from '../../Config/fireMethods'
// import PropTypes from 'prop-types'
class ChatDetails extends Component {
    state={
        emailInvite:''
    }
  constructor(props){
      super(props)
      this.emailChange = this.emailChange.bind(this)
      this.memberAdd = this.memberAdd.bind(this)
  }
  emailChange(e){
      this.setState({
          emailInvite:e.target.value
      })
  }
  memberAdd(){
      console.log("send email invite data to firestore")
      sendInvite(this.state.emailInvite,this.props.selectedRoom.id)
  }  
  render() {
    return (
       <div className="row chat_list_container" >
         <div className="col-12">
                <div className="row">
                    Chat room title is  {this.props.selectedRoom!=null? this.props.selectedRoom.roomName:''}
                </div>
                <div className="row">
                    Owner is { this.props.selectedRoom!=null? this.props.selectedRoom.ownerName:'' }
                </div>
                <div className="row">
                    Created at {  this.props.selectedRoom!=null? JSON.stringify(new Date(this.props.selectedRoom.created_at.toDate()).toLocaleString()):'' }
                </div>
                <div className="row">
                    <p> Add a user to chatroom - </p>
                    <div className="newuser_email" >
                        <input type="email" name="email" onChange={this.emailChange} value={this.state.emailInvite}/>
                        <button onClick={this.memberAdd}>Send Invite </button> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 members_containers">
                        {this.props.selectedRoom!=null?
                            [...this.props.selectedRoom.members].map((element, i) =>
                                <div className="row" key={element.id}>
                                    <div className="col-8">
                                        { element.name}
                                    </div>
                                    <div className="col-4">
                                        {element.id===this.props.selectedRoom.owner? 'OWNER':<button className="remove_member" >Kick Out</button>}
                                    </div>
                                </div>
                        ):''}

                    </div>
                </div>
         </div>
       </div>
    );
  }
  
}
ChatDetails.propTypes ={
}
function mapStateToProps (state){
  return {
      selectedRoom :state.chatList.currentlySelectedRoom,
      rooms:state.chatList.chatRooms
  }
}
export default connect(mapStateToProps, {  })(ChatDetails)