import axios from "axios";

export default async function postOrder(orderData) {
  try {
    // console.log(orderData);
    const { data } = await axios.post(`http://localhost:5000/order`, orderData);
    // console.log("order" + data.data.order);
    console.log(data.status);
    return true;
  } catch (err) {
    return false;
  }
}
