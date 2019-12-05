import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  SET_POST_NULL,
  GET_CREATOR,
  LIKE_POST,
  DELETE_POST,
  EDIT_POST
} from "../actions/types";
import { tokenConfig } from "./authAction";
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
//sending history object from component and firing it after dispatching the delete_post reducer
export const deletePost = (id, history) => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .then(res => history.push("/api/posts"));
};
export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    ) //getting ceator of the post using post.creator
    .then(res =>
      axios.get(`/api/users/${res.payload.creator}`).then(ress =>
        dispatch({
          type: GET_CREATOR,
          payload: ress.data
        })
      )
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editPost = post => (dispatch, getState) => {
  axios.patch("/api/posts", post).then(res =>
    dispatch({
      type: EDIT_POST,
      payload: res.data
    })
  );
};
export const likePost = post => (dispatch, getState) => {
  axios
    .post("/api/posts/like", post)
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

export const setPostToNull = () => dispatch => {
  dispatch({ type: SET_POST_NULL });
};
