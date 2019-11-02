import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Type from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";

export const register = (newUser, history) => async dispatch => {
  try {
    const res = await axios.post("/api/users/register", newUser);
    history.push("/login");
  } catch (error) {
    dispatch({
      type: Type.USERS_ERROR,
      payload: error.response.data
    });
  }
};

export const login = (user, history) => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", user);

    let token = res.data.token;
    localStorage.setItem("jwt_token", token);
    setAuthToken(token);
    let decoded = jwtDecode(token);

    dispatch({
      type: Type.SET_USER,
      payload: decoded
    });

    history.push("/");
  } catch (error) {
    dispatch({
      type: Type.USERS_ERROR,
      payload: error.response.data
    });
  }
};

export const logout = history => {
  localStorage.removeItem("jwt_token");
  history.push("/login");
  return {
    type: Type.SET_USER,
    payload: {}
  };
};
