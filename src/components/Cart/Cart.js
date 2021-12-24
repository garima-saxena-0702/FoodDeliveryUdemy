import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
      cartCtx.addItem({...item, amount: 1})
  };

  const orderHandler = () => {
    setIsCheckout(true);
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button-alt"]} onClick={props.onHideCart}>
        close
      </button>
      {hasItem && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
