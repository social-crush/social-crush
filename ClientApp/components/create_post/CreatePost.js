import React, { Component } from 'react';
// import firebase from 'firebase';
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
      // var searchUser = document.getElementById('search-user-post');
      // var dataVal = searchUser.getAttribute("data-content");

      // var newData = '¡No hay resultados!';
      // var searchText = _.trim(searchUser.value);

      // if(!_.isEmpty(searchText)) {
      //   this.setState({ showResult: true });

        // alert('Handle Search User');
      //   console.log(searchText);

      // } else {
      //     newData = '¡No hay resultados!';
      //     this.setState({ newData });
      // }
      
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
      // var isPublicCheck = document.getElementById('isPublicCheck');
      // var isAnonimousCheck = document.getElementById('isAnonimousCheck');
      var imageFile = document.getElementById('inputfile');
      textDeclaration = textDeclaration.value;
      // isPublicCheck = isPublicCheck.checked;
      // isAnonimousCheck = isAnonimousCheck.checked;
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
        // isPublic: isPublicCheck,
        // isAnonimous: isAnonimousCheck,
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

      alert('Submit New Post');

      this.clearForm();
    }

    increasePostCount = (fromUid, toUid) => {
      alert('IncreasePostCount');
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
        
        alert('GetUserDataFromSearch');
        
      }
    }

    clearForm = () => {
      // var searchUserPost = document.getElementById('search-user-post');
      var textDeclaration = document.getElementById('textDeclaration');
      // var isPublicCheck = document.getElementById('isPublicCheck');
      // var isAnonimousCheck = document.getElementById('isAnonimousCheck');
      var imageFile = document.getElementById('inputfile');
      // searchUserPost.value = '';
      textDeclaration.value = '';
      // isPublicCheck.checked = false;
      // isAnonimousCheck.checked = false;
      imageFile.value = '';
      // imageView.innerHTML = '';
      this.setState({ imageFile: null });
      this.setState({ newPost: {toUsername: null, toDiplayName: null, toUid: null} });
    }
    
    render() {
      var newData = this.state.newData;
      
      return (
        <div>
          <div className="CreatePost" style={{width: '100%', marginBottom: 30}}>
            <div className="card publicacion-amor">
              <div className="card-body">
                <label>Hacer Publicación</label>
              </div>
              <div className="form-group">
                <textarea id="textDeclaration" className="form-control text" placeholder="¿Qué quieres compartir?" defaultValue={""} />
               
              </div>
              {this.state.imageFile ? <div id="imageView"></div> : ""}
              <div className="publicar">
                <div><div id="divinputfile" className="botons upload"><input type="file" onChange={this.handleUploadImage} id="inputfile" className="inputfile" accept="image/png, image/jpeg" />Subir foto</div></div>
                <div><button onClick={this.handleNewPost} className="botons public">Publicar</button></div>
              </div>
            </div>
          </div>
          { this.state.showResult ? (
              <ResultWidget users={newData || '¡No hay resultados!'} metadata={"Metadata"} setUserDataPost={this.getUserDataFromSearch.bind(this)} />
            ) : ( "" ) 
          }
        </div>
      )
    }
}

export default CreatePost;
