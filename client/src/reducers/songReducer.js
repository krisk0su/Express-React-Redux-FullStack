import { GET_SONGS, SELECT_SONG } from "../actions/types";

const initialState = {
  playlist: [],
  currentSong: null,
  searching: false,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        playlist: action.payload,
        searching: true,
        loading: false
      };
    case SELECT_SONG:
      return {
        ...state,
        currentSong: { ...action.payload },
        loading: false
      };
    default:
      return state;
  }
}
