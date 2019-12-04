import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, likePost } from "../../actions/postAction";

import { Button, ButtonGroup } from "reactstrap";
class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      likedCss: "m-3 button button-like"
    };
  }
  componentDidMount() {
    this.props.getPost(this.state.id);
  }
  renderLike() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <button onClick={this.PostLike} className={this.state.likedCss}>
          <i className="fa fa-heart"></i>
          <span>Like</span>
        </button>
      );
    }
  }
  PostLike = e => {
    this.setState({ likedCss: "m-3 button button-like liked" });
    let post = {
      postId: this.props.currentPost._id,
      userId: this.props.auth.user._id
    };
    this.props.likePost(post);
  };
  renderButtons = () => {
    if (this.props.auth.user !== null) {
      const { user } = this.props.auth;
      const creatorId = this.props.currentPost.creator;

      //for some reason sometimes returns _id sometimes id ://
      if (user.id === creatorId || user._id === creatorId) {
        return (
          <div>
            <Button onClick={this.editPost} className="m-2" color="primary">
              Edit
            </Button>
            <Button onClick={this.deletePost} className="m-2" color="danger">
              Delete
            </Button>
          </div>
        );
      }
    }
  };
  deletePost = () => {
    console.log("delete");
  };
  editPost = () => {
    console.log("editing");
  };

  renderPost() {
    const { title, description, username } = this.props.currentPost;
    return (
      <div className="render-post">
        <h1>Title: {title}</h1>
        <p>{description}</p>
        <h3>Author: {username}</h3>
        {this.renderLike()}
        {this.renderButtons()}
      </div>
    );
  }
  render() {
    return <div>{this.renderPost()}</div>;
  }
}

const mapsStateToProps = state => ({
  currentPost: state.post.currentPost,
  auth: state.auth
});
export default connect(mapsStateToProps, { getPost, likePost })(PostDetails);
