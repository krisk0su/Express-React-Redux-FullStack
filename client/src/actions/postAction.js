import axios from "axios";
import { GET_POSTS, GET_POST, SET_POST_NULL } from "./types";
import { returnErrors } from "./errorAction";

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

export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPostToNull = () => dispatch => {
  dispatch({ type: SET_POST_NULL });
};
