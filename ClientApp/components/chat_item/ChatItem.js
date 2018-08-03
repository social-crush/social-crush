import React, { Component } from 'react';

// Assets
import './chatitem.css';

class ChatItem extends Component {
    render() {
      return (
        <li className="li-each-chat">
            <a className href="#">
            <div className="div-chat-content center-content">
                <div className="div-img-profile-chat"> {/* Perfil de Usuario */}
                <img className="img-profile-chat" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" />
                </div>
                <div className="div-user-chat">
                <span>@userguest</span><span>32 min</span>
                {/* <textarea disabled rows="1" style="width: 100%; max-width: 100%; border-style: none; border-color: transparent; resize: none; background-color: transparent; overflow: hidden; ">@userguestuserguestuserguestuserguest</textarea><span>Activo</span> */}
                </div>
            </div>
            </a>
        </li> 
      );
    }
  }
  
  export default ChatItem;

