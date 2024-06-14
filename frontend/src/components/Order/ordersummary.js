import styles from "./ordersummary.module.css";
// import Address from "./address.js";
import Loader from "../utils/loader";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { loader } from "../../reducers/cart";
import { useState } from "react";
import postOrder from "../../reducers/order.js";
import { removeAllFromCart } from "../../reducers/cart.js";

export default function OrderSummary() {
  const [newAddress, setAddress] = useState({
    name: "",
    contact: " ",
    pincode: " ",
    locality: " ",
    address: " ",
    city: "",
    state: "AndhraPradesh",
  });
  const [message, setMessage] = useState("");
  // const dispatch = useDispatch();
  const { isLoading, cartItems } = useSelector((state) => state.cart);
  const { id } = useSelector((state) => state.user);
  const sum = cartItems.reduce(
    (total, current) => total + current.price * current.quantity,
    0
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newAddress);
    const msg = validator(newAddress);
    if (msg.length === 0) {
      const orderData = {
        shippingInfo: newAddress,
        orderItems: cartItems,
        user: id,
        itemsPrice: sum,
        taxPrice: Math.round(sum / 20),
        shippingPrice: Math.round(sum / 25),
        totalPrice: sum + Math.round(sum / 20) + Math.round(sum / 25),
      };

      async function placeOrder() {
        const curr = await postOrder(orderData);
        if (curr) {
          dispatch(removeAllFromCart(id));
          navigate("/order/success");
        } else {
          setMessage("can't place your order");
        }
      }
      placeOrder();
      // setMessage("");
    } else {
      setMessage(msg);
    }
  }

  // useEffect(() => {
  //   dispatch(loader(id));
  // }, [dispatch, id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.box}>
          <div className={styles.addressbox}>
            <div className={styles.container}>
              <h3>Shipping Address</h3>
              <div className={styles.wrapper}>
                <div className={styles.innerWrapper}>
                  <div className={styles.mainWrapper}>
                    <p>Full Name</p>
                    <input
                      value={newAddress.name}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className={styles.mainWrapper}>
                    <p>Contact </p>
                    <input
                      value={newAddress.contact}
                      type="text"
                      name="contact"
                      id="contact"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          contact: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className={styles.innerWrapper}>
                  <div className={styles.mainWrapper}>
                    <p>PIN Code</p>
                    <input
                      value={newAddress.pincode}
                      type="text"
                      name="pincode"
                      id="pincode"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          pincode: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className={styles.mainWrapper}>
                    <p>Locality</p>
                    <input
                      value={newAddress.locality}
                      type="text"
                      name="locality"
                      id="locality"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          locality: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className={styles.innerWrapper}>
                  <div className={styles.mainWrapper}>
                    <p>Address</p>
                    <textarea
                      value={newAddress.address}
                      rows="4"
                      cols="50"
                      type="text"
                      id="address"
                      name="address"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }));
                      }}
                    >
                      Enter address
                    </textarea>
                  </div>
                </div>
                <div className={styles.innerWrapper}>
                  <div className={styles.mainWrapper}>
                    <p>City/District/Town</p>
                    <input
                      value={newAddress.city}
                      type="text"
                      id="city"
                      name="city"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className={styles.mainWrapper}>
                    <p>State</p>
                    <select
                      value={newAddress.state}
                      id="state"
                      name="state"
                      onChange={(e) => {
                        setAddress((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }));
                      }}
                    >
                      <option value="AndhraPradesh">AndhraPradesh</option>
                      <option value="Karanataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharastra">Maharastra</option>
                      <option value="TamilNadu">TamilNadu</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>
                </div>
                {message.length > 0 && (
                  <p className={styles.message}>{message}</p>
                )}
                <button
                  className={
                    cartItems.length === 0 ? styles.buttondis : styles.button1
                  }
                  disabled={cartItems.length === 0}
                  onClick={handleSubmit}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
          <div className={styles.outerorderbox}>
            <div className={styles.orderbox}>
              <h3>Order Summary</h3>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.summary}>
                  <div className={styles.innerbox}>
                    <img
                      src={`../data/${item.image}`}
                      alt="product"
                      className={styles.plimage}
                    />
                    <div className={styles.productionCon}>
                      <h4>{item.name}</h4>
                      {/* <p>Planter :gota</p> */}
                    </div>
                  </div>
                  <p className={styles.price}>
                    {" "}
                    {item.quantity} x ₹{item.price}
                  </p>
                </div>
              ))}

              <div className={styles.totalBox}>
                <div className={styles.totaltag}>
                  <p className={styles.total}>Subtotal</p>
                  <p className={styles.totalcost}>₹{sum}</p>
                </div>
                <div className={styles.totaltag}>
                  <p className={styles.total}>Tax</p>
                  <p className={styles.totalcost}>₹{Math.round(sum / 20)}</p>
                </div>
                <div className={styles.totaltag}>
                  <p className={styles.total}>Shipping Cost</p>
                  <p className={styles.totalcost}>₹{Math.round(sum / 25)}</p>
                </div>
              </div>

              <div className={styles.totaltag1}>
                <p className={styles.total1}>Total</p>
                <p className={styles.totalcost1}>
                  ₹{sum + Math.round(sum / 20) + Math.round(sum / 25)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function validator(curr_address) {
  if (curr_address.name.length < 4) {
    return "Name must contain atleast 4 characters";
  } else if (curr_address.contact.length !== 11) {
    return "contact must contain exactly 10 characters";
  } else if (curr_address.pincode.length !== 6) {
    return "PINcode must contain exactly 6 characters";
  } else if (curr_address.locality.length < 4) {
    return "Locality must contain atleast 4 characters";
  } else if (curr_address.address.length < 10) {
    return "Adress must contain atleast 10 characters";
  } else if (curr_address.city.length < 4) {
    return "City must contain atleast 4 characters";
  } else {
    return "";
  }
}

// function orderedProduct(){

//   return ();
// }

// export default function OrderSummary() {
//   return (
//     <div className={styles.box}>
//       <div className={styles.addressbox}>
//         <Address />
//       </div>
//       <div className={styles.outerorderbox}>
//         <div className={styles.orderbox}>
//           <h3>Order Summary</h3>
//           <div className={styles.summary}>
//             <div className={styles.innerbox}>
//               <img
//                 src="../data/plants1.jpg"
//                 alt="product"
//                 className={styles.plimage}
//               />
//               <div className={styles.productionCon}>
//                 <h4>Product name</h4>
//                 <p>Planter :gota</p>
//               </div>
//             </div>

//             <p className={styles.price}> 2 x ₹200</p>
//           </div>

//           <div className={styles.totalprice}>
//             <div className={styles.costsummary}>
//               <div>
//                 <p className={styles.subtotal}>Subtotal</p>
//                 <p className={styles.cost}> ₹400</p>
//               </div>
//               <div>
//                 <p className={styles.subtotal}>Shipping</p>
//                 <p className={styles.cost}>₹20</p>
//               </div>
//             </div>

//             <div className={styles.totaltag}>
//               <p className={styles.total}>Total</p>
//               <p className={styles.totalcost}>₹420</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
