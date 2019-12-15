import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemAction";
import { clearErrors } from "../actions/errorAction";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    price: 0,
    msg: null
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error != prevProps.error) {
      if (error.id && error.id === "ITEM_FAILED") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const { name, price } = this.state;
    const { _id: creator, username } = this.props.user;
    const newItem = {
      name,
      price,
      username,
      creator
    };

    this.props.addItem(newItem, cb => {
      if (cb.success) {
        this.toggle();
      }
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {this.props.isAuthenticated && (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            {this.state.msg && <Alert color="danger">{this.state.msg}</Alert>}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Item name</Label>
                <Input
                  className="m-2"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter item Name"
                  onChange={this.onChange}
                />
                <Label for="name">Item price</Label>
                <Input
                  className="m-2"
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter item Price"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user
});
export default connect(mapStateToProps, { addItem, clearErrors })(ItemModal);
