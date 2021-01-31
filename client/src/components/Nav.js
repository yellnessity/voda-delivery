import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {Badge} from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function Nav() {

    const { totalCount } = useSelector(({ cart }) => cart);

    return (
        <>
        <nav>
            <div className="nav-container">
                <img src="/img/logo.svg" height="100%" alt="logo" />
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/items">Items</Link></li>
                    <li>
                        <Link to="/basket/summary">
                            <img src="/img/cart.svg" height="50" alt="basket" />
                            <Badge className="items-number" pill variant="info">
                            {totalCount}
                            </Badge>
                        </Link>
                        
                    </li>
                </ul>
            </div>
            
        </nav>
        </>
    )
}
