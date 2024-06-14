import styles from "./address.module.css";

export default function createAddress() {
  return (
    <div className={styles.container}>
      <h3>Shipping Address</h3>
      <form className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.mainWrapper}>
            <label for="name">Full Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className={styles.mainWrapper}>
            <label for="contact">Contact </label>
            <input type="text" name="contact" id="contact" />
          </div>
        </div>

        <div className={styles.innerWrapper}>
          <div className={styles.mainWrapper}>
            <label for="pincode">PIN Code</label>
            <input type="text" name="pincode" id="pincode" />
          </div>
          <div className={styles.mainWrapper}>
            <label for="locality">Locality</label>
            <input type="text" name="locality" id="locality" />
          </div>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.mainWrapper}>
            <label for="address">Address</label>
            <textarea
              rows="4"
              cols="50"
              type="text"
              name="address"
              id="address"
            >
              Enter address
            </textarea>
          </div>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.mainWrapper}>
            <label for="city">City/District/Town</label>
            <input type="text" name="city" id="city" />
          </div>
          <div className={styles.mainWrapper}>
            <label for="state">State</label>
            <select id="state">
              <option value="AndhraPradesh">AndhraPradesh</option>
              <option value="Karanataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Maharastra">Maharastra</option>
              <option value="TamilNadu">TamilNadu</option>
              <option value="Telangana">Telangana</option>
            </select>
          </div>
        </div>
      </form>
      <button className={styles.button1}>ADD ADDRESS</button>
    </div>
  );
}
