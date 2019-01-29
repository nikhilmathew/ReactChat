import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectChatRoom,fetchMessages } from '../../../actions/chatlistActions'
import  './rooms.scss'
class Rooms extends Component {
    state={
        selected:null
    }
    constructor(props){
        super(props)
        this.selectChatroom = this.selectChatroom.bind(this)
    }
    selectChatroom(e){
        console.log(e.target.id)
        this.props.fetchMessages(e.target.id,true)
        this.props.selectChatRoom(e.target.id)
        this.setState({
            selected:e.target.id
        })
    }
    componentDidUpdate(){
        console.log(this.props.rooms)
    }
  render() {
    return (
        <div className="row room_list_joined">
        <p>Joined Chat Rooms</p>
            <div className="col-12">
                <div className="row joined_rooms_container">
                    <div className="col-12">
                        {this.props.rooms!=null?this.props.rooms.length>0?this.props.rooms.map(room =>(
                             <div className={`row room  ${this.state.selected===room.id?"selected_room":''}`} key={room.created_at}>
                                <div className="col-8">
                                    {room.roomName}
                                </div>
                                <div className="col-4 no-padding">
                                    <button className='select_room '  id={room.id} onClick={this.selectChatroom}>{this.state.selected===room.id?"Active->":'Enter'}</button>
                                </div>
                            </div>
                        )
                        ):<p>No Joined Rooms</p>:<p>No rooms</p>
                        }
                    </div>
                
                </div>
            </div>
            
        </div>
    );
  }
  
}
Rooms.propTypes ={
    selectChatRoom :PropTypes.func.isRequired,
    fetchMessages:PropTypes.func.isRequired
}
function mapStateToProps (state){
  return {
      rooms:state.chatList.chatRooms
  }
}
export default connect(mapStateToProps, { selectChatRoom ,fetchMessages })(Rooms)