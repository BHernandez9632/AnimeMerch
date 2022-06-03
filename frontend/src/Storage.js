import { createContext, useReducer } from 'react';

export const Storage = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, interact) {
  switch (interact.type) {
    case 'CART_ADD_ITEM':
      const addMerch = interact.payload;
      const merchLocated = state.cart.cartItems.find(
        (item) => item._id === addMerch._id
      );
      const cartItems = merchLocated
        ? state.cart.cartItems.map((item) =>
            item._id === merchLocated._id ? addMerch : item
          )
        : [...state.cart.cartItems, addMerch];
      return { ...state, cart: { ...state.cart, cartItems } };

    default:
      return state;
  }
}

export function StorageProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Storage.Provider value={value}>{props.children}</Storage.Provider>;
}
