import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, likePost, deletePost } from "../../actions/postAction";
import { clearErrors } from "../../actions/errorAction";
import { Button, ButtonGroup, Alert } from "reactstrap";
import EditPostModal from "./EditPostModal";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      likedCss: "m-3 button button-like",
      msg: null
    };
  }
  componentDidMount() {
    this.props.clearErrors();
    this.props.getPost(this.state.id);
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error != prevProps.error) {
      if (error.id && error.id === "LIKE_FAILED") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  PostLike = e => {
    let post = {
      postId: this.props.currentPost._id,
      userId: this.props.auth.user._id
    };
    this.props.likePost(post);
    this.setState({ likedCss: "m-3 button button-like liked" });
  };
  renderDelete = () => {
    if (this.props.auth.user !== null) {
      const { user } = this.props.auth;
      const creatorId = this.props.currentPost.creator;

      //for some reason sometimes returns _id sometimes id ://
      if (user.id === creatorId || user._id === creatorId) {
        return (
          <div>
            <Button onClick={this.deletePost} className="m-2" color="danger">
              Delete
            </Button>
          </div>
        );
      }
    }
  };
  deletePost = () => {
    const { _id } = this.props.currentPost;
    this.props.deletePost(_id, this.props.history);
  };
  editPost = () => {
    console.log("editing");
  };
  renderLike = username => {
    const { user } = this.props.auth;
    if (user && user.username === username) {
      return <EditPostModal />;
    }
  };
  render() {
    const { title, description, username, likes } = this.props.currentPost;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <h1>Title: {title}</h1>
        <p>{description}</p>
        <h3>Author: {username}</h3>
        <h2>Likes: {likes}</h2>
        {isAuthenticated ? (
          <button onClick={this.PostLike} className={this.state.likedCss}>
            <i className="fa fa-heart"></i>
            <span>Like</span>
          </button>
        ) : null}
        {this.renderLike(username)}
        {this.renderDelete()}
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  currentPost: state.post.currentPost,
  auth: state.auth,
  error: state.error
});
export default connect(mapsStateToProps, {
  getPost,
  likePost,
  deletePost,
  clearErrors
})(PostDetails);
