import React, { useState, useEffect, useMemo, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useFetchItems from '../useFetchItems'
import { Container, Row, Card } from 'react-bootstrap'
import ItemInBasketCard from '../components/ItemInBasketCard'
import {Link} from 'react-router-dom'
// import { BasketItemsContext } from '../App'
import { BasketPageContext } from '../pages/Basket'
import { fetchItems } from '../redux/actions/items';
import { clearCart, removeCartItem, plusCartItem, minusCartItem } from '../redux/actions/cart';

export default function Summary() {
    const dispatch = useDispatch();
    const { totalPrice, totalCount, itemsInCart } = useSelector(({ cart }) => cart);
    const { loading, error, items } = useSelector(({ items }) => items);
    // const cartItems = useSelector(({ cart }) => cart.items);

    React.useEffect(() => {
        dispatch(fetchItems({id: Object.keys(itemsInCart)})); // TODO: сохранять корзину в localStorage
    }, [itemsInCart])

    // var itemsInBasket = JSON.parse(localStorage.getItem('items'))

    // const { updateNewItems } = useContext(BasketItemsContext)
    // const { handleTotalPrice } = useContext(BasketPageContext)

    // if (itemsInBasket.length > 0) {
    //     var ids = []
    //     itemsInBasket.map(itemInBasket => {
    //         ids = [...ids, itemInBasket.item]
    //     });
    // }
    // else console.log("no items were added")
    
    // var {items, loading, error} = useFetchItems({_id: JSON.stringify(ids)});

    const [total, setTotal] = useState(0)
    const [promo, setPromo] = useState({
        code: "",
        success: null,
        activated: false
    })

    // useEffect(() => {
    //     if (itemsInBasket.length > 0) {
    //         items.map(i => {
    //             itemsInBasket.map(itemInBasket => {
    //                 if (i._id === itemInBasket.item) {
    //                     i.qty = itemInBasket.qty
    //                 }
    //             });
    //         })
    //         setCart(items)
    //     }
    //     cart.map(cartItem => {
    //         setTotal(prevTotal => prevTotal + (cartItem.price * cartItem.qty)) 
    //     })
    // }, [items])

    // useEffect(() => {
    //     // updateNewItems(itemsInBasket.length)
    // }, [itemsInBasket])

    // const [cart, setCart] = useState(items);

    // useMemo(() => {
    //     console.log('some items were deleted or quantified')
    //     cart.map(cartItem => {
    //         console.log("price is "+cartItem.price * cartItem.qty)
    //         setTotal(prevTotal => prevTotal + (cartItem.price * cartItem.qty)) 
    //     })
    // }, [itemsInBasket])

    // useMemo(()=> {
    //     let totalPrice = 0
    //     setTotal(0)
    //     cart.map(cartItem => {
    //         totalPrice = totalPrice + (cartItem.price * cartItem.qty)
            
    //         setTotal(prevTotal => prevTotal + (cartItem.price * cartItem.qty))
    //     })
    //     if (promo.success && !promo.activated)  { 
    //         setTotal(prevTotal => prevTotal*0.8)
    //     } 
    //     else setTotal(prevTotal => prevTotal)
    // }, [cart])

    // useEffect(() => {
    //     if (promo.success && !promo.activated)  { 
    //         setTotal(prevTotal => prevTotal*0.8)
    //     } 
    //     else setTotal(prevTotal => prevTotal)
    // }, [promo.success])

    // const deleteItem = (itemToDelete) => {
    //     setCart((currentCart) => {
    //         return currentCart.filter(itemInCart => 
    //             itemInCart._id !== itemToDelete._id
    //         )
    //     });
    //     itemsInBasket = itemsInBasket.filter(itemInBasket => itemInBasket.item !== itemToDelete._id)
    //     localStorage.setItem('items', JSON.stringify(itemsInBasket))
    //     console.log('pressed the delete button')
    // }

    // const handleItemQty = (item, setQty) => {
    //     setCart((currentCart) => {
    //         let changeIndex = currentCart.findIndex((cartItem) => cartItem._id === item._id)
    //         currentCart[changeIndex].qty = setQty
    //         let localStorageIndex = itemsInBasket.findIndex(itemInBasket => itemInBasket.item === item._id)
    //         itemsInBasket[localStorageIndex].qty = setQty
    //         localStorage.setItem('items', JSON.stringify(itemsInBasket))
    //         return [...currentCart]
    //     })
    // }

    // const handleItemPrice = (item, itemPrice) => {
    //     setTotal(prevTotal => prevTotal + itemPrice)
    // }

    // const handleInput = value => {
    //     setPromo({...promo, code: value})
    // }

    // const handlePromoForm = () => {
    //     console.log(promo.code)
    //     if (promo.code === "OFFICE20" && !promo.success) {
    //         setPromo(prevPromo => prevPromo = {...prevPromo, success: true})
    //     }
    //     else if (promo.code === "OFFICE20" && promo.success) {
    //         setPromo(prevPromo => prevPromo = {...prevPromo, activated: true})
    //     }
    //     else setPromo(prevPromo => prevPromo = {...prevPromo, success: false})
    // }

    return (
        <Container className="basketList py-5 h-100" fluid>
                    <Row className="container px-0">
                        <Container className="col-6 px-0">
                        {loading && <h1>Loading...</h1>}
                        {error && <h1>Something went wrong.</h1>}
                        {/* {(cart.length === 0) && <h1>Basket is empty</h1>} */}
                        {(!loading) && (!error) ? 
                        (items.length > 0) ? 
                        items.map(item => {
                            return (
                                <ItemInBasketCard key={item._id} item={item} className="mx-0" />
                            )
                        }) : <h3 className="text-secondary">You have an empty basket. <br />Go grab some water and stay hydrated!</h3>
                        : null}
                        </Container>
                        <Container className="col-6 px-0">
                            <Card className="total-card">
                                <Card.Body className="">
                                    <Card.Title className="py-3">Summary</Card.Title>
                                    <Row >
                                        <form className="d-flex justify-content-between mx-0 container" onSubmit={e => {
                                            e.preventDefault()
                                            // handlePromoForm()
                                            }}>
                                            <input type="text" style={{minWidth: '200px'}} placeholder="Promocode" defaultValue={promo.code} 
                                            // onChange={event => handleInput(event.target.value)}
                                            ></input>
                                            <button type="submit" className="promocode-button">Apply</button>
                                        </form>
                                        
                                    </Row>
                                    {(promo.success !== null) ? ((promo.success) ? (!promo.activated ? <small className="text-success">Promocode Applied!</small> : <small className="text-secondary">You have already used this promocode.</small>) : <small className="text-danger">Wrong promocode.</small>) : null }
                                </Card.Body>
                                <hr></hr>
                                <Card.Footer>
                                <Card.Text className="d-flex justify-content-between">
                                        <span className="total-text">Total:</span>
                                        <span className="total-sum">{total}$</span>
                                </Card.Text>
                                <Link className={'btn' + ' total-button' + (items.length > 0 ? "" : ' disabled')} 
                                // onClick={() => handleTotalPrice(total)} 
                                to="/basket/payment">Order</Link>
                                </Card.Footer>
                            </Card>
                        
                        </Container>
                    </Row>
                    
                </Container>
    )
}
