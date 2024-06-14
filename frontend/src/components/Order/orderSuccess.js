import { FaCheckCircle } from "react-icons/fa";
import styles from "./orderSuccess.module.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className={styles.orderSuccess}>
      <FaCheckCircle className={styles.icon} />

      <p>Your Order has been Placed successfully </p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
