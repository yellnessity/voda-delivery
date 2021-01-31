import axios from 'axios';

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});

export const setError = (payload) => ({
    type: 'SET_ERROR',
    payload,
  });

export const fetchItems = ({water, volume, id}) => (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });

  axios({
      url: 'http://localhost:5001/api/items/', 
      params: {category: water, volume, id},
      method: 'get'
  })
    .then(({ data }) => {
      dispatch(setItems(data));
      dispatch(setLoading(false));
    })
    .catch(() => {
      dispatch(setError(true));
    })
};

export const setItems = (items) => ({
  type: 'SET_ITEMS',
  payload: items,
});