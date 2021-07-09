import React, { useState, useMemo } from 'react'
// import { useSelector } from 'react-redux';
import {Card, Button, Row} from 'react-bootstrap'

export default function ItemInBasketCard({item, itemQty, totalItemPrice, onDeleteItem, onQty}) {
    const [qty, setQty] = useState(itemQty)
    const [itemPrice, setItemPrice] = useState(item.price * itemQty)

    useMemo(() => {
        onQty(item._id, qty, itemPrice)
    }, [itemPrice])
    
    return (
        <Card className="mb-3 item-basket-card">
            <img className="cross" src="/img/exit.svg" 
            onClick={() => onDeleteItem(item._id)}
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
                    <button 
                        className="button-item-qty" 
                        disabled={(qty <= 1)} 
                        onClick={() => {setQty(prevQty => prevQty - 1); setItemPrice(prevPrice => prevPrice - item.price)}}
                    >
                        <img src="/img/arrow-left.svg" />
                    </button>
                    <span className="px-4">{qty}</span>
                    <button 
                        className="button-item-qty"
                        onClick={() => {setQty(prevQty => prevQty + 1); setItemPrice(prevPrice => prevPrice + item.price)}}
                    >
                        <img src="/img/arrow-right.svg" />
                    </button>
                    <span className="px-3">x</span>
                    <span>{item.price}$</span>
                    <span className="px-3">=</span>
                    <span style={{fontSize: "20px"}}> {totalItemPrice}$ </span>
                </div>
            </Row>
            
        </Card>
    )
}
