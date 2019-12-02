import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  SET_POST_NULL,
  GET_CREATOR
} from "../actions/types";
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
// export const getCreator = id => dispatch => {
//   axios.get(`/api/users/${id}`).then(res =>
//     dispatch({
//       type: GET_CREATOR,
//       payload: res.data
//     })
//   );
// };

export const setPostToNull = () => dispatch => {
  dispatch({ type: SET_POST_NULL });
};
