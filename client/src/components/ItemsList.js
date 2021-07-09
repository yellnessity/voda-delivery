import React from 'react'
import ItemCard from '../components/ItemCard'
import {Row, Container} from 'react-bootstrap'

export default function ItemsList({items, handleAddItem}) {
    return (
        <>
        
        <div className="container-fluid items-cover">
        
        <Container className="my-3 px-0">
        <h3 className="my-3" style={{fontWeight: 600}}>Bottled water</h3>
        <Row>
        {
            items.filter(item => !item.pack).length ?
            items.map(item => {
                if (!item.pack) return <ItemCard key={item._id} handleAddItem={handleAddItem} item={item}/>
                else return null
            }) :
            <p className='container px-0 text-secondary'>Sorry, no items were found.</p>
        }
        </Row>
        </Container>
        </div>
        
        <div className="container-fluid items-cover">
        
        <Container className="my-3 px-0">
        <h3 className="my-3" style={{fontWeight: 600}}>Packs of water</h3>
        <Row>
        {
            items.filter(item => item.pack).length ?
            items.map(item => {
                if (item.pack) return <ItemCard key={item._id} handleAddItem={handleAddItem} item={item}/>
                else return null
            }):
            <p className='container px-0 text-secondary'>Sorry, no items were found.</p>
            
        }
        </Row>
        </Container>
        </div>
        
        
        
            
        </>
    )
}
