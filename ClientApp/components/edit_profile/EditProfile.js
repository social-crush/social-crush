import React, { Component } from 'react';
// import firebase from 'firebase';
import _ from 'lodash';
// Components
import Header from '../header/Header';

import './editprofile.css';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {
            displayName: null,
            photoUrl: null,
            username: null,
            email: null,
            name: null,
            lastname: null,
            uid: null
          }
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.handleSaveChanges2 = this.handleSaveChanges2.bind(this);
        this.generateDisplayName = this.generateDisplayName.bind(this);
        this.handleUpdatePhoto = this.handleUpdatePhoto.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
    }

    componentDidMount() {
        this.addBootstrap4();
    }

    componentWillMount() {
        // if(!this.props.isSignedUp) {
        //     window.location.replace("/index");
        // }
    }

    generateDisplayName = (name, lastname) => {
      name = _.split(name, ' ', 1);
      lastname = _.split(lastname, ' ', 1);
      return `${name} ${lastname}`;
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        user: nextProps.user
      });
      this.setInputValue();
    }

    addBootstrap4 = () => {
        var pre = document.createElement('pre');
        pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
        document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    handleSaveChanges2 = () => {
        var editProfileName = document.getElementById('editProfileName');
        var editProfileLastname = document.getElementById('editProfileLastname');
        var editProfileUsername = document.getElementById('editProfileUsername');
        var editProfileEmail = document.getElementById('editProfileEmail');

        editProfileName = _.trim(editProfileName.value);
        editProfileLastname = _.trim(editProfileLastname.value);
        editProfileUsername = _.trim(editProfileUsername.value);
        editProfileEmail = _.trim(editProfileEmail.value);

        if(_.isEmpty(editProfileName)) {
            editProfileName = this.state.user.name || '';
        }
        if(_.isEmpty(editProfileLastname)) {
            editProfileLastname = this.state.user.lastname || '';
        }
        if(_.isEmpty(editProfileUsername)) {
            editProfileUsername = this.state.user.username || '';
        }
        if(_.isEmpty(editProfileEmail)) {
            editProfileEmail = this.state.user.email || '';
        }

        alert('Handle Save Change');

                     
    }

    handleSaveChanges = () => {
        var editProfileName = document.getElementById('editProfileName');
        var editProfileLastname = document.getElementById('editProfileLastname');
        var editProfileUsername = document.getElementById('editProfileUsername');
        var editProfileEmail = document.getElementById('editProfileEmail');

        editProfileName = _.trim(editProfileName.value);
        editProfileLastname = _.trim(editProfileLastname.value);
        editProfileUsername = _.trim(editProfileUsername.value);
        editProfileEmail = _.trim(editProfileEmail.value);

        if(!_.isEmpty(editProfileName)) {
            if(!_.isEmpty(editProfileLastname)) {
                if(!_.isEmpty(editProfileUsername)) {
                    if(!_.isEmpty(editProfileEmail)) {

                        alert('Handle Save Change 2');

                    } else {
                        console.log('Debes escribir tu correo');
                        alert('Debes escribir tu correo');
                    }
                } else {
                    console.log('Debes escribir un nombre de usuario');
                    alert('Debes escribir un nombre de usuario');
                }
            } else {
                console.log('Debes escribir tu apellido');
                    alert('Debes escribir tu apellido');
            }
        } else {
            console.log('Debes escribir tu nombre');
                alert('Debes escribir tu nombre');
        }
    }

    handleUpdatePhoto = (e) => {
        const file = e.target.files[0];

        var uid = this.state.user.uid;

        alert('Handle Update Photo');
        
        //   this.handleUploadImage(e);
    }

    handleUploadImage = (evt) => {
        alert('Handle Upload Image');
    }

    setInputValue = () => {
        var editProfileName = document.getElementById('editProfileName');
        var editProfileLastname = document.getElementById('editProfileLastname');
        var editProfileUsername = document.getElementById('editProfileUsername');
        var editProfileEmail = document.getElementById('editProfileEmail');

        editProfileName.value = this.state.user.name;
        editProfileLastname.value = this.state.user.lastname || '';
        editProfileUsername.value = this.state.user.username || '';
        editProfileEmail.value = this.state.user.email || '';
    }

    render(){ 
        var displayName = this.state.user.displayName || 'Username';
        var photoUrl = this.state.user.photoUrl || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0';
        var name = this.state.user.name || 'Name';
        var lastname = this.state.user.lastname || 'Lastname';
        var username = this.state.user.username || '@Username';
        var email = this.state.user.email || 'Emal';
        return(
            <div className="EditProfile">
                <Header />
                <div className="configuracion ">
                    {/* <div className="opciones">
                        <div className="opcion1">
                        <ul>
                            <li><a href="#">Editar perfil</a></li>
                        </ul>
                        </div>
                        <div className="opcion1 xxx">
                        <ul>
                            <li><a href="/change_password">Cambiar contraseña</a></li>
                        </ul>
                        </div>
                    </div> */}
                    <div className="nombre-usuario">
                        <p>{displayName}</p>
                    </div>
                    <div className="cambiar-info">
                        <div className="form-group div-foto">
                            <div className="foto-perfil">
                                <img id="photoProfile" src={photoUrl} alt="" />
                            </div>
                            <div className="editar-foto">
                                <p>{displayName}</p>
                               <div><input type="file" accept="image/png, image/jpeg" className="file-input" onChange={this.handleUpdatePhoto} /></div> 
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="info"><label>Nombre</label></div>
                            <div className="entrada">
                                <input id="editProfileName" type="text" className="form-control" placeholder={name} defaultValue={name} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="info"><label>Apellidos</label></div>
                            <div className="entrada">
                                <input id="editProfileLastname" type="text" className="form-control" placeholder={lastname} defaultValue={lastname} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="info"><label>Nombre de usuario</label></div>
                            <div className="input-group entrada">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">@</div>
                                </div>
                                <input id="editProfileUsername" type="text" className="form-control" placeholder={username} defaultValue={username} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="info"><label>Correo</label></div>
                            <div className="entrada">
                                <input id="editProfileEmail" type="email" className="form-control" placeholder={email} defaultValue={email} />
                            </div>
                        </div>
                    </div>
                    <div className="confirmacion">
                        <div className="acciones">
                            <div className="act">
                                <a href="/change_password">
                                    <button type="button" className="btn-contra">Cambiar contraseña</button>
                                </a>
                            </div>
                            <div className="act"><button onClick={this.handleSaveChanges2} type="button" className="btn">Guardar cambios</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}