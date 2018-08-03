import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import ResultWidget from '../../components/result_widget/ResultWidget';

// Assets
import './createpost.css'; 

class CreatePost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newData: null,
        showResult: false,
        isSignedIn: false,
        users: null,
        imageFile: null,
        newPost: {
          toUsername: null,
          toDiplayName: null,
          toUid: null
        }
      }
      this.handleSearchUserPost = this.handleSearchUserPost.bind(this);
      this.handleNewPost = this.handleNewPost.bind(this);
      this.handleUploadImage = this.handleUploadImage.bind(this);
      this.submitNewPost = this.submitNewPost.bind(this);
      this.setPositionInputFile = this.setPositionInputFile.bind(this);
      this.handleOnBurPost = this.handleOnBurPost.bind(this);
      this.handleOnFocusPost = this.handleOnFocusPost.bind(this);
      this.clearForm = this.clearForm.bind(this);
      this.increasePostCount = this.increasePostCount.bind(this);
      
      // this.getUserDataFromSearch = this.getUserDataFromSearch.bind(this);
    }
  
    componentDidMount() {
      //  console.log(this.state.newPost);
      //  console.log(this.state.newPost.toUid);
      //  console.log(this.state.newPost['toUid']);
    }

    setPositionInputFile = () => {
      var elemento = document.getElementById('divinputfile');
      var posicion = elemento.getBoundingClientRect();
      
      var inputfile = document.getElementById('inputfile');
      inputfile.style.top = posicion.top;
      inputfile.style.left = posicion.left;

      console.log(posicion.top, posicion.right, posicion.bottom, posicion.left);
    }

    handleSearchUserPost = () => {
      var searchUser = document.getElementById('search-user-post');
      // var dataVal = searchUser.getAttribute("data-content");

      var newData = '¡No hay resultados!';
      var searchText = _.trim(searchUser.value);

      if(!_.isEmpty(searchText)) {
        this.setState({ showResult: true });

        firebase.database().ref('/users/').orderByChild('displayName').once('value')
        .then(snapshot => {
          this.setState({users: snapshot.val()});

          if(snapshot.val()) {
            newData = snapshot.val();
            var users = {};
            for(var user in newData) {
                if(user !== this.state.uid && _.toLower(newData[user].displayName).search(_.toLower(searchText)) !== -1) {
                    users[user] = newData[user];
                }
            }

            if(Object.entries(users).length !== 0) {
                newData = users;
            } else {
                newData = '¡No hay resultados!';
            }
            this.setState({ newData });

            } else {
              newData = '¡No hay resultados!';
              this.setState({ newData });
            }
            
          })
          .catch(e => {
            console.log(`Code: ${e.code} Message: ${e.message}`);
          });
      } else {
          newData = '¡No hay resultados!';
          this.setState({ newData });
      }
      
      //searchUser.setAttribute("data-content", searchUser.value);
    }

    handleNewPost = () => {
      var toUser = this.state.newPost;
      var toDiplayName = toUser['toDiplayName'];
      var toUsername = toUser['toUsername'];
      var toUid = toUser['toUid'];

      var uid = this.props.uid;
      var displayName = this.props.displayName;
      var username = this.props.username;
      var photoUrl = this.props.photoUrl;
      var textDeclaration = document.getElementById('textDeclaration');
      var isPublicCheck = document.getElementById('isPublicCheck');
      var isAnonimousCheck = document.getElementById('isAnonimousCheck');
      var imageFile = document.getElementById('inputfile');
      textDeclaration = textDeclaration.value;
      isPublicCheck = isPublicCheck.checked;
      isAnonimousCheck = isAnonimousCheck.checked;
      imageFile = imageFile.value;
      
      var postData = {
        fromUid: uid,
        fromDisplayName: displayName, 
        fromUsername: username, 
        fromPhotoUrl: photoUrl,
        toUid: toUid,
        toUsername: toUsername,
        toDiplayName: toDiplayName,
        text: textDeclaration,
        isPublic: isPublicCheck,
        isAnonimous: isAnonimousCheck,
        imageUrl: null,
        timestamp: {
          day: new Date().getDate(),
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
          minute: new Date().getMinutes(),
          hour: new Date().getHours()
        }
      };

      if(!_.isEmpty(_.trim(textDeclaration))) {
        if((_.trim(textDeclaration)).length > 5) {
          if(toUid) {
            this.submitNewPost(postData, imageFile);
          } else {
            console.log('Debes elegir el destinatario.');
            alert('Debes elegir el destinatario.');
          }
        } else {
          console.log('La declaracion debe tener mas de 10 caracteres.');
          alert('La declaracion debe tener mas de 10 caracteres.');
        }
      } else {
        console.log('La declaracion es obligatoria.');
        alert('La declaracion es obligatoria.');
      }

    }

    submitNewPost = (postData, imageFile) => {
      var imageFileUploaded = document.getElementById('inputfile');
      imageFileUploaded = imageFileUploaded.files[0];

      var newPostKey = firebase.database().ref().child('posts').push().key;
      var updates = {};
    
      if(imageFile && imageFile.toString() !== '') {
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`images/post_image/${newPostKey}/${imageFileUploaded.name}`).put(imageFileUploaded);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          console.log(error);
        }, () => {
        // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            postData.imageUrl = downloadURL;
            if(postData.isPublic) {
              updates[`/posts/${newPostKey}`] = postData;
            }
            updates[`/users/${postData.fromUid}/posts/${newPostKey}`] = postData;
            updates[`/users/${postData.toUid}/posts-to-me/${newPostKey}`] = postData;
            console.log(downloadURL);
            firebase.database().ref().update(updates);
          });
        });

      } else {
        if(postData.isPublic) {
          updates[`/posts/${newPostKey}`] = postData;
        }
        updates[`/users/${postData.fromUid}/posts/${newPostKey}`] = postData;
        updates[`/users/${postData.toUid}/posts-to-me/${newPostKey}`] = postData;
        firebase.database().ref().update(updates);
      }
      this.increasePostCount(postData.fromUid, postData.toUid);
      this.clearForm();
    }

    increasePostCount = (fromUid, toUid) => {
      var postCount = firebase.database().ref(`/users/${fromUid}/postCount`);
      var postToMeCount = firebase.database().ref(`/users/${toUid}/postToMeCount`);
      postCount.transaction(currentRank => {
        // If users/ada/rank has never been set, currentRank will be `null`.
        if(currentRank) {
          currentRank++;
        } else {
          currentRank = 1;
        }
        return currentRank;
      });

      postToMeCount.transaction(currentRank => {
        if(currentRank) {
          currentRank++;
        } else {
          currentRank = 1;
        }
        return currentRank;
      });
    }

    handleUploadImage = (evt) => {
      const files = evt.target.files;
      this.setState({ imageFile: files[0] });
      
      for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
          continue;
        }
    
        var reader = new FileReader();
    
        reader.onload = (theFile => {
        return e => { 
          document.getElementById("imageView").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
        };
        })(f);
    
        reader.readAsDataURL(f);
      }
    }

    handleOnNoFocus = () => {
      this.setState({showResult: false});
    }

    handleOnBurPost = () => {
      setTimeout(this.handleOnNoFocus.bind(this), 300);
    }

    handleOnFocusPost = () => {
        if(this.state.newData) {
            this.setState({showResult: true});
        }
    }
    
    getUserDataFromSearch = (val) => {
      if(val) {
        firebase.database().ref(`/users/${val}`).once('value')
        .then(snapshot => {

          if(snapshot.val()) {
            var user = snapshot.val();
            document.getElementById('search-user-post').value = user.displayName;
            this.setState({ newPost: { toUsername: user.username, toDiplayName: user.displayName, toUid: user.uid} });         
          }  
          
        })
        .catch(e => {
          console.log(`Code: ${e.code} Message: ${e.message}`);
        });
      }
    }

    clearForm = () => {
      var searchUserPost = document.getElementById('search-user-post');
      var textDeclaration = document.getElementById('textDeclaration');
      var isPublicCheck = document.getElementById('isPublicCheck');
      var isAnonimousCheck = document.getElementById('isAnonimousCheck');
      var imageFile = document.getElementById('inputfile');
      searchUserPost.value = '';
      textDeclaration.value = '';
      isPublicCheck.checked = false;
      isAnonimousCheck.checked = false;
      imageFile.value = '';
      // imageView.innerHTML = '';
      this.setState({ imageFile: null });
      this.setState({ newPost: {toUsername: null, toDiplayName: null, toUid: null} });
    }
    
    render() {
      return (
        <div>
          <div className="CreatePost" style={{width: '100%', margin: '0 auto', marginBottom: 30}}>
            <div className="card publicacion-amor">
              <div className="card-body">
                <label>Hacer Confesion</label>
              </div>
              <div className="destinatario">
                <div className="tema"><h6>Para</h6></div>
                <div className="destino"><input id="search-user-post" onChange={this.handleSearchUserPost} type="text" className="" autoComplete="off" onFocus={this.handleOnFocusPost} onBlur={this.handleOnBurPost} /></div>
              </div>
              <div className="form-group">
                <textarea id="textDeclaration" className="form-control text" placeholder="Declaración..." defaultValue={""} />
                <div className="form-check">
                  <input type="checkbox" className="check" id="isPublicCheck"/>
                  <label className="form-check-label" htmlFor="isPublicCheck">Público</label>
                  <input type="checkbox" className="check" id="isAnonimousCheck"/>
                  <label className="form-check-label" htmlFor="isAnonimousCheck">Anónimo</label>
                </div>
              </div>
              {this.state.imageFile ? <div id="imageView"></div> : ""}
              <div className="publicar">
                <div><div id="divinputfile" className="botons upload"><input type="file" onChange={this.handleUploadImage} id="inputfile" className="inputfile" accept="image/png, image/jpeg" />Subir foto</div></div>
                <div><button onClick={this.handleNewPost} className="botons public">Publicar</button></div>
              </div>
            </div>
          </div>
          { this.state.showResult ? (
              <ResultWidget users={this.state.newData || '¡No hay resultados!'} metadata={"Metadata"} setUserDataPost={this.getUserDataFromSearch.bind(this)} />
            ) : ( "" ) 
          }
        </div>
      )
    }
}

export default CreatePost;
