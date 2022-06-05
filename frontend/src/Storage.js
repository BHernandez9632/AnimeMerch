import { createContext, useReducer } from 'react';

export const Storage = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    customerInformation: localStorage.getItem('customerInformation')
      ? JSON.parse(localStorage.getItem('customerInformation'))
      : {},

    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : '',
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
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== interact.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: interact.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          customerInformation: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_CUSTOMER_INFORMATION':
      return {
        ...state,
        cart: {
          ...state.cart,
          customerInformation: interact.payload,
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: interact.payload,
        },
      };

    default:
      return state;
  }
}

export function StorageProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Storage.Provider value={value}>{props.children}</Storage.Provider>;
}
