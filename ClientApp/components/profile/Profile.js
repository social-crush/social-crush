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
          isVisited: false,
          visitedCount: null,
          nextProps: false,
          user: {
            photoUrl: null,
            email: null,
            name: null,
            lastname: null,
            visitedCount: null,
            userId: null
          }
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
        this.logout = this.logout.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.addOneMoreVisited = this.addOneMoreVisited.bind(this);
    }

    componentDidMount() {
        this.addBootstrap4();

        let userId = window.location.search;
        if(userId) {
            userId = userId.substring(4);
            this.loadUser(userId);
            this.loadPosts(userId);
            if(this.state.isVisited === false) {
                this.addOneMoreVisited(userId);
            }
        } else {
            // window.location.replace("/home");
        }
    }

    loadUser = (userId) => {
        console.log(`Load User ${userId}`);
        if(userId) {
            fetch(`api/User/GetUserById/${userId}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({ user: data });
                    console.log(data);
                }).catch(e => console.log(e));
        }
    }

    loadPosts = (userId) => {      
        console.log(`Load Posts ${userId}`); 
        fetch(`api/NewsFeed/GetNewsFeedsByUserId/${userId}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ posts: data });
            })
            .catch(e => console.log(e));      
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

    addOneMoreVisited = (userId) => {
        userId = _.trim(userId);
        console.log(`Add One More Visited ${userId}`);
        this.setState({ isVisited: true });
    }
    
    render(){
        var posts = this.state.posts;
        var sesion = window.localStorage.getItem('sesion');
        sesion = (sesion === 'true') ? true : false;

        var displayName = `${this.state.user.name} ${this.state.user.lastname}` || 'Username';
        var email = this.state.user.email || '';
        var photoUrl = this.state.user.photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0";
        // var username = this.state.user.username ? `@${this.state.user.username}` : '@username';
        var currentUserId = this.state.user.uid || 'null';
        var currentUserDisplayName = `${this.state.user.name} ${this.state.user.lastname}` || '';

        var isCurrentUser = false;
        
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
                                {/* <p>{email}</p> */}
                            </div>
                            {   isCurrentUser ? (
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
                                ) : (
                                    ""
                                )
                            }
                        </div>
                        {/* <div className="estadisticas">
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
                        </div> */}
                    </section>
                </div>
            <div className="content-de">
                {/* <div className="public-private">
                    <div className="declarations">
                        <p className="grow" onClick={this.showPost}>Publicaciones</p>
                    </div>
                    <div className="declarations">
                        <p className="grow" onClick={this.showPostToMe}>Declaraciones</p>
                    </div>
                </div> */}
                <div>
                    <div className="w3-animate-opacity ">
                    { posts ? ( Object.keys(posts).map((post) => <Newsfeed key={posts[post].newsFeedId} id={post} data={posts[post]} userId={posts[post].userId} />).reverse() ) : ( "No hay publicaciones" ) }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}