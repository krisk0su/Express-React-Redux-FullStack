import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/postAction";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
  }
  componentDidMount() {
    this.props.getPost(this.state.id);
  }

  render() {
    const { id } = this.state;
    return <div>Hello from post {id}</div>;
  }
}

const mapsStateToProps = state => ({
  currentPost: state.post.currentPost
});
export default connect(mapsStateToProps, { getPost })(PostDetails);
