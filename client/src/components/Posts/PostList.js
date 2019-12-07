import React, { Component } from "react";
import CreatePostModal from "./CreatePostModal";
import SearchPost from "./SearchPost";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts, setPostToNull } from "../../actions/postAction";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  CardTitle,
  CardText,
  Card,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";

class PostList extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.setPostToNull();
    this.props.getPosts();
  }
  choosePosts(name) {
    return this.props.post[name].map(pst => {
      const { title, description, _id } = pst;

      return (
        <Col sm="6" className="mb-5" key={_id}>
          <Card>
            <CardTitle className="text-center">{title}</CardTitle>
            <CardText className="pl-2">
              {description.substring(0, 120) + "..."}
            </CardText>
            <Button tag={Link} to={`/api/posts/${_id}`}>
              Read More
            </Button>
          </Card>
        </Col>
      );
    });
  }
  renderPosts() {
    const filteredPosts = "filteredPosts";
    const posts = "posts";
    const { searchActivated } = this.props.post;

    if (searchActivated) {
      return this.choosePosts(filteredPosts);
    } else {
      return this.choosePosts(posts);
    }
  }

  render() {
    return (
      <Container>
        <SearchPost />
        <CreatePostModal />
        <Row>{this.renderPosts()}</Row>
      </Container>
    );
  }
}

const mapsStateToProps = state => ({
  post: state.post
});
export default connect(mapsStateToProps, {
  getPosts,
  setPostToNull
})(PostList);
