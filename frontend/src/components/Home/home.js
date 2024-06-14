// import { Link } from 'react-router-dom'
// import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { GoPlusCircle } from "react-icons/go";
import { CiCircleMinus } from "react-icons/ci";
import { initialProducts, products } from "../../reducers/product";
import MainHeader from ".././Header/main-header.js";
import Loader from "../utils/loader";
// import { products } from "../../reducers/product.js";
const Home = () => {
  const [index, setIndex] = useState(0);
  const [isSort, setSort] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);
  const [filters, setFilters] = useState({
    price: 99,
    place: [],
    bloomtime: [],
    maintenance: [],
    waterSchedule: [],
  });

  function handleWater(value, curr, check) {
    const array = filters.waterSchedule;
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    setFilters({ ...filters, waterSchedule: array });
    setChecked(() => {
      const arr = isChecked;
      arr[3][curr] = check;
      return arr;
    });
  }
  function handlePlace(value, curr, check) {
    const array = filters.place;
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    setFilters({ ...filters, place: array });
    setChecked(() => {
      const arr = isChecked;
      arr[0][curr] = check;
      return arr;
    });
  }
  function handleBloom(value, curr, check) {
    const array = filters.bloomtime;
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    setFilters({ ...filters, bloomtime: array });
    setChecked(() => {
      const arr = isChecked;
      arr[1][curr] = check;
      return arr;
    });
  }
  function handleMaintaince(value, curr, check) {
    const array = filters.maintenance;
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    setFilters({ ...filters, maintenance: array });
    setChecked(() => {
      const arr = isChecked;
      arr[2][curr] = check;
      return arr;
    });
  }

  //   console.log(filters);

  function handleapply() {
    async function fetch() {
      const data1 = await products(filters);
      setData(data1);
    }
    setLoading(true);
    fetch();
    setLoading(false);
  }

  useEffect(() => {
    async function fetch() {
      const data1 = await initialProducts();
      setData(data1);
    }
    setLoading(true);
    fetch();
    console.log("false out");
    setLoading(false);
  }, []);
  //   useEffect(() => {
  //     async function fetch() {
  //       const data1 = await products();
  //       setData(data1);
  //     }
  //     setLoading(true);
  //     fetch();
  //     setLoading(false);
  //   }, [filters]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MainHeader />
          <div className={styles.outerContainer}>
            <div className={styles.flexbox}>
              <div className={styles.filters}>
                <div className={styles.header}>
                  {/* <!-- FILTER HEADING --> */}
                  <div className={styles.heading}>
                    <p id={styles.filtertag}>Filters</p>
                    <p id={styles.clear} onClick={handleapply}>
                      APPLY
                    </p>
                  </div>

                  {/* <!-- FIRST FILTER --> */}
                  <div id={styles.head}>
                    <p id={styles.filtertag}>Price</p>
                    <button
                      className={styles.dd}
                      id={styles.b1}
                      onClick={() => setIndex((a) => (a === 1 ? 0 : 1))}
                    >
                      {index === 1 ? (
                        <CiCircleMinus size={20} />
                      ) : (
                        <GoPlusCircle size={20} />
                      )}
                    </button>
                  </div>
                  {index === 1 && (
                    <div className={styles.slidercontainer} id={styles.slider}>
                      <input
                        type="range"
                        min={99}
                        max={9999}
                        step={100}
                        value={filters.price}
                        className={styles.slider}
                        id={styles.priceRange}
                        onChange={(e) =>
                          setFilters({ ...filters, price: e.target.value })
                        }
                      />
                      <p style={{ paddingLeft: "2%", paddingTop: "3%" }}>
                        Price: <span id={styles.priceValue}>₹99 - ₹14999</span>
                      </p>
                    </div>
                  )}

                  {/* <!-- SECOND FILTER --> */}
                  <div className={styles.head} id={styles.fil2}>
                    <p id={styles.filtertag}>Indoor/Outdoor</p>
                    <button
                      className={styles.dd}
                      id={styles.b2}
                      onClick={() => setIndex((a) => (a === 2 ? 0 : 2))}
                    >
                      {index === 2 ? (
                        <CiCircleMinus size={20} />
                      ) : (
                        <GoPlusCircle size={20} />
                      )}
                    </button>
                  </div>
                  {index === 2 && (
                    <div
                      className={styles.checkboxescontainer}
                      id={styles.cbbox}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked[0][0]}
                          id={styles.cb1}
                          onChange={(e) =>
                            handlePlace("Indoor", 0, e.target.checked)
                          }
                        />{" "}
                        Indoor Plants
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          checked={isChecked[0][1]}
                          id={styles.cb2}
                          onChange={(e) =>
                            handlePlace("Outdoor", 1, e.target.checked)
                          }
                        />{" "}
                        Outdoor Plants
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          checked={isChecked[0][2]}
                          id={styles.cb3}
                          onChange={(e) =>
                            handlePlace(
                              "Outdoor Shade Loving",
                              2,
                              e.target.checked
                            )
                          }
                        />{" "}
                        Outdoor Shade Loving Plants
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          id={styles.cb4}
                          checked={isChecked[0][3]}
                          onChange={(e) =>
                            handlePlace(
                              "Outdoor Sun Loving",
                              3,
                              e.target.checked
                            )
                          }
                        />{" "}
                        Outdoor Sun Loving Plants
                      </label>
                    </div>
                  )}

                  {/* <!-- THIRD FILTER --> */}
                  <div className={styles.head} id={styles.fil3}>
                    <p id={styles.filtertag}>Bloomtime</p>
                    <button
                      className={styles.dd}
                      id={styles.b3}
                      onClick={() => setIndex((a) => (a === 3 ? 0 : 3))}
                    >
                      {index === 3 ? (
                        <CiCircleMinus size={20} />
                      ) : (
                        <GoPlusCircle size={20} />
                      )}
                    </button>
                  </div>
                  {index === 3 && (
                    <div
                      className={styles.checkboxescontainer}
                      id={styles.cbbox1}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked[1][0]}
                          id={styles.cb1}
                          onChange={(e) =>
                            handleBloom("Spring", 0, e.target.checked)
                          }
                        />{" "}
                        Spring Season
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          checked={isChecked[1][1]}
                          id={styles.cb2}
                          onChange={(e) =>
                            handleBloom("Autumn", 1, e.target.checked)
                          }
                        />{" "}
                        Autumn Season
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          checked={isChecked[1][2]}
                          id={styles.cb3}
                          onChange={(e) =>
                            handleBloom("Fall", 2, e.target.checked)
                          }
                        />{" "}
                        Fall Season
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          id={styles.cb4}
                          checked={isChecked[1][3]}
                          onChange={(e) =>
                            handleBloom("Winter", 3, e.target.checked)
                          }
                        />{" "}
                        Winter Season
                      </label>
                    </div>
                  )}

                  {/* <!-- FOURTH FILTER --> */}
                  <div className={styles.head} id={styles.fil4}>
                    <p id={styles.filtertag}>Maintenance</p>
                    <button
                      className={styles.dd}
                      id={styles.b4}
                      onClick={() => setIndex((a) => (a === 4 ? 0 : 4))}
                    >
                      {index === 4 ? (
                        <CiCircleMinus size={20} />
                      ) : (
                        <GoPlusCircle size={20} />
                      )}
                    </button>
                  </div>
                  {index === 4 && (
                    <div
                      className={styles.checkboxescontainer}
                      id={styles.cbbox2}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked[2][0]}
                          id={styles.cb1}
                          onChange={(e) =>
                            handleMaintaince("High", 0, e.target.checked)
                          }
                        />{" "}
                        High{" "}
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          id={styles.cb2}
                          checked={isChecked[2][1]}
                          onChange={(e) =>
                            handleMaintaince("Medium", 1, e.target.checked)
                          }
                        />{" "}
                        Medium{" "}
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          checked={isChecked[2][2]}
                          id={styles.cb3}
                          onChange={(e) =>
                            handleMaintaince("Low", 2, e.target.checked)
                          }
                        />{" "}
                        Low{" "}
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          id={styles.cb4}
                          checked={isChecked[2][3]}
                          onChange={(e) =>
                            handleMaintaince("Very Low", 3, e.target.checked)
                          }
                        />{" "}
                        Very Low
                      </label>
                    </div>
                  )}

                  {/* <!-- FIFTH FILTER --> */}
                  <div
                    className={styles.head}
                    id={styles.fil5}
                    style={{ border: "none" }}
                  >
                    <p id={styles.filtertag}>Water Schedule</p>
                    <button
                      className={styles.dd}
                      id={styles.b5}
                      onClick={() => setIndex((a) => (a === 5 ? 0 : 5))}
                    >
                      {index === 5 ? (
                        <CiCircleMinus size={20} />
                      ) : (
                        <GoPlusCircle size={20} />
                      )}
                    </button>
                  </div>
                  {index === 5 && (
                    <div
                      className={styles.checkboxescontainer}
                      id={styles.cbbox3}
                    >
                      <label>
                        <input
                          type="checkbox"
                          id={styles.ch1}
                          checked={isChecked[3][0]}
                          onChange={(e) =>
                            handleWater(
                              "Every alternate day",
                              0,
                              e.target.checked
                            )
                          }
                        />{" "}
                        Every alternate day{" "}
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          checked={isChecked[3][1]}
                          id={styles.ch2}
                          onChange={(e) =>
                            handleWater("Once a day", 1, e.target.checked)
                          }
                        />{" "}
                        Once a day
                      </label>
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          id={styles.ch3}
                          checked={isChecked[3][2]}
                          onChange={(e) =>
                            handleWater("Once a week", 2, e.target.checked)
                          }
                        />{" "}
                        Once a week{" "}
                      </label>
                      {/* <label>
                  {" "}
                  <input
                    type="checkbox"
                    id={styles.ch4}
                    checked={isChecked[3][3]}
                    onClick={() => handleWater("Once in Two Weeks", 3)}
                  />{" "}
                  Once in Two Weeks
                </label> */}
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          id={styles.ch4}
                          checked={isChecked[3][3]}
                          onChange={(e) =>
                            handleWater("Twice a week", 3, e.target.checked)
                          }
                        />{" "}
                        Twice a week
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* <!-- PRODUCT DISPLAY --> */}
              <div className={styles.cards}>
                {/* <!-- SORT BY --> */}
                <div className={styles.sortby}>
                  <div id={styles.sortdiv}>
                    <div id={styles.button}>
                      <ul id={styles.sort} onClick={() => setSort(!isSort)}>
                        SORT BY{" "}
                        <p className={styles.arrow_down} id={styles.down}></p>{" "}
                      </ul>
                      {isSort && (
                        <div className={styles.sortmenu} id={styles.sortmenu}>
                          <li id={styles.sortmenulist}>Alphabetically A-Z</li>
                          <li id={styles.sortmenulist}>Alphabetically Z-A</li>
                          <li id={styles.sortmenulist}>Price High-Low</li>
                          <li id={styles.sortmenulist}>Price Low-High</li>
                        </div>
                      )}
                    </div>
                  </div>
                  <p id={styles.noofproducts}></p>
                </div>

                <div className={styles.container}>
                  {data &&
                    data.map((item, index) => (
                      <div className={styles.card} key={index}>
                        <div className={styles.image}>
                          <img
                            id={styles.plant}
                            src={`../../.././data/${item.images[0]}`}
                            alt=""
                            width="300"
                            height="375"
                          />
                        </div>
                        <div className={styles.content}>
                          <h3 id={styles.name}>{item.name}</h3>
                        </div>
                        <div className={styles.cardactions}>
                          <p className={styles.price}>₹ {item.price}</p>
                          <Link
                            to={`/product/${item._id}`}
                            className={styles.btn1}
                          >
                            VIEW PRODUCT
                          </Link>
                        </div>
                      </div>
                    ))}
                  {/* <div className={styles.card}>
                    <div className={styles.image}>
                      <img
                        id={styles.plant}
                        src="data\plants1.jpg"
                        alt=""
                        width="300"
                        height="375"
                      />
                    </div>
                    <div className={styles.content}>
                      <h3 id={styles.name}>Peace Lily Plant</h3>
                    </div>
                    <div className={styles.cardactions}>
                      <p className={styles.price}>₹ 299</p>
                      <Link className={styles.btn1}>VIEW PRODUCT</Link>
                    </div>
                  </div> */}
                  {/* <div className={styles.card}>
                    <div className={styles.image}>
                      <img
                        id={styles.plant}
                        src="data\plants1.jpg"
                        alt=""
                        width="300"
                        height="375"
                      />
                    </div>
                    <div className={styles.content}>
                      <h3 id={styles.name}>Peace Lily Plant</h3>
                    </div>
                    <div className={styles.cardactions}>
                      <p className={styles.price}>₹ 299</p>

                      <Link
                        to="/product/662b950ad728c9c9d9f31132"
                        className={styles.btn1}
                      >
                        VIEW PRODUCT
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
