import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  name: "",
  email: "",
  // token: "",
  id: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login(state, action) {
    //   state.isAuthenticated = true;
    //   state.name = action.payload.name;
    //   state.email = action.payload.email;
    //   state.token = action.payload.token;
    //   state.id = action.payload.id;
    // },
    register(state, action) {
      state.isAuthenticated = true;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;

      state.id = action.payload.data._id;
      // state.token = action.payload.token;
      state.message = "login sucessfull";
    },

    login(state, action) {
      state.isAuthenticated = true;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;

      state.id = action.payload.data._id;
      // state.token = action.payload.token;
      state.message = "";
    },

    loginError(state, action) {
      state.isAuthenticated = false;
      state.message = action.payload;
    },
    logout(state, action) {
      console.log("logging out");
      state = initialState;
      console.log(state);
    },
  },
});

export const { logout } = userSlice.actions;

export function login(email, password) {
  return async function (dispatch) {
    try {
      const userData = { email: email, password: password };

      const { data } = await axios.post(
        "http://localhost:5000/user/signin",
        userData
      );

      dispatch({
        type: "user/login",
        payload: { data: data.data },
      });
    } catch (err) {
      // console.log(err);
      dispatch({
        type: "user/loginError",
        payload: "Invalid Email or Password",
      });
    }
  };
}

export function register(name, email, password) {
  return async function (dispatch) {
    try {
      const userData = { name, email, password };
      const { data } = await axios.post(
        "http://localhost:5000/user/signup",
        userData
      );
      dispatch({
        type: "user/register",
        payload: { data: data.data },
      });
    } catch (err) {
      dispatch({ type: "user/loginError", payload: "Email is already used" });
    }
  };
}
export default userSlice.reducer;
