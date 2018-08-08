import React, { Component } from 'react';
// import firebase from 'firebase';
import _ from 'lodash';

import Comment from '../comment/Comment';

// Assets
import './newsfeed.css';

// import '../../../node_modules/aos/dist/aos.css';

class Newsfeed extends Component {
    state = { user: { name: 'Username', lastname: '', photoUrl: null  }, data: { newsFeedId: null }, comments: null };

    constructor(props) { 
      super(props);
      
      this.handleSendComment = this.handleSendComment.bind(this);
      this.handleLike = this.handleLike.bind(this);
      this.getMonth = this.getMonth.bind(this);
      this.handleFocusComment = this.handleFocusComment.bind(this);
      this.goToFriend = this.goToFriend.bind(this);
      this.submitComment = this.submitComment.bind(this);
    }

    componentDidMount() {
      var userId = this.props.userId;
      if(userId) {
        fetch(`api/User/GetUserById/${userId}`)
          .then(res => res.json())
          .then(data => {
            this.setState({ user: data });
          }).catch(e => console.log(e));
      }

      var newsFeedId = this.props.newsFeedId;
      if(newsFeedId) {
        fetch(`api/Comment/GetCommentsByNewsFeedId/${newsFeedId}`)
          .then(res => res.json())
          .then(data => {
            if(data.length <= 0) {
              data = null;
            }
            this.setState({ comments: data });
          }).catch(e => console.log(e));
      }
    }

    addBootstrap4 = () => {
      var pre = document.createElement('pre');
      pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
      document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    submitComment = (comment) => {
      if(comment) {
        fetch('api/Comment/CreateComment', {
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify(comment)
      })
      .then(res => {
          // this.onlyTry();
          console.log(res);
      })
      .catch(e => console.log(e));
      }
    }

    handleSendComment = (event) => {
      var txtAreaComment = document.getElementById(`textareaComment${this.props.newsFeedId}`);
      var textAreaComment = _.trim(txtAreaComment.value); 
      var displayName = this.props.displayName || 'Username';

      if(!_.isEmpty(textAreaComment)) {
  
        var commentData = {
          userId: this.props.currentUserId,
          text: textAreaComment, 
          displayName: displayName, 
          day: new Date().getDate(),
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
          minute: new Date().getMinutes(),
          hour: new Date().getHours()
        }
        
        this.submitComment(commentData);

      } else {
        alert('Debes escribir algo para comentar.');
        console.log('Debes escribir algo para comentar.');         
      }

      txtAreaComment.value = '';
    }

    handleFocusComment = (event) => {
      event.preventDefault();
      document.getElementById(`textareaComment${this.props.id}`).focus();
    }

    handleLike = (event) => {
      event.preventDefault();

      if(this.props.currentUserUid !== 'null') {

        alert('Handle Like');

      } else {
        console.log('Debes iniciar sesión para dar me gusta.');
        alert('Debes iniciar sesión para dar me gusta.');
      }

    }

    getMonth = (month) => {
      let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      return meses[month];
    }

    goToFriend = (e) =>{
      // if(this.props.data.isAnonimous) {
      //   e.preventDefault();
      // } else {
      //   window.location.replace(`friend?${this.props.data.fromUid}`);
      // }
    }

    render() {
      var minute = this.props.data.minute || "";
      var hour = this.props.data.hour || "";
      var day = this.props.data.day || "";
      var text = this.props.data.text || "";
      var month = this.getMonth(this.props.data.month) || "";
      var imageUrl = this.props.data.imageUrl || "";

      var photoUrl = this.state.user.photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0";
      var displayName = `${this.state.user.name} ${this.state.user.lastname}` || '';
      var comments = this.state.comments || "";
      var id = this.props.newsFeedId;
      
      return (
        // <div data-aos="zoom-in">
        <article className="post">
          <header className="header-post">
            <div className="div-img-profile">  {/* Contenedor de la Imagen de Perfil */}
              <a href={'#'} onClick={this.goToFriend}>
                <img alt={""} className="img-profile" src={photoUrl} />
              </a>
            </div>
            <div className="div-user"> 
              <a href={'#'} onClick={this.goToFriend}>{displayName}</a> {/* Usuario */}
              {/* <p>17 de julio a las 15:19</p> */}
              <p>{`${day} de ${month} a las ${hour}:${minute}`}</p>
            </div>
          </header>
          <div className=""> {/* Contenido Del Post */}
            <div className="div-text-post">{/* Texto Del Post */}
              <p>{text}</p>
            </div> 
            {
              imageUrl ? (
                <div className="div-img-post"> {/* Imagen del Post */}
                  <img alt={""} className="img-post" src={imageUrl} />
                </div>
              ) : (
                ""
              )
            }
          </div>
          <div className="div-footer"> {/* Pie Del Post */}
            <section className="section-like-comment">
              <a className="" href="#" onClick={this.handleLike}><i className="far fa-heart icon-post" /></a>
              <a className="" href="#" onClick={this.handleFocusComment}><i className="far fa-comment icon-post" /></a>
            </section>
            <section> {/* Cantidad Me Gusta del Post */}
              <div className="div-likes">
                <a href="#" onClick={e => e.preventDefault()}><span>{`${this.props.data.likes || "0"} Me gusta`}</span></a>
              </div>
            </section>
            <div className="div-comments"> {/* Seccion de Comentarios del Post */}
              <ul className="list-unstyled">
                {
                  comments ? (
                    Object.keys(comments).map((comment) => 
                        <Comment key={comments[comment].commentId} text={comments[comment].text} userId={comments[comment].userId} displayName={comments[comment].displayName} />
                        )
                    ) : (
                      ""
                    )
                }
              </ul>
            </div>
            <div className="div-form-comment">
              <hr className="hl" />
              <form className="form-comment">
                <textarea id={`textareaComment${id}`} className="textarea-comment" rows={1} placeholder="Escribe un comentario..." defaultValue={""} /><i onClick={this.handleSendComment} className="material-icons send">send</i> {/* 5 lineas max */}
                {/* <button type="submit"><i class="fa fa-arrow-right icon-comment"></i></button> */}
                {/* <button type="submit"><img alt="" src="img/send.svg" /></button> */}
              </form>
            </div>
          </div>
          {/* <Aos/> */}
        </article>
        //</div>
      );
    }
  }
  
  export default Newsfeed;