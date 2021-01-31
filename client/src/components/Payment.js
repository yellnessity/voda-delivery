import React, {useState, useEffect, useContext} from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { TextField, Input, Button, ThemeProvider, makeStyles } from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import { BasketPageContext } from '../pages/Basket'
import { theme } from '../Theme'

export default function Payment() {

    const { totalPrice } = useContext(BasketPageContext)

    const [details, setDetails] = useState({
        address: '',
        time: {
            hm: '',
            period: ''
        },
        recipient: {
            name: '',
            phone: ''
        }
    })

    const [total, setTotal] = useState({
        price: totalPrice,
        qty: JSON.parse(localStorage.getItem('items')).length
    })

    const handleSubmit = () => {
        console.log(details)
    }

    const time = new Date();

    return (
        
        (JSON.parse(localStorage.getItem('items')).length > 0) ? 
        <ThemeProvider theme={theme}>
            <Container className="payment" fluid>
            <Row className="container px-0">
                <form className="col-6 pl-0">
                <Card className="w-100 payment-card my-3 py-2">
                <Card.Title style={{fontWeight: 600}} className="container py-3">Checkout</Card.Title>
                    <Card.Body>
                        <div className="mb-4">
                            <p className="mb-1 font-weight-bold" style={{fontWeight: 600}}>1. Address</p>  
                            <Input required style={{width: '75%'}} type="text" placeholder="Please provide your location..." onChange={event => setDetails({...details, address:event.target.value})} />
                        </div>
                        <div className="mb-4">
                            <p style={{fontWeight: 600}} className="mb-1 font-weight-bold">2. Time</p>  
                            <TextField
                                required
                                id="time"
                                type="time"
                                defaultValue="12:30"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="mb-1 font-weight-bold" style={{fontWeight: 600}}>3. Contact details</p>  
                            <Input required style={{width: '75%'}} type="text" placeholder="Please provide your name..." onChange={event => setDetails({...details, recipient:{ ...details.recipient, name:event.target.value }})} />
                            <Input required style={{width: '75%', marginTop: '1rem'}} type="text" placeholder="...and your phone" onChange={event => setDetails({...details, recipient:{ ...details.recipient, phone:event.target.value }})} />
                        </div>
                        {/* <Link 
                            className="btn total-button" 
                            onClick={handleSubmit} 
                            style={{color: "black", fontWeight: 600}}
                            to="/basket/payment" 
                        >
                            Proceed
                        </Link> */}
                        <button 
                            type="submit" 
                            className="btn total-button" 
                            style={{color: "black", fontWeight: 600}}
                        >
                            Proceed to payment
                        </button>
                        {/* <Button variant="contained" color="primary" fullWidth>Proceed</Button> */}
                      </Card.Body>
                      
                </Card>
                </form>
                <Container className="col-6 pr-0">
                    <Card className="payment-card my-3 py-2 px-4">
                        <Card.Text className="d-flex justify-content-between align-items-center mb-0 pt-3 px-0">
                            <h3 className="mb-0 font-weight-bold">Total price</h3>
                            <span className="total-sum">{total.price}$</span>
                        </Card.Text>
                        <hr></hr>
                        <Card.Footer className="px-0 pt-0">
                            <p style={{fontWeight: 600}} className="my-0">{total.qty} items</p>
                        </Card.Footer>
                    </Card>
                </Container>
                
            </Row>
            </Container>
        </ThemeProvider>
        
         :
        <Redirect to="/not-found" />
    )
}
