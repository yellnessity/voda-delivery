import React, {useState} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Summary, Payment } from '../components'
import NotFound from './NotFound'
import usePersistedData from '../usePersistedData'

export const BasketPageContext = React.createContext();

export default function Basket() {

    const [totalPrice, setTotalPrice] = usePersistedData('total', 0)
    const handleTotalPrice = (value) => {
        setTotalPrice(value)
    }
    return (
        <>
        <BasketPageContext.Provider value={ { handleTotalPrice, totalPrice } }>
            <Container fluid className="px-0 my-3 h-100">
                <Container fluid className="basket-header px-0">
                    <h1 className="container px-0 font-weight-bold py-3">Basket</h1>
                </Container>
                <Switch>
                        <Route path="/basket/summary" render={() => (
                            <Summary />
                        )} />
                        <Route path="/basket/payment" render={() => (
                            <Payment />
                        )} />
                        <Route component={NotFound} />
                </Switch>
                    
            </Container>
        </BasketPageContext.Provider>
            
        </>
    )
}
