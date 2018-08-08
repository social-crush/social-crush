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
          user: {
            displayName: null,
            photoUrl: null,
            username: null,
            email: null,
            name: null,
            lastname: null,
            uid: null,
            visitedCount: null
          }
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.signOut = this.signOut.bind(this);
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
      // sesion = (sesion === 'true') ? true : false;
      sesion = true;
      var users = this.state.users || 'null';
      var currentUserUid = this.state.user.uid || '';
      
      return (
        <div className="Home">
            <Header />
            <div className="container main-content">
                <section className="">
                  <main className="main center-content">
                    <section> 
                      { sesion ? (<CreatePost uid={this.state.user.uid} photoUrl={this.state.user.photoUrl || 'https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0'} username={this.state.user.username} displayName={this.state.user.displayName} />) : ("") }
                      <div>
                        { posts ? ( 
                          Object.keys(posts).map((post) => <Newsfeed key={posts[post].newsFeedId} id={post} data={posts[post]} userId={posts[post].userId} />).reverse() 
                          ) : ( "" )
                        }
                      </div>
                    </section>
                  </main>
                </section>
                <UserSidebar postCount={this.state.user.postCount || '0'} postToMeCount={this.state.user.postToMeCount || '0'} visitedCount={this.state.user.visitedCount || '0'} photoUrl={this.state.user.photoUrl} displayName={this.state.user.displayName} username={this.state.user.username} />
              
              {/* <ChatSidebar users={users} openChat={this.openChat.bind(this)} currentUserUid={currentUserUid} /> */}
              {/* { sesion ? (<ChatWidget chatId={this.state.chatId || ''} messages={this.state.messages || ''} currentUserUid={this.state.user.uid} />) : ("") } */}
            </div>
            <Footer />
        </div>
      );
    
    }
  }
  
export default Home;
  