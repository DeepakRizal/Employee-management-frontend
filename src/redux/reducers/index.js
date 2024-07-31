import { combineReducers } from "redux";

import authReducer from "./authReducers.js";
import employeeReducer from "./employeeReducers.js";
import dashboardReducer from "./dashboardReducer.js";

export default combineReducers({
  employeeList: employeeReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});
