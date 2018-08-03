import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import ChatItem from '../chat_item/ChatItem';

// Assets
import './chatsidebar.css';

class ChatSidebar extends Component {
    constructor(props) {
      super(props);
      this.redirect = this.redirect.bind(this);
    }

    redirect = (e) => {
        var value = e.currentTarget.id;
        // window.location.replace("/home");
    }

    render() {
      const currentUserUid = this.props.currentUserUid;
      var users = this.props.users;
      var listItems = '';
      
      if(users != null){
  
        listItems = Object.keys(users).map((user) =>
          <li key={user} id={user} className="li-each-chat" onClick={this.redirect} style={{display: user == currentUserUid ? 'none' : ''}}>
            {/* <Link to={`/profile/${user}`} > */}
            {/* <Link to={{ pathname: '/friend', state: { id: user } }} > */}
            <a href={`friend?${user}`} >
              <div className="div-chat-content center-content">
                <div className="div-img-profile-chat"> 
                  <img className="img-profile-chat" src={users[user].photoUrl || ''} alt='' />
                </div>
                <div className="div-user-chat">
                  <span className="court-text" style={{maxWidth:'155px'}}>{users[user].displayName || ''}</span><span></span>
                </div>
              </div>
            </a>
            {/* </Link> */}
          </li>
        );
  
      } else {
        listItems = <li>¡No hay usuarios!</li>;
      }

      return (
        <aside className="right-aside center-content">
          <section>
            <div className="">
              <h4>Usuarios</h4>
              <div className="chatOrderedList">
                <div className="chat-sidebar">
                  <ul className="list-unstyled">
                    {listItems}
                  </ul>
                </div>
              </div>
            </div> 
          </section>
        </aside>
      );
    }
  }
  
  export default ChatSidebar;