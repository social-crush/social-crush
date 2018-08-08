import React, { Component } from 'react';
// import { signInWithGoogle } from '../../functions/firebase-functions';

// import firebase from 'firebase';
import _ from 'lodash';
 
// Assets
import './signup.css';
// import '../../css/signin_signup.css';

class Signup extends Component {
    constructor(props) {
      super(props);
      
      this.noAction = this.noAction.bind(this);
      this.generateUsername = this.generateUsername.bind(this);
      this.generateDisplayName = this.generateDisplayName.bind(this);
      this.calendar = this.calendar.bind(this);
      this.convertGender = this.convertGender.bind(this);
      this.submitUser = this.submitUser.bind(this);
      this.getAge = this.getAge.bind(this);
      this.validateDate = this.validateDate.bind(this);
      this.signUpWithEmail = this.signUpWithEmail.bind(this);
    }

    componentDidMount() {
      // this.calendar();
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

    submitUser = (user) => {
      if(user) {
        // console.log(user);
        fetch('api/User/SaveMessage', {
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => {
          console.log(res);
          alert('Registro exitoso!');
          window.location.reload();
        })
        .catch(e => console.log(e));
      }
    }

    signUpWithEmail = (e) => {
      e.preventDefault();

      let name = _.trim(document.getElementById('name').value);
      let lastname = _.trim(document.getElementById('lastname').value);
      // let username = _.trim(document.getElementById('username').value);
      let email = _.trim(document.getElementById('email').value);
      let password = _.trim(document.getElementById('password').value);
      let verifyPassword = _.trim(document.getElementById('verifyPassword').value);

      let birthdate = _.trim(document.getElementById('datepicker').value);
      let selectGender = document.getElementById('selectGender');
      let gender = selectGender.options[selectGender.selectedIndex].value;

      let age = this.getAge(birthdate); 

      var userData = {
        "name": _.capitalize(_.camelCase(name)),
        "lastname": _.capitalize(_.camelCase(lastname)),
        // username: `@${username}`,
        "email": email,
        "password": password,
        // "verifyPassword": verifyPassword,
        "birthdate": birthdate,
        "gender": gender,
        "age": age,
        "hour": new Date().getHours(),
        "minute": new Date().getMinutes(),
        "day": new Date().getDate(),
        "month": new Date().getMonth(),
        "year": new Date().getFullYear(),
        "photoUrl": "null"
      }

      if(!_.isEmpty(name)) {
        if(!_.isEmpty(lastname)) {
          // if(!_.isEmpty(username)) {
            if(!_.isEmpty(email)) {
              if(!_.isEmpty(password)) {
                if(!_.isEmpty(password)) {
                  if(selectGender.selectedIndex !== 0) {
                    if(this.validateDate(birthdate)) { 
                      if(_.isEqual(password, verifyPassword)) {
                        this.submitUser(userData);
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
          // } else {
          //   console.log('Debes escribir un nombre de usuario');
          //   alert('Debes escribir un nombre de usuario');
          //   return false;
          // }
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

            {/* <input id="username" placeholder="Nombre de usuario" type="text" className="validate" /> */}
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
          {/* <div className="boton">
            <button onClick={this.signInWithGoogle} className="btn2">Ingresar con Google</button>
          </div> */}
        </div>
      );
    }
  }
  
  export default Signup;