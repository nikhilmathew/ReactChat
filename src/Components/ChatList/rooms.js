import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectChatRoom } from '../../actions/chatlistActions'
import  './rooms.scss'
class Rooms extends Component {
    constructor(props){
        super(props)
        this.selectChatroom = this.selectChatroom.bind(this)
    }
    selectChatroom(e){
        console.log(e.target.id)
        this.props.selectChatRoom(e.target.id)
    }
    componentDidUpdate(){
        console.log(this.props.rooms)
    }
  render() {
    return (
        <div className="row ">
        <p>Joined Chat Rooms</p>
            <div className="col-12">
                <div className="row joined_rooms_container">
                    <div className="col-12">
                        {this.props.rooms!=null?this.props.rooms.map(room =>(
                             <div className="row room" key={room.created_at}>
                                {room.roomName}
                                <button className="select_room"  id={room.id} onClick={this.selectChatroom}>OPen</button>
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
Rooms.propTypes ={
    selectChatRoom :PropTypes.func.isRequired
}
function mapStateToProps (state){
  return {
      rooms:state.chatList.chatRooms
  }
}
export default connect(mapStateToProps, { selectChatRoom  })(Rooms)