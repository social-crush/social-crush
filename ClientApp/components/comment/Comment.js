import React, { Component } from 'react';

class Comment extends Component {
    // state = { user: { userId: null, name: 'Username', lastname: ''} };

    componentDidMount() {
        // var newsFeedId = this.props.newsFeedId;
        // if(newsFeedId) {
        //     fetch(`api/User/GetUserById/${newsFeedId}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({ user: data });
        //     })
        //     .catch(e => console.log(e));
        // }
    }

    render() {
        return (
            <li className=""> 
                {/* <a href={`profile?id=${this.state.props.userId}`} >{`${this.state.user.name} ${this.state.user.lastname}`}</a><span>{this.props.text}</span> */}
                <a href={`profile?id=${this.state.props.userId}`} >{this.props.displayName}</a><span>{this.props.text}</span>
            </li>
        );
    }

}


export default Comment;