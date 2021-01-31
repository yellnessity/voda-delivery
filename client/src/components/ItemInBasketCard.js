import React, {useState, useEffect} from 'react'
import {Card, Button, Row} from 'react-bootstrap'

export default function ItemInBasketCard({item, handleDeleteItem, handleItemQty, handleItemPrice}) {
    const [qty, setQty] = useState(item.qty)
    const [itemPrice, setitemPrice] = useState(item.price * item.qty)

    useEffect(() => {
        // handleItemQty(item, qty)
        // handleItemPrice(item, itemPrice)
        // console.log(item.name, itemPrice)
    }, [qty])
    
    return (
        <Card className="mb-3 item-basket-card">
            <img className="cross" src="/img/exit.svg" 
            onClick={() => handleDeleteItem(item)} 
            height="15px" />
            <Card.Body className="d-flex flex-row pb-0">
                <Card.Img variant="top" src="/img/water.png" style={{height: "100px", width: "auto"}} />
                <div className="pt-3 px-3">
                <Card.Title className="text-uppercase text-left">{item.name}</Card.Title>
                <Card.Subtitle className="text-left mb-3">
                    <span>{item.category}</span>
                </Card.Subtitle>
                </div>
                
            </Card.Body>
            <Row className="mx-0 mb-3 px-4 pt-3 justify-content-start align-items-center">
                <div className="row mx-0 align-items-center" style={{fontWeight: "600", fontSize: "14px"}}>
                    <button className="button-item-qty" disabled={(qty <= 1)} onClick={() => {setQty(prevQty => prevQty - 1); setitemPrice(prevPrice => prevPrice - item.price)}}><img src="/img/arrow-left.svg" /></button>
                    <span className="px-4">{qty}</span>
                    <button className="button-item-qty" onClick={() => {setQty(prevQty => prevQty + 1); setitemPrice(prevPrice => prevPrice + item.price)}}><img src="/img/arrow-right.svg" /></button>
                    <span className="px-3">x</span>
                    <span>{item.price}$</span>
                    <span className="px-3">=</span>
                    <span style={{fontSize: "20px"}}> {itemPrice}$ </span>
                </div>
            </Row>
            
        </Card>
    )
}
