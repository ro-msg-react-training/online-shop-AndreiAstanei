import React from 'react';
import './Styles/Chapter3Style.css';
import ProductDetails from './Products/ProductDetails';
import ProductList from './Products/ProductList';
import './Styles/Chapter4Bulma/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ShoppingCart from './Products/ShoppingCart';
import Navbar from './HelperComponents/Navbar';
import './App.scss';

export interface IProduct {
  id: number,
  name: string,
  category: string,
  image: string,
  price: number,
  description: string
}

interface IProps {  }
interface IState {
  productsInShoppingCart : IProduct[];
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      productsInShoppingCart : []
    }

    console.log("App Products Array: " + this.state.productsInShoppingCart);
  }

  changeProductsInShoppingCartArray(addedProduct : IProduct){
    this.setState({
      productsInShoppingCart : this.state.productsInShoppingCart.concat(addedProduct)
    });

    console.log("ChangeFunction Called! Array: " + this.state.productsInShoppingCart.length);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Redirect exact from='/' to='/products' />
            <Route path="/products" exact component={ProductList} /> {/* Folosim render in loc de component pentru props */}
            <Route path="/products/:id" exact render = {(props) => <ProductDetails {...props} addProductToShoppingCartFunction={this.changeProductsInShoppingCartArray.bind(this)}/>} />
            <Route path="/shoppingCart" exact render = {() => <ShoppingCart productsToBeAddedToShoppingCartFromApp={this.state.productsInShoppingCart}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
//render = {() => <ProductList data={products}/>}
