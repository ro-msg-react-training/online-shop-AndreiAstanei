import React from 'react';
import './Styles/ComponentsStyles/AppStyles/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './HelperComponents/Navbar';
import './App.scss';
import SalesViewInitializer from './Components/SalesComponent/SalesSmartView';
import ProductListViewInitializer from './Components/ProductListComponent/ProductListSmartView';
import ProductDetailsViewInitializer from './Components/ProductDetailsComponent/ProductDetailsSmartView';
import ShoppingCartViewInitializer from './Components/ShoppingCartComponent/ShoppingCartSmartView';
import EditProductPageViewInitializer from './Components/EditProductPageComponent/EditProductSmartView';
import NewProductViewInitializer from './Components/NewProductComponent/NewProductSmartView';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Redirect exact from='/' to='/products' />
            <Route path="/products" exact component = {ProductListViewInitializer}/>
            <Route path="/products/:id" exact render={(props) => <ProductDetailsViewInitializer {...props} />} />
            <Route path="/shoppingCart" exact component = {ShoppingCartViewInitializer} />
            <Route path="/editProduct/:id" exact render={(props) => <EditProductPageViewInitializer {...props}/>} />
            <Route path="/newProduct" exact render={(props) => <NewProductViewInitializer {...props}/>}/>
            <Route path="/sales" exact render={(props) => <SalesViewInitializer match = {props.match}/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}