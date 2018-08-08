import React, { Component } from 'react';

class Message extends Component {
    state = { user: { name: 'Username', lastname: '', photoUrl: null  } };

    constructor(props) {
        super(props);
        
        this.getMonthMessage = this.getMonthMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            var userId = nextProps.userId;
            if(userId) {
                fetch(`api/User/GetUserById/${userId}`)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({ user: data });
                    }).catch(e => console.log(e));
            }
        }
    }

    getMonthMessage = (month) => {
      let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      return meses[month];
    }

    render() {
        var msg = this.props.message;
        var displayName = `${this.state.user.name} ${this.state.user.lastname}` || 'Username';
        var photoUrl = this.state.user.photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0";

        return (
            <li className="left clearfix space">
                <span className="chat-img pull-left">
                    <img src={photoUrl} alt="" className="img-p" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{displayName || "Username"}</strong> 
                        <small className="pull-right text-muted"><span className="glyphicon glyphicon-time" /> {`${msg.day} de ${this.getMonthMessage(msg.month)} a las ${msg.hour}:${msg.minute}`}</small>
                    </div>
                    <p>
                        {msg.text}
                    </p>
                </div>
            </li>
        );
    }
}

export default Message;