import React, { Component } from 'react';
// import firebase from 'firebase';
import _ from 'lodash';

// Assets
import './chatting.css'; 

// Components
import Header from '../header/Header';
import Message from '../message/Message';

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
        this.onlyTry = this.onlyTry.bind(this);

    }

    componentDidMount() {
        this.addBootstrap4();
        
        fetch("api/Chat/GetAllMessages")
            .then(res => res.json())
            .then(data => {
                this.setState({ chat: data });
            }).catch(e => console.log(e));

        fetch("api/User/GetAllUsers")
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data });
            }).catch(e => console.log(e));
    }

    onlyTry = () => {
        fetch("api/Chat/GetAllMessages")
            .then(res => res.json())
            .then(data => {
                this.setState({ chat: data });
                console.log(data);
            })
            .catch(e => console.log(e));
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

            var message = {
                // "messageId": 9,
                "userId": 6,
                "text": textAreaMessage,
                "hour": new Date().getHours(),
                "minute": new Date().getMinutes(),
                "day": new Date().getDate(),
                "month": new Date().getMonth(),
                "year": new Date().getFullYear()
            };
            
            fetch('api/Chat/SaveMessage', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(message)
            })
            .then(res => {
                this.onlyTry();
            })
            .catch(e => console.log(e));

            setInterval(this.setScrollYtoBottom(), 300);
            
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

        } else {
            this.getUsers(searchUser);
        }
    }

    getUsers = (searchText) => {
        var newData = '¡No hay resultados!';

        if(!_.isEmpty(searchText)) {
            this.setState({ showResult: true });

            fetch(`api/User/GetUserByName/${searchText}`)
            .then(res => res.json())
            .then(data => {
                if(data.length <= 0) {
                    data = null;
                }
                this.setState({ newData: data });
            })
            .catch(e => console.log(e));

        } else {
            newData = '¡No hay resultados!';
            this.setState({ newData });
        }
    }

    render(){
        var chat = this.state.chat;
        var listItems = '';
        
        if(chat != null){
    
          listItems = Object.keys(chat).map((msg) =>
            <Message key={chat[msg].messageId} message={chat[msg]} userId={chat[msg].userId} />
          );
        //   Object.keys(chat).map((msg) => console.log(chat[msg]));

        setTimeout(this.setScrollYtoBottom(), 300);
        // this.setScrollYtoBottom();
    
        } else {
          listItems = <h1 style={{textAlign: 'center'}}>Cargando mensajes...</h1>;
        }

        var users = this.state.newData ? this.state.newData : this.state.users;
        var listUsers = '';
        
        if(users != null){
    
            listUsers = Object.keys(users).map((user) =>
            <div key={user} className="friend">
                <a href={`profile?id=${users[user].userId}`} >
                    <div className="persons-imagen">
                        <img src={users[user].photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0"} alt="" />
                    </div>
                    <div className="persons-nombres">
                        <p>{`${users[user].name} ${users[user].lastname}` || 'DisplayName'}</p>
                        {/* <p>{users[user].username ? `@${users[user].username}` : '@username'}</p> */}
                    </div>
                </a>
            </div>
          );
        // Object.keys(users).map((user) => console.log(users[user]));
    
        } else {
            listUsers = <h5 style={{textAlign: 'center'}}>Cargando usuarios...</h5>;
        }

        return (
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