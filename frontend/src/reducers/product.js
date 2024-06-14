import axios from "axios";

export async function productDetails(productId) {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/product/${productId}`
    );
    console.log(data);
    return data.data.product;
  } catch (err) {
    return "error";
  }
}

export async function products(filters) {
  try {
    const water = filters.waterSchedule.join(",");
    const maintaince = filters.maintenance.join(",");
    const place = filters.place.join(",");
    const bloomtime = filters.bloomtime.join(",");

    const query = `http://localhost:5000/product?price=${15}&waterSchedule=${water}&maintenance=${maintaince}&place=${place}&bloomtime=${bloomtime}`;

    console.log(query);

    const { data } = await axios.get(query);
    // console.log(data);

    // console.log(data.data);
    console.log("data:", data.data.products);
    return data.data.products;
  } catch (err) {
    console.log("Invalid");
    return [];
  }
}

export async function initialProducts() {
  try {
    const query = `http://localhost:5000/product`;

    const { data } = await axios.get(query);

    // console.log(data.data);
    return data.data.products;
  } catch (err) {
    console.log(err);
    console.log("error from ip");
    return [];
  }
}

// place: [],
// bloomtime: [],
// maintenance: [],
// waterSchedule: [],
