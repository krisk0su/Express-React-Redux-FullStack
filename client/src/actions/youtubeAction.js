import axios from "axios";
import { returnErrors } from "./errorAction";
import youtube, { baseParams } from "../api/youtube";
import { GET_SONGS, SELECT_SONG, SET_SONGS_NULL } from "./types";

export const getSongs = songName => dispatch => {
  youtube
    .get("/search", {
      params: {
        ...baseParams,
        q: songName
      }
    })
    .then(res =>
      dispatch({
        type: GET_SONGS,
        payload: res.data.items
      })
    );
};

export const setSongsNull = () => dispatch => {
  dispatch({
    type: SET_SONGS_NULL
  });
};
export const selectSong = video => dispatch => {
  dispatch({
    type: SELECT_SONG,
    payload: video
  });
};
