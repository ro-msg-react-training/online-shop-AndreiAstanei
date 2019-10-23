import React from 'react';
import './Styles/Chapter3Style.css';
import ProductDetails from './Components/ProductDetails';
import ProductList from './Components/ProductList';
import './Styles/ComponentsStyles/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ShoppingCart from './Components/ShoppingCart';
import EditProductPage from './Components/EditProductPage';
import Navbar from './HelperComponents/Navbar';
import './App.scss';
import { IProduct } from './Models/Models';
import NewProductInitializer from './Components/NewProduct';

interface IProps { }
interface IState {
  productsInShoppingCart: IProduct[];
  uniqueProductsInShoppingCart: IProduct[];
  checkoutActionStatus: number;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      productsInShoppingCart: [],
      uniqueProductsInShoppingCart: [],
      checkoutActionStatus: 0
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Redirect exact from='/' to='/products' />
            <Route path="/products" exact render = {(props) => <ProductList {...props} />}/>
            <Route path="/products/:id" exact render={(props) => <ProductDetails {...props} />} />
            <Route path="/shoppingCart" exact render={() => <ShoppingCart />} />
            <Route path="/editProduct/:id" exact render={(props) => <EditProductPage match = {props.match}/>} />
            <Route path="/newProduct" exact render={(props) => <NewProductInitializer match = {props.match}/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}