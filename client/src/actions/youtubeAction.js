import axios from "axios";
import { returnErrors } from "./errorAction";
import youtube, { baseParams } from "../api/youtube";
import { GET_SONGS, SELECT_SONG } from "./types";

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

export const selectSong = video => dispatch => {
  dispatch({
    type: SELECT_SONG,
    payload: video
  });
};
