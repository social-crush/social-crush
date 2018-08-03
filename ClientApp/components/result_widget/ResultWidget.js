import React, { Component } from 'react';
import _ from 'lodash';

import './resultwidget.css';

class ResultWidget extends Component {
  constructor(props) {
    super(props);
    // this.setUserDataPost = this.setUserDataPost.bind(this);
  }

  // setUid = (e) => {
  //   e.preventDefault();
  // }
    
  setUserDataPost = (e) => {
    if(this.props.setUserDataPost) {
      e.preventDefault();
      var value = e.currentTarget.id;
      this.props.setUserDataPost(value);
    }
    if(this.props.getUid) {
      var value = e.currentTarget.id;
      this.props.getUid(value);
    }
  }

  render() {
    var users = this.props.users;
    var listItems = '';
    
    if(users !== '¡No hay resultados!'){

      listItems = Object.keys(users).map((user) => 
        <li key={user}>
        {/*  data-toggle={this.props.setUserDataPost ? "" : "modal"} data-target="#myModal" */}
          <a id={user} href={`friend?${users[user].uid}`} onClick={this.setUserDataPost}>
            <div className="resultado-imagen">
              <img src={users[user].photoUrl || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0'} alt="" />
            </div>
            <div className="resultado-nombres">
              <p>{users[user].displayName || 'Username'}</p>
              <p>{`@${users[user].username}` || '@username'}</p>
            </div>
          </a>
        </li>
      );

    } else {
      listItems = <li>¡No hay resultados!</li>;
    }

    return (
      <div className={this.props.setUserDataPost ? "wd-post" : "wd"}> 
        <div className="resultados">
          <div className="cuadrito"></div>
          <div className="personas">
            <div className="busqueda-perfil">
              <ul className="list-unstyled" style={{paddingBottom:'0px',marginBottom:'0px'}}>{listItems}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultWidget;