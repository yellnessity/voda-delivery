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
        console.log(obj)
    };

    // var {items, loading, error} = useFetchItems();

    // const { updateNewItems } = useContext(BasketItemsContext)

    // const [waterTypes, setWaterTypes] = useState([]);
    // const [volumeTypes, setVolumeTypes] = useState([]);
    // const [itemsFilter, setItemsFilter] = useState({
    //     category: items,
    //     volume: items,
    //     filteredItems: items
    // });
    
    // const [itemsBasket, setItemsBasket] = usePersistedData('items', []);

    // var volumes = []
    // items.map(item => volumes.push(item['volume']))
    // volumes = [...new Set(volumes)].sort((a, b) => a - b)


    // useEffect(() => {setItemsFilter({
    //     category: items,
    //     volume: items,
    //     filteredItems: items.sort((a,b) => a.price - b.price)
    // })
    // }, [items])

    // useMemo(() => {
    //     console.log('waterTypes: '+JSON.stringify(waterTypes))
    //     console.log('volumeTypes: '+JSON.stringify(volumeTypes))
    //     if (waterTypes.length > 0) {
    //         let newWaterFilter = items.filter(item => waterTypes.includes(item.category))
    //         console.log('new Water Filter '+JSON.stringify(newWaterFilter))
    //         setItemsFilter(prevFilter => prevFilter = {category: newWaterFilter, volume: [...prevFilter.volume]})
    //     }
    //     else setItemsFilter(prevFilter => prevFilter = {category: items, volume: [...prevFilter.volume]})
    //     if (volumeTypes.length > 0) {
    //         let newVolumeFilter = items.filter(item => volumeTypes.includes(item.volume.toString()))
    //         console.log('new Volume Filter '+JSON.stringify(newVolumeFilter))
    //         setItemsFilter(prevFilter => prevFilter = {category: [...prevFilter.category], volume: newVolumeFilter})
    //     }
    //     else setItemsFilter(prevFilter => prevFilter = {category: [...prevFilter.category], volume: items})
    //     setItemsFilter(prevFilter => prevFilter = {
    //         category: [...prevFilter.category], 
    //         volume: [...prevFilter.volume], 
    //         filteredItems: prevFilter.category.filter(item => prevFilter.volume.includes(item))
    //     })
    // }, [volumeTypes, waterTypes])

    // useEffect(() => {
    //     // console.log('filtered items: '+JSON.stringify(itemsFilter.filteredItems))
    // }, [itemsFilter])
    
    // useEffect(() => { 
    //     localStorage.setItem('items', JSON.stringify(itemsBasket))
    //     updateNewItems(itemsBasket.length)
    //     // updateNewItems(itemsBasket.length)
    // }, [itemsBasket])

    // // useEffect(() => {
    // //     if (waterTypes.length === 0) {
    // //         setItemsFilter(items)
    // //     }
    // //     else {
    // //         let newFilter = items.filter(item => {
    // //             return waterTypes.includes(item.water)
    // //         })
    // //         setItemsFilter(newFilter)
    // //     }
    // // }, [waterTypes])

    // const handleFilter = (filter, value) => {
    //     switch (filter) {
    //         case "category":
    //             if(waterTypes.includes(value)) {
    //                 let newWater = waterTypes.filter(waterType => waterType !== value)
    //                 setWaterTypes(newWater)
    //             }
    //             else setWaterTypes([...waterTypes, value])
    //             break;
    //         case "volume":
    //             if(volumeTypes.includes(value)) {
    //                 let newVolume = volumeTypes.filter(volumeType => volumeType !== value)
    //                 setVolumeTypes(newVolume)
    //             }
    //             else setVolumeTypes([...volumeTypes, value])
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // const addItem = (basketItem, qty) => {
    //     setItemsBasket((currentBasket) => {
    //         if (currentBasket.some((cartItem) => cartItem.item === basketItem._id)) {
    //                 console.log(qty)
    //                 let addIndex = currentBasket.findIndex((cartItem) => cartItem.item === basketItem._id)
    //                 currentBasket[addIndex].qty += qty
    //                 return [...currentBasket]
    //             }
    //         else 
    //             return [{'item': basketItem._id, 'qty': qty}, ...currentBasket]
    //     });
    // }

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
            {/* <div className="container px-0 row align-items-baseline">
                <p className="col-1 px-0" style={{fontWeight: 600}}>Category</p> 
                
                <ButtonGroup toggle className="water-type-group mr-2">
                    <ToggleButton
                    type="checkbox"
                    variant="outline-primary"
                    checked={waterTypes.includes('still')}
                    className = "water-type shadow-none" 
                    value="still"
                    onChange={(e) => handleFilter('category', e.currentTarget.value)}
                    >
                    Still
                    </ToggleButton>
                </ButtonGroup>
                <ButtonGroup toggle className="water-type-group mr-2">
                    <ToggleButton
                    type="checkbox"
                    variant="outline-primary"
                    className = "water-type shadow-none" 
                    checked={waterTypes.includes('sparkling')} 
                    value="sparkling"
                    onChange={(e) => handleFilter('category', e.currentTarget.value)}
                    >
                    Sparkling
                    </ToggleButton>
                </ButtonGroup>
                <ButtonGroup toggle className="water-type-group mr-2">
                    <ToggleButton
                    type="checkbox"
                    variant="outline-primary"
                    className = "water-type shadow-none" 
                    checked={waterTypes.includes('sport')} 
                    value="sport"
                    onChange={(e) => handleFilter('category', e.currentTarget.value)}
                    >
                    Sport
                    </ToggleButton>
                </ButtonGroup>
            </div>

            <div className="container px-0 my-3 row align-items-baseline">
                <p className="col-1 px-0" style={{fontWeight: 600}}>Volume</p> 
                {
                    volumes.map(volume => { 
                        return (
                            <ButtonGroup toggle key={volume} className="volume-type-group mr-2">
                            <ToggleButton
                            type="checkbox"
                            variant="outline-primary"
                            checked={volumeTypes.includes(volume.toString())}
                            className = "volume-type shadow-none" 
                            value={volume}
                            onChange={(e) => handleFilter('volume', e.currentTarget.value)}
                            >
                            {volume} l
                            </ToggleButton>
                            </ButtonGroup>
                        )
                    })
                }
            </div> */}
            </Container>
            
            <div className="container-fluid px-0 mx-0">
                <Row>
                {loading && 
                <div className="items-cover">
                    <h1 className="container py-3">Loading...</h1>
                </div>
                }
                {error && 
                <div className="items-cover">
                    <h1 className="container py-3">Something went wrong.</h1>
                </div>
                }
                
                {(!loading) && (!error) ? 
                    
                    <ItemsList items={items} handleAddItem={addItem} />
                    // itemsFilter.filteredItems.map(item => {
                    //     return (
                            
                    //         <ItemCard key={item._id} handleAddItem={addItem} item={item}/>
                    //     )
                    // }) 
                    
                
                // <h1>Some Items</h1>
                : null} 
                </Row>
            </div>
        </div>
    )
}


