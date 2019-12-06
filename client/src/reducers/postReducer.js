import {
  GET_POSTS,
  GET_POST,
  SET_POST_NULL,
  GET_CREATOR,
  LIKE_POST,
  DELETE_POST,
  EDIT_POST,
  CREATE_POST,
  GET_FILTERED_POSTS,
  REMOVE_FILTERED_POSTS
} from "../actions/types";

const initialState = {
  posts: [],
  filteredPosts: [],
  currentPost: {},
  searchActivated: false,
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
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false
      };
    case GET_POST:
    case EDIT_POST:
      return {
        ...state,
        currentPost: { ...action.payload },
        loading: false
      };
    case GET_FILTERED_POSTS:
      return {
        ...state,
        filteredPosts: [...action.payload.filteredPosts],
        searchActivated: action.payload.searchActivated,
        loading: false
      };
    case REMOVE_FILTERED_POSTS:
      return {
        ...state,
        filteredPosts: [],
        searchActivated: false,
        loading: false
      };
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload.id),
        loading: false
      };
    }
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
        currentPost: { ...state.currentPost, ...action.payload },
        loading: false
      };
    default:
      return state;
  }
}
