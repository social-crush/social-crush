import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
// Components
import Header from '../../components/header/Header';

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

    generateDisplayName = (name, lastname) => {
      name = _.split(name, ' ', 1);
      lastname = _.split(lastname, ' ', 1);
      return `${name} ${lastname}`;
    }

    componentWillMount() {
        // if(!this.props.isSignedUp) {
        //     window.location.replace("/index");
        // }
    }

    componentDidMount() {
        this.addBootstrap4();
        // var uid = this.state.user.uid;
        // var uid = window.localStorage.getItem('uid');
        // if(uid !== null && uid !== '') {
        //     firebase.database().ref(`/users/${this.state.user.uid}/`).on('value', snapshot => {
        //         var photoUrl = snapshot.val();
        //         if(photoUrl) {
        //             console.log(photoUrl);
        //             console.log(photoUrl.photoUrl);
        //         }
        //     });
        //     firebase.database().ref(`/users/${this.state.user.uid}/photoUrl`).on('value', snapshot => {
        //         var photoUrl = snapshot.val();
        //         if(photoUrl) {
        //             console.log(photoUrl);
        //             console.log(photoUrl.photoUrl);
        //         }
        //     });
        // } else {
        //     console.log('ELSE');
        // }
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

        var user = firebase.auth().currentUser;
        var displayName = this.generateDisplayName(editProfileName, editProfileLastname);

        user.updateProfile({
            displayName: displayName,
            email: editProfileEmail 
        }).then(() => {
            var ref = firebase.database().ref(`/users/${user.uid}/`)
            .update({
                displayName: displayName,
                name: editProfileName,
                lastname: editProfileLastname,
                username: editProfileUsername,
                email: editProfileEmail
            });
            console.log('Información actualizada con éxito');
            alert('Información actualizada con éxito');
            window.location.reload();
        }).catch(error => {
            console.log(error);
            console.log('Ocurrió un error al actualizar su información');
            alert('Ocurrió un error al actualizar su información');
        });

                     
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

                        var user = firebase.auth().currentUser;
                        var displayName = this.generateDisplayName(editProfileName, editProfileLastname);

                        user.updateProfile({
                            displayName: displayName,
                            email: editProfileEmail 
                        }).then(() => {
                            var ref = firebase.database().ref(`/users/${user.uid}/`)
                            .update({
                                displayName: displayName,
                                name: editProfileName,
                                lastname: editProfileLastname,
                                username: editProfileUsername,
                                email: editProfileEmail
                            });
                            console.log('Información actualizada con éxito');
                            alert('Información actualizada con éxito');
                        }).catch(error => {
                            console.log(error);
                            console.log('Ocurrió un error al actualizar su información');
                            alert('Ocurrió un error al actualizar su información');
                        });

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

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`images/user_profile/${uid}/${file.name}`).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running');
                break;
            }
          }, error => {
                if(error) { console.log(error) };
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log(downloadURL);
                document.getElementById("photoProfile").src = downloadURL;

                var user = firebase.auth().currentUser;
                user.updateProfile({
                    photoUrl: downloadURL
                }).then(() => {
                    firebase.database().ref(`/users/${uid}/`).update({
                        photoUrl: downloadURL
                    });
                    console.log('Foto de perfil actualizada con éxito');
                    // alert('Foto de perfil actualizada con éxito');

                }).catch(error => {
                    console.log(error);
                    console.log('Ocurrió un error al actualizar su foto de perfil');
                    alert('Ocurrió un error al actualizar su foto de perfil');
                });

            });
          });
        //   this.handleUploadImage(e);
    }

    handleUploadImage = (evt) => {
    //   const files = evt.target.files;
    //   this.setState({ imageFile: files[0] });
      
    //   for (var i = 0, f; f = files[i]; i++) {
    //     if (!f.type.match('image.*')) {
    //       continue;
    //     }
    
    //     var reader = new FileReader();
    
    //     reader.onload = (function(theFile) {
    //     return function(e) {
    //       document.getElementById("foto-perfil").innerHTML = ['<img src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
    //     };
    //     })(f);
    
    //     reader.readAsDataURL(f);
    //   }
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
        var displayName = this.state.user.displayName || '';
        var photoUrl = this.state.user.photoUrl;
        var name = this.state.user.name || '';
        var lastname = this.state.user.lastname || '';
        var username = this.state.user.username || '';
        var email = this.state.user.email || '';
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