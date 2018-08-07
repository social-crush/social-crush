import React, { Component } from 'react';
// import firebase from 'firebase';
import _ from 'lodash';

// Assets
import './chatting.css'; 

// Components
import Header from '../header/Header';

class Chatting extends Component{
    state = { chat: null, users: null, newData: null };

    constructor(props){
        super(props);

        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
        this.getMonth = this.getMonth.bind(this);
        this.setScrollYtoBottom = this.setScrollYtoBottom.bind(this);
        this.handleSearchChat = this.handleSearchChat.bind(this);
        this.getUsers = this.getUsers.bind(this);

    }

    componentDidMount() {
        this.addBootstrap4();
        
        fetch("api/Chat/Messages")
            .then(res => res.json())
            .then(data => {
                this.setState({ chat: data });
            });

        // fetch("api/User/User")
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({ chat: data });
        //     });
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

            alert('Handle Submit Message');

            // setInterval(this.setScrollYtoBottom(), 30);
            
            // this.setTimeOut(this.setScrollYtoBottom(), 250);

        } else {
            console.log('Debes escribir un mensaje para enviarlo');
            alert('Debes escribir un mensaje para enviarlo');
        }
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
            // alert('Handle Search User');
            console.log(searchUser);
        } else {
            this.getUsers(searchUser);
        }
    }

    getUsers = (searchText) => {
        var newData = '¡No hay resultados!';

        if(!_.isEmpty(searchText)) {
            this.setState({ showResult: true });

            
              
            // var users = {};
            //     for(var user in newData) {
            //         if(user !== this.state.uid && _.toLower(newData[user].displayName).search(_.toLower(searchText)) !== -1) {
            //             users[user] = newData[user];
            //         }
            //     }
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
    
          listItems = Object.keys(chat).map((msg) =>
            <li key={chat[msg].messageId} className="left clearfix space">
                <span className="chat-img pull-left">
                    <img src={"https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0"} alt="" className="img-p" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{"Usuario"}</strong> 
                        <small className="pull-right text-muted"><span className="glyphicon glyphicon-time" />{`${chat[msg].day} de ${this.getMonth(chat[msg].month)} a las ${chat[msg].hour}:${chat[msg].minute}`}</small>
                    </div>
                    <p>
                        {chat[msg].text}
                    </p>
                </div>
            </li>
          );
        //   Object.keys(chat).map((msg) => console.log(chat[msg]));

        //   for(var msg in chat) {
        //     console.log(msg);
        //     console.log(chat[msg]);
        //     console.log(chat[msg].text);
        //   }

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