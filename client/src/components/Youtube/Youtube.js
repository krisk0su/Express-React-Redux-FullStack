import React, { Component } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import { connect } from "react-redux";
import { setSongsNull } from "../../actions/youtubeAction";
import "./VideoItem.css";
class Youtube extends Component {
  componentDidMount() {
    this.props.setSongsNull();
  }
  render() {
    const { video } = this.props;
    return (
      <div className="ui container">
        <SearchBar />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              {video && <VideoDetail video={video} />}
            </div>
            <div className="five wide column">{<VideoList />}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapsStateToProps = state => ({
  video: state.youtube.currentSong
});
export default connect(mapsStateToProps, { setSongsNull })(Youtube);
