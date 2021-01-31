const initialState = {
    water: [],
    volume: [],
};

const filters = (state = initialState, action) => {
    if (action.type === 'SET_WATER_TYPE') {
        return {
        ...state,
        water: action.payload,
        };
    }
    if (action.type === 'SET_VOLUME_TYPE') {
        return {
        ...state,
        volume: action.payload,
        };
    }
    return state;
};

export default filters;