let savedCart = JSON.parse(localStorage.getItem('cart'));

const getTotalPrice = (item) => Object.values(item).reduce((sum, obj) => obj.price + sum, 0);
const getTotalCount = (item) => Object.keys(item).length;

const initialState = {
  itemsInCart: savedCart || {}, // {_id: {qty, price}}
  promo: {
    activated: true,
    code: '',
    discount: 0,
    success: false
  },
  totalPrice: savedCart ? getTotalPrice(savedCart) : 0,
  totalCount: savedCart ? getTotalCount(savedCart) : 0,
};

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_CART': {
      const currentItem = action.payload

      const newItemsInCart = {
        ...state.itemsInCart,
        [action.payload._id]: {
          qty: currentItem['qty'] + (state.itemsInCart[action.payload._id]?.qty || 0),
          price: currentItem.qty * currentItem.price + (state.itemsInCart[action.payload._id]?.price || 0)
        },
      };

      localStorage.setItem('cart', JSON.stringify(newItemsInCart));

      const totalCount = getTotalCount(newItemsInCart);
      const totalPrice = getTotalPrice(newItemsInCart) * (1 - state.promo.discount);

      return {
        ...state,
        itemsInCart: newItemsInCart,
        totalCount,
        totalPrice,
      };
    }

    case 'REMOVE_CART_ITEM': {  // pass an id
      const newItems = {
        ...state.itemsInCart,
      };

      delete newItems[action.payload];

      localStorage.setItem('cart', JSON.stringify(newItems));

      return {
        ...state,
        itemsInCart: newItems,
        totalPrice: getTotalPrice(newItems) * (1 - state.promo.discount),
        totalCount: getTotalCount(newItems)
      };
    }

    case 'SET_CART_ITEM_QTY': {

      const newItemsInCart = {
        ...state.itemsInCart,
        [action.payload.id]: {
          qty: action.payload.qty,
          price: action.payload.itemPrice
        },
      };

      const totalCount = getTotalCount(newItemsInCart);
      const totalPrice = getTotalPrice(newItemsInCart) * (1 - state.promo.discount);

      return {
        ...state,
        itemsInCart: newItemsInCart,
        totalCount,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice') * (1 - state.promo.discount);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return { totalPrice: 0, totalCount: 0, items: {} };

    case 'SET_PROMOCODE': {

      console.log(action.payload);

      let discount = action.payload.success ? action.payload.discount : 0

      return {
        ...state,
        promo: {...state.promo, ...action.payload},
        totalPrice: getTotalPrice(state.itemsInCart) * (1 - discount),
      };
    }

    default:
      return state;
  }
};

export default cart;