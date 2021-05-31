import { combineReducers } from "redux";

import chatroom from "./chatroom";
import user from "./user";
// this is where all reducers meet
const rootReducer = combineReducers({
  chatroom,
  user,
});

export default rootReducer;
