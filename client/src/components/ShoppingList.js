import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemAction";
import PropTypes from "prop-types";
import ItemModal from "./ItemModal";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getItems();
  }
  deleteEntity = id => {
    this.props.deleteItem(id);
  };
  renderAuth = (id, creator) => {
    if (this.props.user) {
      if (this.props.user._id === creator) {
        return (
          <Button
            className="remove-btn"
            color="danger"
            size="sm"
            onClick={this.deleteEntity.bind(this, id)}
          >
            Delete Item &times;
          </Button>
        );
      }
    }
  };
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ItemModal />
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, price, username, creator }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem className="m-2">
                  {this.renderAuth(_id, creator)}
                  <h2>Item name: - {name}</h2>
                  <h2>Item Price: - {price}$</h2>
                  <h2>Seller Name: - {username}</h2>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  user: state.auth.user
});
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
