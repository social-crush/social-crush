import React, { Component } from 'react';
import firebase from  'firebase';

// Assets
import './profilewidget.css';

class ProfileWidget extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      user: {
        displayName: null,
        photoUrl: null,
        username: null,
        uid: null,
        phoneNumber: null,
        age: null,
        gender: null,
        location: null
      }
    }
  }

  componentWillReceiveProps() {
    var uid = this.props.uid;
    if(uid) {
      firebase.database().ref(`/users/${uid}`).once('value')
      .then(snapshot => {
        var user = snapshot.val();
        if(user) {
          this.setState({ user });
        }
      });
    }
  }
  
  render() {
    var uid = this.props.uid || '';
    var displayName = this.state.user.displayName || 'Desconocido';
    var username = this.state.user.username ? `@${this.state.user.username}` : 'Desconocido';
    var photoUrl = this.state.user.photoUrl || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0';
    var phoneNumber = this.state.user.phoneNumber || 'Desconocido';
    var age = this.state.user.age ? `${this.state.user.age} años` : 'Desconocido';
    var gender = this.state.user.gender || 'Desconocido';
    var location = this.state.user.location || 'Desconocido';

    var url = `profile-friend/${uid}`;
    return (
      // <div className="ProfileWidget">
        <div className="modal fade" id="myModal">
        {/* <div className="modal fade show" id="myModal" style={{display: 'block'}}> */}
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="">
                <div className="profile-widget-header">
                  <div className="div-user-img-profile">  {/* Contenedor de la Imagen de Perfil */}
                    <a href={url}>
                      <img alt="" className="user-img-profile" src={photoUrl} />
                    </a>
                  </div>
                  <div className="div-username"> 
                    <a href={url}>
                      <p className="user-name">{displayName}</p>
                      <p>{username}</p>
                    </a>
                  </div>
                  <div>
                    {/* <button id="button-close-modal" type="button" className="close" data-dismiss="modal">&times;</button> */}
                    <button href={url} className="button-view-profile">Ver Perfil</button>
                  </div>
                </div>
                <div className="profile-widget-content">
                  <div className="profile-widget-info">
                    <div className="profile-widget-info-content" style={{width: '30%'}}>
                      <p><span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Edad:</span>&nbsp;<span style={{color: 'rgba(0, 0, 0, 0.87)'}}>{`${age}`}</span></p>
                      <p><span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Sexo:</span>&nbsp;<span style={{color: 'rgba(0, 0, 0, 0.87)'}}>{gender}</span></p>
                    </div>
                    <div className="profile-widget-info-content" style={{width: '70%'}}>
                      <p><span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Localidad:</span>&nbsp;<span style={{color: 'rgba(0, 0, 0, 0.87)'}}>{location}</span></p>
                      <p><span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Contacto:</span>&nbsp;<span style={{color: 'rgba(0, 0, 0, 0.87)'}}>{phoneNumber}</span></p>
                    </div>
                  </div>
                  {/* <div className="below">
                    <div className="center-content">
                      <div className="">
                        <p>Seguidos</p>
                        <p>34</p>
                      </div>
                      <hr className="vl" />
                      <div>
                        <p>Posts</p>
                        <p>7</p>
                      </div>
                      <hr className="vl" />
                      <div>
                        <p>Para mí</p>
                        <p>3</p>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="profile-widget-footer center-content">
                  {/* <button className="btn-o"><i className="fas fa-user-plus"></i> Seguir</button>
                  <button className="btn-o"><i className="fas fa-envelope"></i> Mensaje</button> */}
                  
                  <button className="btn-o" data-dismiss="modal"><i className="fas fa-times-circle"></i> Cerrar</button>
                  <button className="btn-o"><i className="fas fa-pencil-alt"></i> Declaración</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      // </div>
    );
  }
}
  
export default ProfileWidget;
  