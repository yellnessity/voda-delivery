import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Card, Badge } from 'react-bootstrap'
import ItemInBasketCard from '../components/ItemInBasketCard'
import {Link} from 'react-router-dom'
import { fetchItems } from '../redux/actions/items';
import { doUsePromocode } from '../redux/actions/cart';
import { removeCartItem, setCartItemQty } from '../redux/actions/cart';

export default function Summary() {
    const dispatch = useDispatch();
    const { totalPrice, totalCount, itemsInCart, promo } = useSelector(({ cart }) => cart);
    const { loading, error, items } = useSelector(({ items }) => items);

    useEffect(() => {
        dispatch(fetchItems({}));
    }, [])

    const [total, setTotal] = useState(0)
    const [localPromo, setLocalPromo] = useState(promo)

    const removeItem = (id) => {
        dispatch(removeCartItem(id));
    };

    const handleItemQty = (id, qty, itemPrice) => {
        dispatch(setCartItemQty(id, qty, itemPrice));
    };

    const handlePromoInput = (value) => {
        setLocalPromo(prevState => prevState = {...prevState, code: value});
    }

    const handlePromoForm = async () => {
        setLocalPromo(prevState => prevState = {...prevState, loading: true});
        let { data } = await dispatch(doUsePromocode(localPromo.code));
        console.log(data.success);
        if (data.success) {
            setLocalPromo(prevState => prevState = {...prevState, success: data.success, discount: data.discount, activated: true, loading: false});
        }
        else {
            setLocalPromo(prevState => prevState = {...prevState, success: data.success, activated: false, loading: false});
        }
    }

    return (
        <Container className="basketList py-5 h-100" fluid>
                    <Row className="container px-0">
                        <Container className="col-6 px-0">
                        {loading && <h1 style={{textAlign: 'center'}}>Loading...</h1>}
                        {error && <h1>Something went wrong.</h1>}
                        {/* {(cart.length === 0) && <h1>Basket is empty</h1>} */}
                        {(!loading) && (!error) ? 
                        (Object.keys(itemsInCart).length > 0) ? 
                        items.map(item => {
                            if (Object.keys(itemsInCart).includes(item._id)) return (
                                <ItemInBasketCard 
                                    key={item._id} 
                                    item={item} 
                                    itemQty={itemsInCart[item._id]?.qty} 
                                    totalItemPrice={itemsInCart[item._id]?.price}
                                    onQty={handleItemQty}
                                    onDeleteItem={removeItem}
                                    className="mx-0" 
                                />
                            )
                        }) : <h3 className="text-secondary">You have an empty basket. <br />Go grab some water and stay hydrated!</h3>
                        : null}
                        </Container>
                        <Container className="col-6 px-0">
                            <Card className="total-card">
                                <Card.Body className="">
                                    <Card.Title className="pt-3">Summary</Card.Title>
                                    { (!promo.activated || !promo.success) && (
                                    <Row className="mt-3">
                                        <form className="d-flex justify-content-between mx-0 container" onSubmit={e => {
                                            e.preventDefault()
                                            handlePromoForm()
                                            }}>
                                            <input type="text" style={{minWidth: '200px'}} placeholder="Promocode" defaultValue={localPromo.code} 
                                            onChange={event => handlePromoInput(event.target.value)}
                                            ></input>
                                            <button type="submit" disabled={localPromo.loading} className="promocode-button">{localPromo.loading ? 'Loading…' : 'Apply'}</button>
                                        </form>
                                    </Row>)
                                    }
                                    {(!localPromo.activated) ? ((localPromo.success) ? <small className="text-success">Promocode Applied!</small> : <small className="text-danger">Wrong promocode.</small>) : null }
                                    
                                </Card.Body>
                                <hr></hr>
                                <Card.Footer>
                                {
                                    (promo.activated && promo.success) && (
                                    <div className="mb-3">
                                        <p className="mb-2">Promocodes: </p>
                                        <Row style={{padding: "0 15px", fontWeight: "500"}}>
                                            <p className="font-weight-semibold mb-0">{promo.code}</p>
                                            <Badge variant="success" className="ml-2">-{promo.discount * 100}%</Badge>
                                        </Row>
                                    </div>
                                    )
                                }
                                <Card.Text className="d-flex justify-content-between">
                                        <span className="total-text">Total:</span>
                                        <span className="total-sum">{totalPrice}$</span>
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
