import { combineReducers } from 'redux';

import filtersReducer from './filters';
import itemsReducer from './items';
import cartReducer from './cart';

const rootReducer = combineReducers({
  filters: filtersReducer,
  items: itemsReducer,
  cart: cartReducer
});

export default rootReducer;