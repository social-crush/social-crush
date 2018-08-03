import React, { Component } from 'react';


// Assets
import './chatwidget.css';

class ChatWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentUserUid = this.props.currentUserUid;
        var messages = this.props.messages;
        var listItems = '';
        
        if(messages != null){
            // "http://placehold.it/50/55C1E7/fff&text=U"
            // == currentUserUid ? messages[message]. : messages[message].
          listItems = Object.keys(messages).map((message) =>
            <li key={message} className={messages[message].uid == currentUserUid ? "right clearfix" : "left clearfix"}>
                <span className={messages[message].uid == currentUserUid ? "chat-img pull-right" : "chat-img pull-left"}>
                    <img src={messages[message].photoUrl || ''} alt="" className="img-circle" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{messages[message].displayName}</strong> 
                        <small className={messages[message].uid == currentUserUid ? "text-muted" : "pull-left text-muted"}>
                        <span className="glyphicon glyphicon-time" />12 mins ago</small>
                    </div>
                    <p>{messages[message].text}</p>
                </div>
            </li>
          );
    
        } else {
          listItems = <li>¡No hay usuarios!</li>;
        }

        return (
            <div className="ChatWidget">
                <div className="panel panel-primary">
                <div className="panel-heading" id="accordion">
                    <span className="glyphicon glyphicon-comment" /> Chat
                    <div className="btn-group pull-right">
                    <a type="button" className="btn btn-default btn-xs open-close-chat" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                        <i className="fas fa-comments" />
                    </a>
                    </div>
                </div>
                <div className="panel-collapse collapse" id="collapseOne">
                    <div className="panel-body">
                    <ul className="chat">
                        <li className="left clearfix">
                            <span className="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" className="img-circle" />
                            </span>
                            <div className="chat-body clearfix">
                                <div className="header">
                                    <strong className="primary-font">Jack Sparrow</strong> 
                                    <small className="pull-right text-muted"><span className="glyphicon glyphicon-time" />12 mins ago</small>
                                </div>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                dolor, quis ullamcorper ligula sodales.
                                </p>
                            </div>
                        </li>
                        <li className="right clearfix">
                            <span className="chat-img pull-right">
                                <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" className="img-circle" />
                            </span>
                            <div className="chat-body clearfix">
                                <div className="header">
                                    <small className="text-muted"><span className="glyphicon glyphicon-time" />13 mins ago</small>
                                    <strong className="pull-right primary-font">Bhaumik Patel</strong>
                                </div>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                dolor, quis ullamcorper ligula sodales.
                                </p>
                            </div>
                        </li>
                        
                    </ul>
                    </div>
                    <div className="panel-footer">
                    <div className="input-group">
                        <input id="btn-input" type="text" className="form-control input-sm" style={{fontSize:'14px'}} placeholder="Type your message here..." />
                        <span className="input-group-btn">
                            <button className="btn btn-warning btn-sm" id="btn-chat">Enviar</button>
                        </span>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        );
    }
}

export default ChatWidget;