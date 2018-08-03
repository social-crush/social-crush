import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';

// Assets
import './chatting.css'; 

// Components
import Header from '../../components/header/Header';

class Chatting extends Component{
    constructor(props){
        super();
        this.state = {
            chat: null,
            users: null,
            newData: null
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.addBootstrap4();
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
        this.getMonth = this.getMonth.bind(this);
        this.setScrollYtoBottom = this.setScrollYtoBottom.bind(this);
        this.handleSearchChat = this.handleSearchChat.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    addBootstrap4 = () => {
        var pre = document.createElement('pre');
        pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
        document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    handleSubmitMessage = (e) => {
        e.preventDefault();
        var txtAreaMessage = document.getElementById('textAreaMessage');
        var textAreaMessage = _.trim(txtAreaMessage.value);
        if(!_.isEmpty(textAreaMessage)) {
            var photoUrl = this.props.photoUrl || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0';
            var displayName = this.props.displayName || 'Desconocido';

            firebase.database().ref('chat/').push().set({
                text: textAreaMessage, 
                photoUrl: photoUrl,
                displayName: displayName,
                timestamp: {
                  day: new Date().getDate(),
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                  minute: new Date().getMinutes(),
                  hour: new Date().getHours()
                }
            }, error => {if(error) console.log(error);});
            txtAreaMessage.value = '';

            // setInterval(this.setScrollYtoBottom(), 30);
            
            // this.setTimeOut(this.setScrollYtoBottom(), 250);

        } else {
            console.log('Debes escribir un mensaje para enviarlo');
            alert('Debes escribir un mensaje para enviarlo');
        }
    }

    componentDidMount() {
        firebase.database().ref('chat').on('value', snapshot => {
            var chat = snapshot.val();
            if(chat) {
                this.setState({ chat });
            }
        });
      
        firebase.database().ref('users/').orderByChild('displayName').on('value', snapshot => {
          var users = snapshot.val();
          if(users) {
            this.setState({ users });
          }
        });

        // document.getElementById('div-chat-users').scrollTop = 500;
    }

    getMonth = (month) => {
      let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      return meses[month];
    }

    setScrollYtoBottom = () => {
        // Asignar scroll abajo
        let divChat = document.getElementById("div-chat-users");
        divChat.scrollTop = divChat.scrollHeight + 500;
    }

    handleSearchChat = () => {
        var searchUser = document.getElementById('search-user-chat');
        searchUser = _.trim(searchUser.value);
        
        if(_.isEmpty(searchUser)) {
            this.setState({ newData: this.state.users });
        } else {
            this.getUsers(searchUser);
        }
    }

    getUsers = (searchText) => {
        var newData = '¡No hay resultados!';

        if(!_.isEmpty(searchText)) {
            this.setState({ showResult: true });

            firebase.database().ref('/users/').orderByChild('displayName').once('value')
            .then(snapshot => {
              this.setState({users: snapshot.val()});

              if(snapshot.val()) {
                newData = snapshot.val();
                var users = {};
                for(var user in newData) {
                    if(user !== this.state.uid && _.toLower(newData[user].displayName).search(_.toLower(searchText)) !== -1) {
                        users[user] = newData[user];
                    }
                }

                if(Object.entries(users).length !== 0) {
                    newData = users;
                } else {
                    newData = '¡No hay resultados!';
                }
                this.setState({ newData });

              } else {
                newData = '¡No hay resultados!';
                this.setState({ newData });
              }
              
            })
            .catch(e => {
              console.log(`Code: ${e.code} Message: ${e.message}`);
            });
        } else {
            newData = '¡No hay resultados!';
            this.setState({ newData });
        }
    }

    render(){
        var chat = this.state.chat;
        var uid = this.props.uid;
        var listItems = '';
        
        if(chat != null){
    
          listItems = Object.keys(chat).map((message) =>
            <li key={message} className="left clearfix space">
                <span className="chat-img pull-left">
                    <img src={chat[message].photoUrl} alt="" className="img-p" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{chat[message].displayName}</strong> 
                        <small className="pull-right text-muted"><span className="glyphicon glyphicon-time" />{`${chat[message].timestamp.day} de ${this.getMonth(chat[message].timestamp.month)} a las ${chat[message].timestamp.hour}:${chat[message].timestamp.minute}`}</small>
                    </div>
                    <p>
                        {chat[message].text}
                    </p>
                </div>
            </li>
          );

        // setTimeout(this.setScrollYtoBottom(), 300);
        this.setScrollYtoBottom();
    
        } else {
          listItems = <h1 style={{textAlign: 'center'}}>Cargando mensajes...</h1>;
        }

        var users = this.state.newData ? this.state.newData : this.state.users;
        var listUsers = '';
        
        if(users != null){
    
            listUsers = Object.keys(users).map((user) =>
            <div key={user} className="friend" style={{display: user == uid ? 'none' : ''}}>
                <a href={`friend?${user}`} >
                    <div className="persons-imagen">
                        <img src={users[user].photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0"} alt="" />
                    </div>
                    <div className="persons-nombres">
                        <p>{users[user].displayName || 'DisplayName'}</p>
                        <p>{users[user].username ? `@${users[user].username}` : '@username'}</p>
                    </div>
                </a>
            </div>
          );
    
        } else {
            listUsers = <h5 style={{textAlign: 'center'}}>Cargando usuarios...</h5>;
        }

        return(
            <div className="Chatting">
                <Header />
                <div className="c-contacts">
                    <div className="persons">
                        <div className="buscador">
                            <input id="search-user-chat" onChange={this.handleSearchChat} type="text" className="form-control" placeholder="Buscar"/>
                        </div>
                        {listUsers}
                    </div>
                    <div className="conversacion">
                        <div id="div-chat-users" className="chat-users">
                            <div className="list-users">
                                <ul className="talk-persons">{listItems}</ul>
                            </div>
                        </div>
                        <form action="" className="formu-p" onSubmit={this.handleSubmitMessage}>
                            <div className="formu">
                                <div className="text-c"><textarea className="text-camp"  id="textAreaMessage" placeholder="Escribe un mensaje..."></textarea></div>
                                <div className="ctn"><input type="submit" value="Enviar" onClick={this.handleSubmitMessage}/></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chatting;