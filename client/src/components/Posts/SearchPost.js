import React from "react";
import { connect } from "react-redux";
import { Form, Label, Input, FormGroup } from "reactstrap";
import {
  getFilteredPosts,
  removeFilteredPosts
} from "../../actions/postAction";
class SearchPost extends React.Component {
  state = { search: "" };

  onFormSubmit = event => {
    event.preventDefault();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    const searchValue = e.target.value.toLowerCase();

    if (searchValue !== "") {
      const data = {
        searchActivated: true,
        filteredPosts: []
      };
      const doesMatch = this.props.posts.some(
        post =>
          post.title.toLowerCase().includes(searchValue) ||
          post.title.toLowerCase() == searchValue
      );
      //if found matches send them
      if (doesMatch) {
        const res = this.props.posts.filter(
          post =>
            post.title.toLowerCase().includes(searchValue) ||
            post.title.toLowerCase() == searchValue
        );
        data.filteredPosts = res;
        this.props.getFilteredPosts(data);
      } else {
        //if not send an empty array
        this.props.getFilteredPosts(data);
      }
    } else {
      this.props.removeFilteredPosts();
    }
  };
  render() {
    return (
      <div className="">
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup>
            <Label for="title">Search Bar</Label>
            <Input
              type="text"
              name="search"
              id="search"
              value={this.state.term}
              placeholder="Search for post"
              onChange={this.onChange}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.post.posts
});
export default connect(mapStateToProps, {
  getFilteredPosts,
  removeFilteredPosts
})(SearchPost);
