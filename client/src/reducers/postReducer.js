import { GET_POSTS, GET_POST, SET_POST_NULL } from "../actions/types";

const initialState = {
  posts: [],
  currentPost: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        currentPost: action.payload,
        loading: false
      };
    case SET_POST_NULL:
      return {
        ...state,
        currentPost: {},
        loading: false
      };
    default:
      return state;
  }
}
