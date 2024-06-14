import styles from "./product.module.css";
import "react-slideshow-image/dist/styles.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { productDetails } from "../../reducers/product.js";
import StarRating from "../utils/StarRating.js";
import { Slide } from "react-slideshow-image";
import { addToCart } from "../../reducers/cart";
import Loader from "../utils/loader";
import { useParams, Link } from "react-router-dom";

// const images = ["data/plants1.jpg", "data/plants2.jpg", "data/plants3.jpg"];
// const stars = 5;
// const actual_price = 299;
// const selling_price = 250;

export default function Product() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [bag, setBag] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  const { productId } = useParams();
  const flag = screenWidth < 1000;
  // const discount = Math.round(
  //   ((actual_price - selling_price) * 100) / selling_price
  // );
  function addtoCart() {
    dispatch(
      addToCart(
        id,
        data.name,
        data.sellingPrice,
        quantity,
        data.images[0],
        data._id
      )
    );
    setBag(true);
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchdata() {
      const curr = await productDetails(productId);
      setData(curr);
      setLoading(false);
    }
    fetchdata();
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className={
              flag ? styles.productContainer1 : styles.productContainer
            }
          >
            <div className={flag ? styles.imgContainer1 : styles.imgContainer}>
              <Slide>
                {data.images &&
                  data.images.map((item, index) => (
                    <img
                      src={`../../.././data/${item}`}
                      key={index}
                      alt="product"
                    />
                  ))}
              </Slide>
              {/* <img src="data/plants1.jpg" alt="product" /> */}
            </div>
            <div
              className={
                flag ? styles.contentContainer1 : styles.contentContainer
              }
            >
              <h1>{data.name}</h1>

              <div className={styles.rating}>
                <StarRating rating={data.rating} />
                <p>{data.rating}</p>
              </div>

              <p className={styles.priceContainer}>
                {data.price - data.sellingPrice > 0 && (
                  <span className={styles.actualprice}> ₹{data.price}</span>
                )}
                <span className={styles.sellingprice}>
                  {" "}
                  ₹{data.sellingPrice}
                </span>
                {data.price - data.sellingPrice > 0 && (
                  <span className={styles.discount}>
                    -
                    {Math.round(
                      ((data.price - data.sellingPrice) * 100) / data.price
                    )}
                    %
                  </span>
                )}
              </p>

              <div className={styles.addproducts}>
                <div>
                  <button
                    onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                  >
                    –
                  </button>
                  <p>{quantity}</p>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                {!bag && (
                  <button
                    className={styles.button2}
                    onClick={() => addtoCart()}
                  >
                    ADD TO CART
                  </button>
                )}
                {bag && (
                  <Link to="/cart" className={styles.button3}>
                    {/* <button className={styles.button2}>GO TO CART</button> */}
                    GO TO CART
                  </Link>
                )}
              </div>
              {/* <button className={styles.button1}>BUY IT NOW</button> */}

              <div className={styles.instructionContainer}>
                <h2>Instructions:</h2>
                <div>
                  {data.instructions &&
                    data.instructions.map((item, index) => (
                      <p key={index}>
                        <FaArrowRightLong />{" "}
                        <span className={styles.instruction}>{item}</span>
                      </p>
                    ))}
                  {/* <p>
                    <FaArrowRightLong /> <span>water twice a day</span>
                  </p>
                  <p>
                    <FaArrowRightLong />{" "}
                    <span> water twice a day and night</span>
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.aboutproduct}>
            <h2>About The Product</h2>
            <p>{data.description}</p>
          </div>
        </>
      )}
    </>
  );
}
