import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectChatRoom, deleteInvite } from '../../actions/chatlistActions'
import { acceptInvite } from '../../Config/fireMethods'
import  './invites.scss'
class Invites extends Component {
    constructor(props){
        super(props)
        this.acceptInvite = this.acceptInvite.bind(this)
        this.rejectInvite = this.rejectInvite.bind(this)
    }
    acceptInvite(e){
        console.log(e.target.id)
        acceptInvite(e.target.id)
        this.props.deleteInvite(e.target.id)
    }
    rejectInvite(e){
        console.log(e.target.id)
        this.props.deleteInvite(e.target.id)
    }
    componentDidUpdate(){
        console.log(this.props.rooms)
    }
  render() {
    return (
        <div className="row invites_box">
        <p>Pending Invites</p>
            <div className="col-12">
                <div className="row joined_rooms_container">
                    <div className="col-12">
                        {this.props.irooms!=null?this.props.irooms.map(room =>(
                             <div className="row invite_room" key={room.created_at}>
                                <div className="col-9">
                                    You have an invite to room '{room.roomName}' from '{room.ownerName}'
                                </div>
                                <div className="col-3">
                                    <div className="row">
                                        <button className="accept_invite" id={room.id}  onClick={this.acceptInvite}>Accept</button>
                                    </div>
                                    <div className="row">
                                        <button className="reject_invite" id={room.id}  onClick={this.rejectInvite}>Reject</button>
                                    </div>
                                </div>                                
                            </div>
                        )
                        ):null
                        }
                    </div>
                
                </div>
            </div>
            
        </div>
    );
  }
  
}
Invites.propTypes ={
    deleteInvite:PropTypes.func.isRequired
}
function mapStateToProps (state){
  return {
      irooms:state.chatList.invitedRooms
  }
}
export default connect(mapStateToProps, { selectChatRoom,deleteInvite  })(Invites)