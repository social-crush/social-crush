import React, { Component } from 'react';
// import firebase from 'firebase';
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
            
            alert('Handle Reset Password');

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