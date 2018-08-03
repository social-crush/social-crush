import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';

import './forgotpassword.css';

class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    handleResetPassword = (e) => {
        e.preventDefault();
        var emailForgotPassword = document.getElementById('emailForgotPassword');
        emailForgotPassword = _.trim(emailForgotPassword.value);

        if(!_.isEmpty(emailForgotPassword)) {
            firebase.auth().sendPasswordResetEmail('20163825@itla.edu.do').then(() => {
                //   Password reset email sent.
                console.log('Password reset email sent.');
                console.log('Chequea tu correo para restablecer contraseña');
                window.location.replace('index');
            })
            .catch(error => {
            // Error occurred. Inspect error.code.
                switch (error) {
                    case 'auth/invalid-email':
                        console.log('El correo introducido no es válido.');
                        console.log('El correo introducido no es válido.');
                        break;
                    case 'auth/user-not-found':
                        console.log('Usuario no encontrado.');
                        console.log('Usuario no encontrado.');
                        break;
                    default:
                        console.log(error);
                        break;
                }
                console.log('Error occurred. Inspect error.code.');
            });

        } else {
            console.log('Debe escribir su correo');
            alert('Debe escribir su correo');
        }
    }
    render(){
        return(
            <div className="ForgotPassword">
            <div className="forgot">
                <div className="forgot-son">
                    <div className="titulo">
                        <p>¿Olvidaste tu contraseña?</p>
                    </div>
                    <div className="informacion">
                        <p>Si haz olvidado tu contraseña, podemos ayudarte a cambiarla mediante tu correo electronico,
                           para resetearla  y asi podras tener acceso denuevo.
                         </p>
                    </div>
                    <div className="formulario">
                        <form action="" onSubmit={this.handleResetPassword} >
                            <div className="correo">
                                <div className="cc"><label htmlFor="">Correo</label></div>
                                <input id="emailForgotPassword" required type="email" placeholder=""/>
                            </div>
                           <div className="btn-s"><input onClick={this.handleResetPassword} type="submit" value="Enviar"/></div> 
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Forgotpassword;