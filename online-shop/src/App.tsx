import React from 'react';
import './Styles/Chapter3Style.css';
import ProductDetails from './Products/ProductDetails';
import ProductList from './Products/ProductList';
import './Styles/ComponentsStyles/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ShoppingCart from './Products/ShoppingCart';
import Navbar from './HelperComponents/Navbar';
import './App.scss';
import { IProduct } from './Models/Models';

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
  }

  addProductToCart(addedProduct : IProduct){
    this.setState({
      productsInShoppingCart : [...this.state.productsInShoppingCart, addedProduct]
    });
  }

  decreaseProductQuantityFromShoppingCart(productId : number) {
    let shoppingArrayIndex = this.state.productsInShoppingCart.findIndex(i => i.id === productId);

    if (shoppingArrayIndex > -1) {
      console.log("Delete at index " + shoppingArrayIndex);
      this.setState({
        productsInShoppingCart : this.state.productsInShoppingCart.splice(shoppingArrayIndex, 1)
      });
      // this.state.productsInShoppingCart.splice(shoppingArrayIndex, 1);
    }
  }

  completlyRemoveProductFromShoppingCart(productId : number) {
    // let shoppingArrayIndex = this.state.productsInShoppingCart.findIndex(i => i.id === productId);

    /* 
      E posibil sa am probleme de la faptul ca folosesc doua arrays, iar cumva cele doua se bat intre ele. cu while intra in bucla infinita
    */
    // while (shoppingArrayIndex > -1) {
    //   console.log("Delete at index " + shoppingArrayIndex);
    //   this.setState({
    //     productsInShoppingCart : this.state.productsInShoppingCart.splice(shoppingArrayIndex, 1)
    //   });
    // }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Redirect exact from='/' to='/products' />
            <Route path="/products" exact component={ProductList} /> {/* Folosim render in loc de component pentru props */}
            <Route path="/products/:id" exact render = {(props) => <ProductDetails {...props} addProductToShoppingCartFunction={this.addProductToCart.bind(this)}/>} />
            <Route path="/shoppingCart" exact render = {() => <ShoppingCart productsToBeAddedToShoppingCartFromApp={this.state.productsInShoppingCart} decreaseProductQuantityFromShoppingCart={this.decreaseProductQuantityFromShoppingCart.bind(this)} completlyRemoveProductFromShoppingCart={this.completlyRemoveProductFromShoppingCart.bind(this)}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}