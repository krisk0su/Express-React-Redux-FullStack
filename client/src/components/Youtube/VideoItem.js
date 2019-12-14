import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSong } from "../../actions/youtubeAction";
import "./VideoItem.css";
class VideoItem extends Component {
  onClick = e => {
    const id = this.props.video.id.videoId;
    this.props.selectSong(this.props.video);
  };
  render() {
    const { video } = this.props;
    return (
      <div className="video-item item m-2" onClick={this.onClick}>
        <img
          className="ui image"
          alt={video.snippet.title}
          src={video.snippet.thumbnails.medium.url}
        />
        <div className="content">
          <div className="header"> {video.snippet.title}</div>
        </div>
      </div>
    );
  }
}

export default connect(null, { selectSong })(VideoItem);
