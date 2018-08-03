import React, { Component } from 'react';

// Assets
import './welcome.css';

class Welcome extends Component {
    render() {
      return (
        <div className="welcome">
            <div className="titulo">
                <h1>Social Crush</h1>
            </div>
            <div className="in-welcome">
                <div className="left-in">
                    <div className="mensajes">
                        <h5><i className="far fa-heart" /> Declara lo que sientes</h5>
                    </div>
                    <div className="mensajes">
                        <h5><i className="far fa-comment-dots" /> Lee declaraciones privadas</h5>
                    </div>
                    <div className="mensajes">
                        <h5><i className="fas fa-eye" /> Declarate en público o anónimo</h5>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Welcome;
  