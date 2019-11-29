import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postAction";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts } = this.props.post;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {posts.map(({ _id, title }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>{title}</ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapsStateToProps = state => ({
  post: state.post
});
export default connect(mapsStateToProps, { getPosts })(PostList);
