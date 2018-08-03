import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import _ from 'lodash';
import ResultWidget from '../../components/result_widget/ResultWidget';
import ProfileWidget from '../../components/profile_widget/ProfileWidget';

// Components

// Assets
import './header.css'; 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            newData: null,
            showResult: false,
            isSignedIn: false,
            users: null
            // newData: {
            //     displayName: null,
            //     photoUrl: null,
            //     username: null,
            //     email: null,
            //     name: null,
            //     lastname: null,
            //     uid: null
            // }
        }
        this.stateAuth = this.stateAuth.bind(this);
        this.stateAuth();
        this.handleSearchUser = this.handleSearchUser.bind(this);
        this.obtener = this.obtener.bind(this);
        this.handleOnBur = this.handleOnBur.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleGoToChatting = this.handleGoToChatting.bind(this);
        this.handleGoToProfile = this.handleGoToProfile.bind(this);
    }

    stateAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isSignedIn: true,
                    uid: user.uid
                });
            } else {
                this.setState({
                    isSignedIn: false
                });
            }
        });
    }

    handleSearchUser = () => {
        var searchUser = document.getElementById('search-user');
        // var dataVal = searchUser.getAttribute("data-content");

        var newData = '¡No hay resultados!';
        var searchText = _.trim(searchUser.value);

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
        
        //searchUser.setAttribute("data-content", searchUser.value);
    }

    handleOnNoFocus = () => {
      this.setState({showResult: false});
    }

    handleOnBur = () => {
        setTimeout(this.handleOnNoFocus.bind(this), 300);
    }

    handleOnFocus = () => {
        if(this.state.newData) {
            this.setState({showResult: true});
        }
    }

    handleGoToChatting = (e) => {
        e.preventDefault();
        console.log('Debes iniciar sesion para entrar al chat');
        alert('Debes iniciar sesion para entrar al chat');
    }

    handleGoToProfile = (e) => {
        e.preventDefault();
        console.log('Debes iniciar sesion para entrar al perfil');
        alert('Debes iniciar sesion para entrar al perfil');
    }

    getUid = (uid) => {
        this.setState({ uid });
    }

    obtener = () => {
        var z = document.getElementById('search-user');
        var posicion = z.getBoundingClientRect();
  
        console.log(posicion.top, posicion.right, posicion.bottom, posicion.left);
        console.log(posicion);
    } 

    render() {
      return (
        <header>
            <nav className="navbar navbar-default nav-content">
                <div className="container d-flex justify-content-around">
                <div className="lg" data-toggle="tooltip" data-placement="bottom" title="Inicio">
                    <a href="/home">
                        <img src="img/logo.png" id="logo" className="logo" alt="Logo" />
                    </a>
                </div>
                <div className="search">
                    <form onSubmit={e => e.preventDefault()} action="#" method="POST" style={{paddingBottom: "15px"}}>
                        <input id="search-user" onChange={this.handleSearchUser} onFocus={this.handleOnFocus} onBlur={this.handleOnBur} type="text" autoComplete="off" className="form-control text-search" placeholder="Buscar"  />
                        {/* <input id="search-user" onChange={this.handleSearchUser} type="text" autoComplete="off" className="form-control text-search" placeholder="Buscar" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="¡No hay resultados!" /> */}
                    </form>
                </div>
                {/*Iconos del Menu*/}
                <div className="iconos">
                    <ul className="nav navbar-nav"> 
                    <li data-toggle="tooltip" data-placement="bottom" title="Inicio"><a href="/home"><i className="fa fa-home icono" /></a></li>
                    <li data-toggle="tooltip" data-placement="bottom" title="Chat"><a href="/chatting" {...this.state.uid ? '' : this.handleGoToChatting} ><i className="fa fa-heart icono" /></a></li>
                    {/* <li><a href="/profile"><i className="fa fa-user icono" /></a></li> */}
                    <li data-toggle="tooltip" data-placement="bottom" title="Perfil"><a href="/profile" {...this.state.uid ? '' : this.handleGoToProfile}><i className="fa fa-user icono" /></a></li>
                    {/* <li><a href={this.state.isSignedIn ? '/profile' :  '/index'}><i className="fa fa-user icono" /></a></li> */}
                    </ul>
                </div>
                </div>
            </nav>
            { this.state.showResult ? (
                <ResultWidget users={this.state.newData || '¡No hay resultados!'} getUid={this.getUid.bind(this)} /> ) : ( "" ) 
            }
            {/* <ProfileWidget uid={this.state.uid} /> */}
            {/* { this.state.uid ? <ProfileWidget uid={this.state.uid} /> : ""} */}
        </header>
        
      );
    }
  }
  
  export default Header;
