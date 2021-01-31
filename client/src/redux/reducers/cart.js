const initialState = {
    itemsInCart: {}, // {_id: {qty, price}}
    totalPrice: 0,
    totalCount: 0,
  };
  
  const getTotalPrice = (item) => Object.values(item).reduce((sum, obj) => obj.price + sum, 0);
  const getTotalCount = (item) => Object.keys(item).length;
  
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
        // const currentItem = !state.itemsInCart[action.payload._id]
        //   ? action.payload
        //   : [...state.itemsInCart[action.payload._id].itemsInCart, action.payload];
        const currentItem = action.payload
        console.log('in action', currentItem.price, currentItem.qty)
  
        const newItemsInCart = {
          ...state.itemsInCart,
          [action.payload._id]: {
            qty: currentItem['qty'] + (state.itemsInCart[action.payload._id]?.qty || 0),
            price: currentItem.qty * currentItem.price + (state.itemsInCart[action.payload._id]?.price || 0)
          },
        };
  
        const totalCount = getTotalCount(newItemsInCart);
        const totalPrice = getTotalPrice(newItemsInCart);
  
        return {
          ...state,
          itemsInCart: newItemsInCart,
          totalCount,
          totalPrice,
        };
      }
  
      case 'REMOVE_CART_ITEM': {  // pass an id
        const newItems = {
          ...state.items,
        };
        const currentTotalPrice = newItems[action.payload].totalPrice;
        const currentTotalCount = newItems[action.payload].items.length;
        delete newItems[action.payload];
        return {
          ...state,
          items: newItems,
          totalPrice: state.totalPrice - currentTotalPrice,
          totalCount: state.totalCount - currentTotalCount,
        };
      }
  
      case 'PLUS_CART_ITEM': {
        const newObjItems = [
          ...state.items[action.payload].items,
          state.items[action.payload].items[0],
        ];
        const newItems = {
          ...state.items,
          [action.payload]: {
            items: newObjItems,
            totalPrice: getTotalPrice(newObjItems),
          },
        };
  
        const totalCount = getTotalSum(newItems, 'items.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');
  
        return {
          ...state,
          items: newItems,
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
        const totalPrice = getTotalSum(newItems, 'totalPrice');
  
        return {
          ...state,
          items: newItems,
          totalCount,
          totalPrice,
        };
      }
  
      case 'CLEAR_CART':
        return { totalPrice: 0, totalCount: 0, items: {} };
  
      default:
        return state;
    }
  };
  
  export default cart;