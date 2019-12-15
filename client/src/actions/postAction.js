import axios from "axios";
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
  REMOVE_FILTERED_POSTS,
  COMMENT_POST
} from "../actions/types";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const createPost = post => (dispatch, getState) => {
  axios
    .post("/api/posts/", post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "CREATE_FAILED")
      )
    );
};
export const getFilteredPosts = data => dispatch => {
  dispatch({
    type: GET_FILTERED_POSTS,
    payload: data
  });
};
export const removeFilteredPosts = () => dispatch => {
  dispatch({
    type: REMOVE_FILTERED_POSTS
  });
};
export const getPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePost = (id, cb) => (dispatch, getState) => {
  axios.delete(`/api/posts/${id}`, tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    cb({ success: true });
  });
};
export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .then(res => getCreator(res.payload, dispatch))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editPost = post => (dispatch, getState) => {
  axios
    .patch("/api/posts", post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_POST,
        payload: res.data
      })
    )
    .then(res => getCreator(res.payload, dispatch))
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_FAILED")
      )
    );
};
const getCreator = ({ creator }, dispatch) => {
  axios.get(`/api/users/${creator}`).then(res =>
    dispatch({
      type: GET_CREATOR,
      payload: res.data
    })
  );
};

export const likePost = post => (dispatch, getState) => {
  axios
    .post("/api/posts/like", post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "LIKE_FAILED")
      )
    );
};
//Posting Comment
export const postComment = comment => (dispatch, getState) => {
  axios.post("/api/posts/comment", comment, tokenConfig(getState)).then(res =>
    dispatch({
      type: COMMENT_POST,
      payload: res.data.comments
    })
  );
};

export const setPostToNull = () => dispatch => {
  dispatch({ type: SET_POST_NULL });
};
