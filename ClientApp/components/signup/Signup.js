import React, { Component } from 'react';
// import { signInWithGoogle } from '../../functions/firebase-functions';

import firebase from 'firebase';
import _ from 'lodash';
 
// Assets
import './signup.css';
import '../../css/signin_signup.css';

class Signup extends Component {
    constructor(props) {
      super(props);
      
      this.noAction = this.noAction.bind(this);
      this.signInWithGoogle = this.signInWithGoogle.bind(this);
      this.signUpWithEmail = this.signUpWithEmail.bind(this);
      this.writeUserData = this.writeUserData.bind(this);
      this.generateUsername = this.generateUsername.bind(this);
      this.generateDisplayName = this.generateDisplayName.bind(this);
      this.calendar = this.calendar.bind(this);
      this.convertGender = this.convertGender.bind(this);
      this.showMessageError = this.showMessageError.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.getAge = this.getAge.bind(this);
      this.validateDate = this.validateDate.bind(this);
    }

    componentDidMount() {
      this.calendar();
    }

    changeView = (e) => {
      e.preventDefault();
      this.props.changeView();
    }

    noAction = (event) => {
      event.preventDefault();
    }

    generateDisplayName = (name, lastname) => {
      name = _.split(name, ' ', 1);
      lastname = _.split(lastname, ' ', 1);
      return `${name} ${lastname}`;
    }

    generateUsername = (name, lastname) => {
      name = _.split(name, ' ', 1);
      lastname = _.split(lastname, ' ', 1);
      return `${_.toLower(name+lastname)}`;
    }

    convertGender = (gender) => {
      switch (_.toLower(gender)) {
        case 'male':
          gender = 'Hombre';
          break;
        case 'female':
          gender = 'Mujer';
          break;
        default:
          // gender = gender;
          break;
      }
      return gender;
    }

    signInWithGoogle = () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // Autenticar con Google
      firebase.auth().signInWithPopup(provider)
      .then(res => {
        // Buscar el usuario en la base de datos
        firebase.database().ref('/users/' + res.user.uid).once('value')
        .then(snapshot => {
          console.log(`Signup.js 78: ${res}`);
          // Escribir el usuario si no existe
          if(snapshot.val() === null) {
            this.writeUserData(res);
          } else {
            firebase.database().ref(`/users/${res.user.uid}/`).update({
              lastSignInTime: res.user.metadata.lastSignInTime || 'null'
            }, error => { 
              if(error){ console.log(error); }
              else{ window.location.replace("/home"); }
            });
          }
          // End Escribir Usurio
        })
        .catch(e => {
          console.log(`Code: ${e.code} Message: ${e.message}`);
        });
      })
      .catch(e => {
          console.log(`Error! Code: ${e.code} Message: ${e.message}`);
      });
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
        case "auth/weak-password":
          message = 'La contraseña debe tener al menos 6 caracteres';
          break;
        case "auth/email-already-exists":
          message = 'Este correo ya existe';
          break;
        default:
          message = `code: ${code} message: ${text}`;
          break;
      }
      console.log(message);
      alert(message);
    }

    writeUserData = (res) => {
      var name = res.additionalUserInfo.profile.given_name;
      var lastname = res.additionalUserInfo.profile.family_name;
      var username = this.generateUsername(name, lastname);
      var displayName = this.generateDisplayName(name, lastname);
      var gender = this.convertGender(res.additionalUserInfo.profile.gender);
      firebase.database().ref(`/users/${res.user.uid}`).set({
        username: username,
        displayName: displayName,
        name: name,
        lastname: lastname,
        email: res.user.email,
        photoUrl: res.user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0',
        creationTime: res.user.metadata.creationTime || 'null',
        lastSignInTime: res.user.metadata.lastSignInTime || 'null',
        verified_email: res.additionalUserInfo.profile.verified_email || 'null',
        gender: gender || 'null',
        id: res.additionalUserInfo.profile.id || 'null',
        uid: res.user.uid || 'null'
      }, error => {
        if(error) { console.log(error); }
        else { window.location.replace("/home"); }
      });
    }

    getAge = (dateString) => {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
     return `${age} años`;
    }

    validateDate = (date) => {
      var x = new Date();
      var fecha = date.split("/");
      x.setFullYear(fecha[0],fecha[1]-1,fecha[2]);
      var today = new Date();
 
      if (x >= today)
        return false;
      else
        return true;
    }

    signUpWithEmail = (event) => {
      event.preventDefault();
      var userData = this.validateForm();
      if(userData) {
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then(res => {
          firebase.database().ref(`/users/${res.user.uid}`).set({
            uid: res.user.uid,
            displayName: `${userData.name}  ${userData.lastname}`,
            name: userData.name,
            lastname: userData.lastname,
            email: res.user.email,
            photoUrl : 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0',
            username: userData.username, 
            age: userData.age,
            birthdate: userData.birthdate,
            gender: userData.gender
          }, error => {
            if(error) {
              console.log(error);
            } else {
              window.location.replace("/home");
            }
          });
        })
        .catch(error => {
          this.showMessageError(error.code, error.message);
        });
      } else {
        console.log(`UserData false - Signup.js 169: ${userData}`);
      }
    }

    validateForm = () => {
      let name = _.trim(document.getElementById('name').value);
      let lastname = _.trim(document.getElementById('lastname').value);
      let username = _.trim(document.getElementById('username').value);
      let email = _.trim(document.getElementById('email').value);
      let password = _.trim(document.getElementById('password').value);
      let verifyPassword = _.trim(document.getElementById('verifyPassword').value);

      let birthdate = _.trim(document.getElementById('datepicker').value);
      let selectGender = document.getElementById('selectGender');
      let gender = selectGender.options[selectGender.selectedIndex].value;

      let age = this.getAge(birthdate);

      var userData = {
        name: _.capitalize(_.camelCase(name)),
        lastname: _.capitalize(_.camelCase(lastname)),
        username: `@${username}`,
        email: email,
        password: password,
        verifyPassword: verifyPassword,
        birthdate: birthdate,
        gender: gender,
        age: age
      }

      if(!_.isEmpty(name)) {
        if(!_.isEmpty(lastname)) {
          if(!_.isEmpty(username)) {
            if(!_.isEmpty(email)) {
              if(!_.isEmpty(password)) {
                if(!_.isEmpty(password)) {
                  if(selectGender.selectedIndex !== 0) {
                    if(this.validateDate(birthdate)) { 
                      if(_.isEqual(password, verifyPassword)) {
                        return userData;
                      } else {
                        console.log('Las contraseñas no coinciden');
                        alert('Las contraseñas no coinciden');
                        return false;
                      }
                    } else {
                      console.log('La fecha selecciona debe ser menor a la actual');
                      alert('La fecha selecciona debe ser menor a la actual');
                    return false;
                    }
                  } else {
                    console.log('Debes seleccionar tu género');
                    alert('Debes seleccionar tu género');
                    return false;
                  }
                } else {
                  console.log('Debes escribir una contraseña');
                  alert('Debes escribir una contraseña');
                  return false;
                }
              } else {
                console.log('Debes escribir una contraseña');
                alert('Debes escribir una contraseña');
                return false;
              }
            } else {
              console.log('Debes escribir tu correo');
              alert('Debes escribir tu correo');
              return false;
            }
          } else {
            console.log('Debes escribir un nombre de usuario');
            alert('Debes escribir un nombre de usuario');
            return false;
          }
        } else {
          console.log('Debes escribir tu apellido');
          alert('Debes escribir tu apellido');
          return false;
        }
      } else {
        console.log('Debes escribir tu nombre');
        alert('Debes escribir tu nombre');
        return false;
      }

    }

    calendar = () => {
      // $(document).ready(function(){
      //   $('.datepicker').datepicker();
      // });

      // const Calender = document.getElementById("datepicker");
      // // var instance = M.Datepicker.getInstance(Calender);
      // // instance.open();
      // M.Datepicker.init(Calender, {
      //   format:'dd/mmm/yyyy',
      //   i18n:{
      //     clear:'Limpiar',
      //     cancel:'Cancelar',
      //     done:'Aceptar',
      //     months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      //     monthsShort:['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agost', 'Sept', 'Oct', 'Nov', 'Dic'],
      //     weekdays:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      //     weekdaysShort:['Lun', 'Mart', 'Mierc', 'Jue', 'Vie', 'Sab', 'Dom']
      //   }
      // });
    }

    render() {
      return (
        <div className="in-container-right">
          <h2 style={{marginBottom: "30px"}}><a href="#" onClick={this.changeView}>Iniciar Sesion</a> / <a href="#" onClick={this.noAction} className="stronge">Registrar</a></h2>
          <form className="formulario" onSubmit={this.signUpWithEmail}>

            <div className="input-r">
                <input id="name" className="dn" placeholder="Nombre" type="text" />
                <input id="lastname" placeholder="Apellidos" type="text" className="validate" />	
            </div>

            <input id="username" placeholder="Nombre de usuario" type="text" className="validate" />
            <input id="email" placeholder="Correo" type="email" className="validate" />

            <div className="input-r">
                <input id="password" className="dn" placeholder="Contraseña" type="password" />
                <input id="verifyPassword" placeholder="Confirma Contraseña" type="password" className="validate" />
            </div>
            
            <div className="datecalendario">
              <div className="dada">
                <input type="date" id="datepicker" className="datepicker fech-calendario" placeholder="Fecha de nacimiento" />
              </div>
                <div className="genero">
                  <select id="selectGender" className="browser-default sexo">
                    <option selected disabled >Sexo</option>
                    <option id="op" className="opciones" value='Hombre'>Hombre</option>
                    <option id="op" className="opciones" value='Mujer'>Mujer</option>
                  </select>
                </div>
            </div>
            {/* <div class=""> */}
            <div className="boton">
                <button onClick={this.signUpWithEmail} className="btn-registro">Regístrate</button>
            </div>
            {/* </div> */}
          </form>
          <div className="boton">
            <button onClick={this.signInWithGoogle} className="btn2">Ingresar con Google</button>
          </div>
        </div>
      );
    }
  }
  
  export default Signup;