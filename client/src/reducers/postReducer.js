import {
  GET_POSTS,
  GET_POST,
  SET_POST_NULL,
  GET_CREATOR,
  LIKE_POST
} from "../actions/types";

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
        currentPost: { ...action.payload },
        loading: false
      };
    case SET_POST_NULL:
      return {
        ...state,
        currentPost: {},
        loading: false
      };
    case GET_CREATOR:
      return {
        ...state,
        currentPost: { ...state.currentPost, ...action.payload },
        loading: false
      };
    case LIKE_POST:
      return {
        ...state,
        currentPost: { ...action.payload },
        loading: false
      };
    default:
      return state;
  }
}
