import React, { Component } from "react";
import VideoItem from "./VideoItem";
import { connect } from "react-redux";

import "./VideoItem.css";
class VideoList extends Component {
  renderVideo = () => {
    return this.props.playlist.map(video => {
      return <VideoItem key={video.id.videoId} video={video} />;
    });
  };
  render() {
    return <div>{this.renderVideo()}</div>;
  }
}

const mapsStateToProps = state => ({
  playlist: state.youtube.playlist,
  searching: state.youtube.searching
});
export default connect(mapsStateToProps, null)(VideoList);
