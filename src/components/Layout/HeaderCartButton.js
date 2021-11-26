import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [buttonHighlighted, setButtonHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx

  const numberofItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const buttonClasses = `${styles.button} ${buttonHighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if(cartCtx.items.length === 0) {
      return;
    }
    setButtonHighlighted(true);
    const timer = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);

    return () => {
      clearInterval(timer);
    }
  }, [items])

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberofItems}</span>
    </button>
  );
};

export default HeaderCartButton;
