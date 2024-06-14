import styles from "./cart.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loader, addToCart, removeFromCart } from "../../reducers/cart";
import Loader from "../utils/loader";
// import { Typography } from "@material-ui/core";
// import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);
  const { id } = useSelector((state) => state.user);

  const sum = cartItems.reduce(
    (total, current) => total + current.price * current.quantity,
    0
  );

  function handleAddQuantity(name, price, quantity, image, product) {
    dispatch(addToCart(id, name, price, quantity + 1, image, product));
  }
  function handleDeleteQuantity(name, price, quantity, image, product) {
    if (quantity > 1)
      dispatch(addToCart(id, name, price, quantity - 1, image, product));
  }
  function handleRemove(product) {
    dispatch(removeFromCart(id, product));
  }
  useEffect(() => {
    dispatch(loader(id));
  }, [dispatch, id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          {/* <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography> */}
          <h1>NO PRODUCTS IN YOUR CART</h1>
          <Link to="/">View Products</Link>
        </div>
      ) : (
        <div className={styles.cartContainer}>
          <h1>YOUR CART</h1>
          <table>
            <thead>
              <tr>
                <th className={styles.cola}>PRODUCT</th>
                <th className={styles.colb}>PRICE</th>

                <th className={styles.colc}>QUANTITY</th>
                <th className={styles.cold}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 &&
                cartItems.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.productContent}>
                        <img
                          className={styles.plimage}
                          src={`../data/${data.image}`}
                          alt="Product"
                        />
                        <div className={styles.productionCon}>
                          <h4>{data.name}</h4>
                          {/* <p>Planter :gota</p> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className={styles.sellingprice}>₹{data.price}</p>
                    </td>
                    <td>
                      <div className={styles.addproducts}>
                        <button
                          onClick={() =>
                            handleDeleteQuantity(
                              data.name,
                              data.price,
                              data.quantity,
                              data.image,
                              data.product
                            )
                          }
                        >
                          –
                        </button>
                        <p>{data.quantity}</p>
                        <button
                          onClick={() =>
                            handleAddQuantity(
                              data.name,
                              data.price,
                              data.quantity,
                              data.image,
                              data.product
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="totalPrice">
                        <p className={styles.sellingprice}>
                          ₹{data.quantity * data.price}
                        </p>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleRemove(data.product)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={styles.back} onClick={() => navigate(-1)}>
            <button className={styles.placebutton}>BACK</button>
          </div>
          <div className={styles.bill}>
            <p>
              Subtotal <span> ₹{sum}</span>
            </p>
            <Link to="/order">
              {" "}
              <button className={styles.placebutton}>PLACE ORDER</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

// function Row() {
//   return (
//     <tr>
//       <td>
//         <div className={styles.productContent}>
//           <img
//             className={styles.plimage}
//             src="../data/plants1.jpg"
//             alt="Product"
//           />
//           <div className={styles.productionCon}>
//             <h4>Product name</h4>
//             <p>Planter :gota</p>
//           </div>
//         </div>
//       </td>
//       <td>
//         <p className={styles.sellingprice}>₹200</p>
//       </td>
//       <td>
//         <div className={styles.addproducts}>
//           <button onClick={() => handleAddQuantity()}>–</button>
//           <p>1</p>
//           <button>+</button>
//         </div>
//       </td>
//       <td>
//         <div className="totalPrice">
//           <p className={styles.sellingprice}>₹200</p>
//           <button className={styles.deleteButton}>🗑</button>
//         </div>
//       </td>
//     </tr>
//   );
// }
