import { useReducer } from "react";
import CartContext from "./cart-context";

const deafultCart = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      let updatedItem;
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } 
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    
    let updatedItems;
    if(existingCartItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id)
    }else {
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }
  }
  if(action.type === 'CLEAR_CART') {
    return deafultCart;
  }
  return deafultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(CartReducer, deafultCart);

  const addItemToCardHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemToCardHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR_CART'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemToCardHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
