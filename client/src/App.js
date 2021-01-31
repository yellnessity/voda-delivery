import React, {useState} from 'react'
import { Provider } from 'react-redux';
import store from './redux/store';
import { Nav } from './components';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Items from './pages/Items'
import Basket from './pages/Basket'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'

// export const BasketItemsContext = React.createContext();

function App() {

  // const [newItems, setNewItems] = useState(JSON.parse(localStorage.getItem('items')).length)

  // const updateNewItems = (value) => {
  //   setNewItems(value)
  // }

  return (
    <Router>
      <Provider store={store}>
        <div style={{minHeight: "100vh"}}>
        {/* <BasketItemsContext.Provider value={ {updateNewItems, newItems} }> */}
        <Nav/>
        <div className="px-3" style={{minHeight: "calc(100vh - 304px)"}}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/items" render={() => (
              <Items />
            )} />
            <Route path="/basket" component={Basket} />
            <Route path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
        {/* </BasketItemsContext.Provider> */}
        </div>
      </Provider>
    </Router>
    
  )
}

export default App;
