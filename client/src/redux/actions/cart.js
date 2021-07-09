import axios from 'axios'
  
export const addItemToCart = (item) => ({
  type: 'ADD_ITEM_CART',
  payload: item,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem = (id) => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
});

export const setCartItemQty = (id, qty, itemPrice) => ({
  type: 'SET_CART_ITEM_QTY',
  payload: {id, qty, itemPrice}
});

export const minusCartItem = (id) => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
});

export const doUsePromocode = (code) => async (dispatch) => {
  try {
    let result = await axios.post(
      'http://localhost:5001/api/promocode/',
      {
        promocode: code
      }
    );
    // let result = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       success: true
    //     })
    //   }, 2000);
    // });
    console.log(result);
    if (result.data.success) dispatch(setPromocode({discount: result.data.discount, code, activated: true, success: true}));
    else dispatch(setPromocode({activated: true, success: false}));
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const setPromocode = (payload) => ({
  type: 'SET_PROMOCODE',
  payload,
});