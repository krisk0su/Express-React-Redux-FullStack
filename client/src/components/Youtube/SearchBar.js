import React, { Component } from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { getSongs } from "../../actions/youtubeAction";

class SearchBar extends Component {
  state = {
    songName: ""
  };
  onSongSubmit = e => {
    e.preventDefault();
    const { songName } = this.state;
    this.props.getSongs(songName);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="">
        <Form onSubmit={this.onSongSubmit}>
          <FormGroup>
            <Label for="songName">Search Bar</Label>
            <div className="input-group">
              <Input
                className="form-control"
                type="text"
                name="songName"
                id="songName"
                value={this.state.songName}
                placeholder="Search for song"
                onChange={this.onChange}
              />
              <Button>Search for song...</Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect(null, { getSongs })(SearchBar);
