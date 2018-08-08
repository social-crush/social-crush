import React, { Component } from 'react';
// import firebase from 'firebase';

// Components
import Header from '../header/Header';
import UserSidebar from '../user_sidebar/UserSidebar';
import CreatePost from '../create_post/CreatePost';
import Newsfeed from '../newsfeed/NewsFeed';
import ChatSidebar from '../chat_sidebar/ChatSidebar';
// import ChatWidget from '../chat_widget/ChatWidget';
import Footer from '../footer/Footer';

// Assets
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chatId: null,
          users: null,
          posts: null,
          userId: null,
          user: {
            userId: null,
            photoUrl: null,
            username: null,
            email: null,
            name: null,
            lastname: null
          }
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
      var sesion = window.localStorage.getItem("sesion");
      var userId = window.localStorage.getItem("userId");
      if(sesion === 'true' && userId !== '') {
        this.setState({ userId });
        fetch(`api/User/GetUserById/${userId}`)
        .then(res => res.json())
        .then(data => {
            // this.setState({ user: data });
            // console.log(data);
            this.setState({ user: data });
        })
        .catch(e => {
          console.log(e);
        });
      } else {
        window.localStorage.setItem("sesion", 'false');
        window.localStorage.setItem("userId", '');
        window.location.replace("/home");
      }
    }

    componentDidMount() {
      this.addBootstrap4();
        
      fetch("api/NewsFeed/GetAllNewsFeeds")
      .then(res => res.json())
      .then(data => {
          this.setState({ posts: data });
      })
      .catch(e => console.log(e));
    }

    openChat = (id) => {
      // console.log(id);
    }

    signOut = () => {
        // firebase.auth().signOut();
        alert('Sesion Cerrada');
    }

    addBootstrap4 = () => {
        var pre = document.createElement('pre');
        pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
        document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    render() {
      var posts = this.state.posts;
      var sesion = window.localStorage.getItem('sesion');
      sesion = (sesion === 'true') ? true : false;
      var users = this.state.users || 'null';
      var currentUserUid = this.state.user.uid || '';
      
      return (
        <div className="Home">
            <Header />
            <div className="container main-content">
                <section className="">
                  <main className="main center-content">
                    <section> 
                      { sesion ? (<CreatePost userId={this.state.userId} />) : ("") }
                      <div>
                        { posts ? ( 
                          Object.keys(posts).map((post) => <Newsfeed key={posts[post].newsFeedId} id={post} data={posts[post]} newsFeedId={posts[post].newsFeedId} userId={posts[post].userId} currentUserId={this.state.userId} displayName={`${this.state.user.name} ${this.state.user.lastname}`} />).reverse() 
                          ) : ( "" )
                        }
                      </div>
                    </section>
                  </main>
                </section>
                <UserSidebar userId={this.state.userId} postCount={this.state.user.postCount || '0'} displayName={`${this.state.user.name} ${this.state.user.lastname}`} photoUrl={this.state.user.photoUrl} email={this.state.user.email} />
              
              {/* <ChatSidebar users={users} openChat={this.openChat.bind(this)} currentUserUid={currentUserUid} /> */}
              {/* { sesion ? (<ChatWidget chatId={this.state.chatId || ''} messages={this.state.messages || ''} currentUserUid={this.state.user.uid} />) : ("") } */}
            </div>
            <Footer />
        </div>
      );
    
    }
  }
  
export default Home;
  