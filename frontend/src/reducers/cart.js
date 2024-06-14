import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// const { id } = useSelector((store) => store.user);

const initialState = {
  isLoading: true,
  cartItems: [],
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loader(state, action) {
      // console.log("ddkfkdfk " + action.payload);
      state.cartItems = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    addToCart(state, action) {
      state.cartItems = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    removeFromCart(state, action) {
      state.cartItems = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    removeAllFromCart(state, action) {
      state.cartItems = action.payload;
      state.error = "";
    },
    setError(state, action) {
      console.log("error " + action.payload);
      state.error = action.payload;
    },
  },
});

export function loader(userId) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:5000/cart/${userId}`);
      // console.log(data);
      // console.log(data.cartItems);
      if (!data.data.cartItems) {
        dispatch({ type: "cart/loader", payload: [] });
      } else {
        dispatch({ type: "cart/loader", payload: data.data.cartItems });
      }
    } catch (err) {
      dispatch({ type: "cart/loader", payload: [] });
      // dispatch({ type: "cart/setError", payload: "cannot get Details" });
    }
  };
}

export function addToCart(userId, name, price, quantity, image, product) {
  return async function (dispatch) {
    try {
      const productData = { name, price, quantity, image, product };
      const { data } = await axios.put("http://localhost:5000/cart/addtocart", {
        userId,
        productData,
      });

      dispatch({ type: "cart/addToCart", payload: data.data.cartItems });
    } catch (err) {
      dispatch({ type: "cart/setError", payload: "cannot add to cart" });
    }
  };
}
export function removeFromCart(userId, product) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/cart/removefromcart/${userId}/${product}`
      );

      dispatch({
        type: "cart/removeFromCart",
        payload: data.data.cart.cartItems,
      });
    } catch (err) {
      dispatch({ type: "cart/setError", payload: "cannot remove from cart" });
    }
  };
}
export function removeAllFromCart(userId) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/cart/removeallfromcart/${userId}`
      );

      dispatch({
        type: "cart/removeAllFromCart",
        payload: data.data.cart.cartItems,
      });
    } catch (err) {
      dispatch({ type: "cart/setError", payload: "cannot remove from cart" });
    }
  };
}
export default cartSlice.reducer;
