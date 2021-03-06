import React, { Component } from 'react';

// Assets
import './usersidebar.css';

class UserSidebar extends Component {
    constructor(props) {
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick = (e) => {
      e.preventDefault();
      
      var sesion = window.localStorage.getItem('sesion');
      sesion = (sesion === 'true') ? true : false;

      if(sesion) {
        // funciona como una redirección HTTP
        window.location.replace("/profile");

        // funciona como si dieras clic en un enlace
        // window.location.href = "/profile";
      }
    }

    render() {
      return (
        <aside className="right-aside center-content">
          <section> 
            <div>
              <h4>{this.props.displayName || 'Invitado'}</h4> 
              <div className="div-img-profile center-content">  {/* Contenedor de la Imagen de Perfil */}
                <a href={`/profile?id=${this.props.userId}`} >
                  <img alt="" className="img-profile-user" src={this.props.photoUrl  || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0'} /> {/* Imagen */}
                </a>
              </div>
              <div className="center-content">
                <a className="username" href={`/profile?id=${this.props.userId}`}>
                  <h5>{this.props.email || '@invitado'}</h5> 
                </a>
              </div> 
              {/* <footer className="footer-user-sidebar">
                <hr className="hl" />
                <div className="center-content">
                  <div>
                    <p>Posts realizadas:</p>
                    <p>{this.props.postCount || '0'}</p>
                  </div>
                  <hr className="vl" />
                </div>
              </footer> */}
            </div>
          </section>
        </aside>
      );
    }
}
  
  export default UserSidebar;

  
  