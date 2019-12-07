import React, { Component } from "react";
import { connect } from "react-redux";
import CommentList from "./CommentList";
import {
  getPost,
  likePost,
  deletePost,
  postComment
} from "../../actions/postAction";
import { clearErrors } from "../../actions/errorAction";
import { Button, Alert, Form, FormGroup, Label, Input } from "reactstrap";
import EditPostModal from "./EditPostModal";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      likedCss: "m-3 button button-like",
      msg: null,
      comment: ""
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
          <Button onClick={this.deletePost} className="m-3" color="danger">
            Delete
          </Button>
        );
      }
    }
  };
  deletePost = () => {
    const { _id } = this.props.currentPost;
    this.props.deletePost(_id, cb => {
      if (cb.success) {
        this.props.history.push("/api/posts/");
      }
    });
  };
  renderEdit = username => {
    const { user } = this.props.auth;
    if (user && user.username === username) {
      return <EditPostModal />;
    }
  };
  onCommentSubmit = e => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const postId = this.props.currentPost._id;
    const commentatorId = this.props.auth.user._id;
    const commentatorName = this.props.auth.user.username;

    const newComment = {
      comment,
      postId,
      commentatorId,
      commentatorName
    };

    this.props.postComment(newComment);
    this.setState({ comment: "" });
  };
  onCommentChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { title, description, username, likes } = this.props.currentPost;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <h1>Title: {title}</h1>
        <p>{description}</p>
        <h3>Author: {username}</h3>
        <h2>Likes: {likes}</h2>
        {this.state.msg && <Alert color="danger">{this.state.msg}</Alert>}
        {isAuthenticated && (
          <button onClick={this.PostLike} className={this.state.likedCss}>
            <i className="fa fa-heart"></i>
            <span>Like</span>
          </button>
        )}
        {this.renderEdit(username)}
        {this.renderDelete()}
        <CommentList />
        {isAuthenticated && (
          <Form onSubmit={this.onCommentSubmit} className="m-2">
            <FormGroup>
              <Label for="comment-area">Comment Area</Label>
              <Input
                type="textarea"
                name="comment"
                id="comment"
                value={this.state.comment}
                onChange={this.onCommentChange}
              />
              <Button color="success" className="m-1">
                Submit Comment
              </Button>
            </FormGroup>
          </Form>
        )}
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
  postComment,
  clearErrors
})(PostDetails);
