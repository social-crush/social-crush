import React, { Component } from 'react';
// import firebase from 'firebase';
import _ from 'lodash';

// Components
import Header from '../header/Header';
import Newsfeed from '../newsfeed/NewsFeed';

import './profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showPost: true,
          posts: null,
          postsToMe: null,
          friendUid: null,
          isVisited: false,
          visitedCount: null,
          nextProps: false,
        //   currentUserUid: null,
        //   followers: null,
          user: {
            displayName: null,
            photoUrl: null,
            username: null,
            email: null,
            name: null,
            lastname: null,
            visitedCount: null,
            uid: null
          }
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
        this.showPost = this.showPost.bind(this);
        this.showPostToMe = this.showPostToMe.bind(this);
        this.logout = this.logout.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.addOneMoreVisited = this.addOneMoreVisited.bind(this);
    }

    componentDidMount() {
        this.addBootstrap4();
        if(this.state.nextProps === false) {
            let uid = window.location.search;
            if(uid) {
                uid = uid.substring(1);
                this.loadUser(uid);
                this.loadPostsFriend(uid);
                this.setState({ friendUid: uid });
                if(this.state.isVisited === false) {
                    this.addOneMoreVisited(uid);
                }
            } else {
                // window.location.replace("/home");
            }
        }
    }

    componentWillReceiveProps(nextProps) {
    //   this.setState({ user: nextProps.user });
        this.setState({ nextProps: true });
        if(nextProps.currentUserUid) {
            this.setState({ currentUserUid: nextProps.currentUserUid });
        }
        
        if(nextProps.uid) {
            this.loadUser(nextProps.uid);
            this.loadPosts(nextProps.uid);
        } else {
            let uid = window.location.search;
            if(uid) { 
                uid = uid.substring(1);
                this.loadUser(uid);
                this.loadPostsFriend(uid);
                this.setState({ friendUid: uid });
                if(this.state.isVisited === false) {
                    this.addOneMoreVisited(uid);
                }
            } else {
                window.location.replace("/home");
            }
        }
    } 

    showPost = () => {
        this.setState({ showPost: true });
    }

    showPostToMe = () => {
        this.setState({ showPost: false });
    }

    loadUser = (uid) => {
        alert('Load User');
    }

    loadPostsFriend = (uid) => {
        alert('Load Posts Friend');
    }

    loadPosts = (uid) => {      
        alert('Load Posts');       
    }

    logout = () => {
        // firebase.auth().signOut();
        window.location.replace('/index');
    }

    addBootstrap4 = () => {
        var pre = document.createElement('pre');
        pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
        document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    addOneMoreVisited = (friendUid) => {
        friendUid = _.trim(friendUid);
        alert('Add One More Visited');
        this.setState({ isVisited: true });
    }
    
    render(){
        var posts = this.state.posts;
        var postsToMe = this.state.postsToMe;
        var friend = this.props.friend;
        var sesion = window.localStorage.getItem('sesion');
        sesion = (sesion === 'true') ? true : false;

        var displayName = this.state.user.displayName || 'Username';
        var photoUrl = this.state.user.photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0";
        var username = this.state.user.username ? `@${this.state.user.username}` : '@username';
        var currentUserUid = this.state.user.uid || 'null';
        var currentUserDisplayName = this.state.user.displayName || '';

        return(
        <div className="Profile"> 
            <Header />
                <div className="pf">
                    <div className="foto">
                        <img src={photoUrl} alt={displayName} />
                    </div>
                    <section className="informacion ">
                        <div className="datos-conf">
                            <div className="nombre-usuario">
                                <h2>{displayName}</h2>
                                <p>{username}</p>
                            </div>
                            {   friend ? (
                                        ""
                                ) : (
                                <div className="editar">
                                    <div><a className="btn-editar-op" href="/edit_profile">Editar Perfil</a></div>
                                        <div className="btnOp-salir">
                                            <button
                                                onClick={this.logout}
                                                className="btn-s"
                                                data-toggle="tooltip"
                                                data-placement="bottom" 
                                                title="Cerrar sesión"
                                                data-trigger="hover">
                                                {/* <i className="fas fa-sign-out-alt iconFontAwesome"></i> */}
                                                <i className="fas fa-power-off iconFontAwesome"></i>
                                                {/* <img src="https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2FbtnOptions.png?alt=media&token=e11bac00-b675-4283-a726-4b145df53e64"/> */}
                                            </button>
                                        </div> 
                                </div>
                                )
                            }
                        </div>
                        <div className="estadisticas">
                            <div className="seguidos">
                                <p>Vistas</p>
                                <h5>{this.state.visitedCount || '0'}</h5>
                            </div>
                            <div className="realizados">
                                <p>Publicaciones</p>
                                <h5>{this.state.user.postCount || '0'}</h5>
                            </div>
                            <div className="privado">
                                <p>Privados</p>
                                <h5>{this.state.user.postToMeCount || '0'}</h5>
                            </div>
                        </div>
                    </section>
                </div>
            <div className="content-de">
                <div className="public-private">
                    <div className="declarations">
                        <p className="grow" onClick={this.showPost}>Publicaciones</p>
                    </div>
                    <div className="declarations">
                        <p className="grow" onClick={this.showPostToMe}>Declaraciones</p>
                    </div>
                </div>
                <div>
                    <div className="w3-animate-opacity ">
                    {   this.state.showPost ? (
                            posts ? ( 
                                Object.keys(posts).map((post) => <Newsfeed key={post} id={post} data={posts[post]} currentUserUid={currentUserUid} currentUserDisplayName={currentUserDisplayName} />).reverse() 
                            ) : ( "No hay publicaciones" )
                        ) : (
                            postsToMe ? ( 
                                Object.keys(postsToMe).map((post) => <Newsfeed key={post} id={post} data={postsToMe[post]} currentUserUid={currentUserUid} currentUserDisplayName={currentUserDisplayName} />).reverse() 
                            ) : ( "No hay declaraciones" )
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}