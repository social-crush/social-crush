import React, { Component } from 'react';

import firebase from 'firebase';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// Assets
import './signin.css';
// import './modalpassword.css';
import '../../css/signin_signup.css';

class Signin extends Component {
    constructor(props) {
      super(props);

      this.noAction = this.noAction.bind(this);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.handleGuest = this.handleGuest.bind(this);
      this.generatePassword = this.generatePassword.bind(this);
      this.showMessageError = this.showMessageError.bind(this);
    }

    generatePassword = () => {
      let chars = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
      let password = "";
      for (let i = 0; i < 16; i++) password += chars.charAt(Math.floor(Math.random()*chars.length)); 
      return password;
    }
    
    changeView = (e) => {
      e.preventDefault();
      this.props.changeView();
    }

    noAction = (event) => {
      event.preventDefault();
    }

    signInWithEmail = (event) => {
      event.preventDefault();
      let email = document.getElementById('emailLogin').value;
      let password = document.getElementById('passwordLogin').value;
      if(!_.isEmpty(_.trim(email))) {
        if(!_.isEmpty(_.trim(password))) {
          firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(error => {
            if(error) {
              this.showMessageError(error.code, error.message);
            } else {
              window.location.replace("/home");
            }
          });
        } else {
          console.log('Debe proporcionar su contraseña');
          alert('Debe proporcionar su contraseña');
        }
      } else {
        console.log('Debe proporcionar un email');
        alert('Debe proporcionar un email');
      }
    }

    handleGuest = () => {
      firebase.auth().signOut();
    }

    showMessageError = (code, text) => {
      var message = '';

      switch (code) {
        case "auth/invalid-email":
          message = 'El correo no es válido';
          break;
        case "auth/wrong-password":
          message = 'La contraseña es incorrecta';
          break;
        case "auth/user-not-found":
          message = 'Este usuario no existe';
          break;
        default:
          message = text;
          break;
      }
      console.log(message);
      alert(message);
    }

    render() {
      return (
        // <div className="Signin">
            <div className="in-container-right">
              <h2 style={{marginBottom: "50px"}}><a href="#" onClick={this.noAction} className="stronge">Iniciar Sesion</a> / <a href="#" onClick={this.changeView}>Registrar</a></h2>
              <form className="formulario form-1" onSubmit={this.signInWithEmail}>
                <div className="input" style={{marginBottom: "15px"}}>
                  <i className="Large material-icons prefix">account_circle</i>
                  <input id="emailLogin" placeholder="Correo" type="email" className="validate" required />
                </div>
                <div className="input">
                  <i className="material-icons prefix">lock_open</i>
                  <input id="passwordLogin" placeholder="Contraseña" type="password" className="validate" required />
                </div>
                <div className="boton">
                  <button onClick={this.signInWithEmail} className="btn-iniciar-sesion">Iniciar Sesion</button>
                </div>
                <div className="boton">
                  <a href="/home" className="center-content">
                    <input type="button" onClick={this.handleGuest} defaultValue="Invitado" className="btn2" /> 
                  </a>
                </div>
              </form>
              <div className="olvidar">
                <div className="olvidar-2">
                  <a href="/forgotpassword">¿Olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
        // </div>
      );
    }
  }
  
  export default Signin;