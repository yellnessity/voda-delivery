import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { setWaterType, setVolumeType } from '../redux/actions/filters';
import { fetchItems } from '../redux/actions/items';
// import { addPizzaToCart } from '../redux/actions/cart';

// import useFetchItems from '../useFetchItems'
// import usePersistedData from '../usePersistedData'
import { ItemsList, Categories } from '../components';
import { Container, Row } from 'react-bootstrap'
// import { BasketItemsContext } from '../App'

const waterTypes = ["still", "sparkling", "sport"]
const volumeTypes = [0.3, 0.5, 1, 5, 12]

export default function Items() {

    const dispatch = useDispatch();
    const items = useSelector(({ items }) => items.items);
    // const cartItems = useSelector(({ cart }) => cart.items);
    const loading = useSelector(({ items }) => items.loading);
    const error = useSelector(({ items }) => items.error);
    const { water, volume } = useSelector(({ filters }) => filters);

    React.useEffect(() => {
        // console.log(water, volume)
        dispatch(fetchItems({water, volume}));
    }, [water, volume]);

    React.useEffect(() => {
        // dispatch(fetchItems({}));
    }, [])

    const onSelectWater = React.useCallback((water) => {
        dispatch(setWaterType(water));
    }, []);

    const onSelectVolume = React.useCallback((volume) => {
        dispatch(setVolumeType(volume));
    }, []);

    const addItem = (obj) => {
        dispatch({
            type: 'ADD_ITEM_CART',
            payload: obj,
        });
    };

    return (
        <div>
            <Container fluid className="items-header px-0">
            <h1 className="container px-0 font-weight-bold py-5">Items</h1>
            <Categories
                activeWater={water}
                activeVolume={volume}
                filters={{onSelectWater, onSelectVolume}}
                categories={{waterTypes, volumeTypes}}
            />
            </Container>
            
            <div className="container-fluid px-0 mx-0">
                <Row>
                {loading && 
                <div className="items-cover">
                    <h1 className="container py-3 text-align-center">Loading...</h1>
                </div>
                }
                {error && 
                <div className="items-cover">
                    <h1 className="container py-3">Something went wrong.</h1>
                </div>
                }
                
                {(!loading) && (!error) ? 
                    <ItemsList items={items} handleAddItem={addItem} /> 
                    : null
                } 
                </Row>
            </div>
        </div>
    )
}


