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
import { createPost } from "../../actions/postAction";
import { clearErrors } from "../../actions/errorAction";

class CreatePostModal extends Component {
  state = {
    modal: false,
    title: "",
    description: "",
    msg: null
  };

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error != prevProps.error) {
      if (error.id && error.id === "CREATE_FAILED") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      description: this.state.description,
      creator: this.props.user._id
    };

    this.props.createPost(newPost);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Create Post
          </Button>
        ) : null}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Post</ModalHeader>
          <ModalBody>
            {this.state.msg && <Alert color="danger">{this.state.msg}</Alert>}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  placeholder="Edit Title"
                  onChange={this.onChange}
                />
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={this.state.description}
                  placeholder="Edit description"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Create post
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
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, { createPost, clearErrors })(
  CreatePostModal
);
