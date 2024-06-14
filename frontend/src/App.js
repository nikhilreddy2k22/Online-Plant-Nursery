import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/User/login.js";
import Register from "./components/User/register.js";
import OrderSummary from "./components/Order/ordersummary.js";
import Cart from "./components/Cart/cart.js";
import Product from "./components/Product/product.js";
import OrderSuccess from "./components/Order/orderSuccess.js";
import { useSelector } from "react-redux";
import Home from "./components/Home/home.js";
import MainHeader from "./components/Header/main-header.js";
// import { createRef } from "react";

// import { store } from "./store";
// const navigationRef = createRef();

function App() {
  const curr = useSelector((store) => store.user);

  const isAuthenticated = curr.isAuthenticated;
  console.log(isAuthenticated);

  return (
    <>
      {/* <NavigationEvents
        onDidFocus={() => {
          // Check if previous route was undefined (indicating app restart)
          if (!navigationRef.current.previousRoute) {
            store.dispatch({ type: "APP_RESTART" });
          }
        }}
      /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/header" element={<MainHeader />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          {isAuthenticated && (
            <Route path="/order/success" element={<OrderSuccess />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/order" element={<OrderSummary />}></Route>
          )}
          {isAuthenticated && <Route path="/cart" element={<Cart />}></Route>}
          {isAuthenticated && (
            <Route path="/product/:productId" element={<Product />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
