import { useReducer } from "react";
import CartContext from "./cart-context"; 


const deafultCart = {
    items: [],
    totalAmount: 0
};

const CartReducer = (state, action) => {
    if(action.type == 'ADD_ITEM') {
        const updatedItem = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        return {
            items: updatedItem,
            totalAmount: updatedTotalAmount
        }
    }
    return deafultCart
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(CartReducer, deafultCart);

    const addItemToCardHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        })
    }
    
    const removeItemToCardHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCardHandler,
        removeItem: removeItemToCardHandler, 
    }

    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>)
}

export default CartProvider;