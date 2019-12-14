import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import songReducer from "./songReducer";

export default combineReducers({
  item: itemReducer,
  post: postReducer,
  error: errorReducer,
  auth: authReducer,
  youtube: songReducer
});
