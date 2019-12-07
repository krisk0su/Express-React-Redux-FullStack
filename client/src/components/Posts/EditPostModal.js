import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { editPost } from "../../actions/postAction";

class EditPostModal extends Component {
  state = {
    modal: false,
    title: "",
    description: ""
  };
  componentDidMount() {
    const { title, description } = this.props.currentPost;

    this.setState({ title, description });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      id: this.props.currentPost._id,
      title: this.state.title,
      description: this.state.description
    };

    this.props.editPost(newPost);
    this.toggle();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Button color="dark" className="m-3" onClick={this.toggle}>
            Edit Post
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please Login To Manage Items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Post</ModalHeader>
          <ModalBody>
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
                  Edit Post
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentPost: state.post.currentPost
});

export default connect(mapStateToProps, { editPost })(EditPostModal);
