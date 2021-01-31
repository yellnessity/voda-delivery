import React, {useState} from 'react'
import {Card, Button, Row} from 'react-bootstrap'

export default function ItemCard({ item, handleAddItem }) {

    const [qty, setQty] = useState(1)

    return (
        <Card className="mb-4 item-card mx-3">
            <img className="item-water" src="./img/water.png" style={{width: "auto"}} />
            <Card.Body className="card-item-body pb-0">
                <Card.Title className="text-uppercase text-center" style={{fontSize: "20px"}}>{item.name}</Card.Title>
                <Card.Subtitle style={{fontSize: "18px"}} className="text-center mb-3">
                    <span>{item.category}</span>
                    {item.pack && <p className="text-secondary pt-1">{item.count} pcs.</p>}
                </Card.Subtitle>
            </Card.Body>
            <Row className="mx-0 px-4 justify-content-around align-items-center">
                <span className="item-price">{item.price}$</span> 
                <div className="row mx-0 align-items-center">
                    <button className="button-item-qty" disabled={(qty <= 1)} onClick={() => setQty(prevQty => prevQty - 1)}><img src="./img/arrow-left.svg" /></button>
                    <span className="px-2">{qty}</span>
                    <button className="button-item-qty" onClick={() => setQty(prevQty => prevQty + 1)}><img src="./img/arrow-right.svg" /></button>
                </div>
            </Row>
            <button className="mx-auto add-button my-4" onClick={() => handleAddItem({...item, qty})}>Add</button>
            
        </Card>
    )
}
