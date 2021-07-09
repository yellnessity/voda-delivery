import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store';
import { Nav } from './components';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Items from './pages/Items'
import Basket from './pages/Basket'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Provider store={store}>
        <div style={{minHeight: "100vh"}}>
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
        </div>
      </Provider>
    </Router>
  )
}

export default App;
