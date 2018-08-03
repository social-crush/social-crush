import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';

// Components
import Header from '../../components/header/Header';

import './changepassword.css';

export default class ChangePassword extends Component{
    constructor(props) {
        super(props);
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // if(!this.props.isSignedUp) {
        //     window.location.replace("/index");
        // }
    }

    componentDidMount() {
        this.addBootstrap4();
    }

    addBootstrap4 = () => {
        var pre = document.createElement('pre');
        pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
        document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    handleSubmit = () => {
        var current_password = document.getElementById('current_password'); 
        var newer_password = document.getElementById('newer_password');
        var confirm_newer_password = document.getElementById('confirm_newer_password');
        current_password = current_password.value;
        newer_password = newer_password.value;
        confirm_newer_password = confirm_newer_password.value;

        if(!_.isEmpty(current_password)) {
            if(_.isEqual(newer_password, confirm_newer_password)) {
                var user = firebase.auth().currentUser;
                const credential = firebase.auth.EmailAuthProvider.credential(
                    user.email, 
                    current_password
                );

                user.reauthenticateWithCredential(credential).then(() => {
                    user.updatePassword(newer_password).then(() => {
                        console.log('La contraseña ha sido actualizada con exito');
                        alert('La contraseña ha sido actualizada con exito'); 
                        window.location.replace('/edit_profile');
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(error => {
                    console.log(error); // auth/wrong-password // The password is invalid or the user does not have a password.
                    console.log('La contraseña que haz introducido no es correcta');
                    alert('La contraseña que haz introducido no es correcta'); 
                });

            } else {
                console.log('Las contraseñas no coinciden');
                alert('Las contraseñas no coinciden'); 
            }
        } else {
            console.log('Debe escribir su contraseña actual');
            alert('Debe escribir su contraseña actual');
        }
    }

    render(){
        return(
        <div className="ChangePassword">
            <Header />
            <div className="configuracion">
                <div className="cambiar-info">  
                    <div className="form-group">
                        <div className="info"><label className="">Actual</label></div>
                        <div className="entrada">
                            <input type="password" className="form-control" id="current_password" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="info"><label className="">Nueva</label></div>
                        <div className="entrada">
                            <input type="password" className="form-control" id="newer_password" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="info"><label className="">Confirmar</label></div>
                        <div className="entrada">
                            <input type="password" className="form-control" id="confirm_newer_password" placeholder="" />
                        </div>
                    </div>
                    <div className="confirmacion">
                        <div className="acciones">
                        <div className="act">
                            <a href="/edit_profile">
                                <button type="button" className="btn-contra">Volver atrás</button>
                            </a>
                        </div>
                        <button type="button" className="btn" onClick={this.handleSubmit} >Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
