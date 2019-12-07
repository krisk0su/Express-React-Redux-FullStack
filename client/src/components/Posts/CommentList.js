import React from "react";
import Comment from "./Comment";
import { connect } from "react-redux";
import { ListGroup } from "reactstrap";

class CommentList extends React.Component {
  renderComments = () => {
    if (this.props.comments) {
      return this.props.comments.map(comment => {
        return (
          <Comment
            key={comment._id}
            comment={comment.comment}
            name={comment.commentatorName}
          />
        );
      });
    }
  };
  render() {
    return <ListGroup>{this.renderComments()}</ListGroup>;
  }
}

const mapsStateToProps = state => ({
  comments: state.post.currentPost.comments
});
export default connect(mapsStateToProps, null)(CommentList);
