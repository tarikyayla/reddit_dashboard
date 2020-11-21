import * as actionTypes from "./actionTypes";
import alertify from "alertifyjs";

export const success = () => (dispatch) => {
  dispatch({
    type: actionTypes.SUCCESS_ALERT,
  });

  alertify.success("success");
};
