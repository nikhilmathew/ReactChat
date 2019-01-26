import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import  './chatlist.scss'
class ChatList extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
  }
  render() {
    return (
       <div className="row chat_list_container" >
         
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