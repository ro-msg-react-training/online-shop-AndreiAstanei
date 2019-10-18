import React from 'react';
import './Styles/Chapter3Style.css';
import ProductDetails from './Components/ProductDetails';
import ProductList from './Components/ProductList';
import './Styles/ComponentsStyles/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ShoppingCart from './Components/ShoppingCart';
import Navbar from './HelperComponents/Navbar';
import './App.scss';
import { IProduct, CheckoutArrayItem } from './Models/Models';

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

  addProductToCart(addedProduct: IProduct) {
    this.setState({
      productsInShoppingCart: [...this.state.productsInShoppingCart, addedProduct],
      checkoutActionStatus: 0
    });
  }

  decreaseProductQuantityFromShoppingCart(productId: number) {
    let shoppingArrayIndex = this.state.productsInShoppingCart.findIndex(i => i.id === productId);

    if (shoppingArrayIndex > -1) {
      //am pus asta aici si merge acum
      this.state.productsInShoppingCart.splice(shoppingArrayIndex, 1);

      this.setState({
        productsInShoppingCart: this.state.productsInShoppingCart
      });
    }
  }

  // *** METHODS FOR SHOPPING CART *** START
  calculateNumberOfSameItem(productId: number): number {
    let numberOfSameProduct = 0;

    this.state.productsInShoppingCart.forEach(
      (product) => {
        if (product.id === productId) {
          numberOfSameProduct++
        }
      });

    return numberOfSameProduct;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    if (this.state.productsInShoppingCart.length === 0) {
      return totalPrice;
    }

    this.state.productsInShoppingCart.forEach(
      (product) => {
        totalPrice += product.price
      }
    );

    return totalPrice;
  }

  removeDuplicatesFromMainArray(arrayToParse: IProduct[]) {
    //pentru fiecare element din state
    arrayToParse.forEach((product) => {

      let flagProductAlreadyExists: boolean = true;

      //verificam daca este in unique, in cazul in care unique are macar 1 element
      if (this.state.uniqueProductsInShoppingCart.length) {
        this.state.uniqueProductsInShoppingCart.forEach((uniqueProduct) => {
          if (product.id === uniqueProduct.id) {
            flagProductAlreadyExists = false;
          }
        });
      }

      if (flagProductAlreadyExists) {
        this.setState({
          uniqueProductsInShoppingCart: [...this.state.uniqueProductsInShoppingCart, product],
          checkoutActionStatus: 0
        })
      }
    });
  }

  removeItemFromUniqueArray(productID: number) {
    const productIndexInUniqueArray = this.state.uniqueProductsInShoppingCart.findIndex(i => i.id === productID)

    if (productIndexInUniqueArray > -1) {
      this.state.uniqueProductsInShoppingCart.splice(productIndexInUniqueArray, 1);

      this.setState({
        uniqueProductsInShoppingCart: this.state.uniqueProductsInShoppingCart
      });
    }
  }

  decreaseProductQuantity = (productID: number): any => {
    if (this.calculateNumberOfSameItem(productID) > 1) {
      this.decreaseProductQuantityFromShoppingCart(productID);

    } else if (this.calculateNumberOfSameItem(productID) === 1) {
      this.decreaseProductQuantityFromShoppingCart(productID);
      this.removeItemFromUniqueArray(productID);
    }
  }

  // *** METHODS FOR SHOPPING CART *** END
  //Removing product from shopping cart
  completelyRemoveProductFromStore = (productID: number) => {
    while (this.calculateNumberOfSameItem(productID)) {
      this.decreaseProductQuantity(productID);
    }
  }

  generateCheckoutArray(): CheckoutArrayItem[] {
    let customCheckoutArray: Array<CheckoutArrayItem> = this.state.uniqueProductsInShoppingCart.map(product => ({ 'productId': product.id, 'quantity': this.calculateNumberOfSameItem(product.id) }));

    return customCheckoutArray;
  }

  checkoutShoppingCart() {
    const checkoutValue = `{"customer": "doej", "products": ${JSON.stringify(this.generateCheckoutArray())}}`;
    const ordersApiEndpointUrl = "http://localhost:4000/orders/";

    const { productsInShoppingCart, uniqueProductsInShoppingCart } = this.state;

    for (let i = 0; i < uniqueProductsInShoppingCart.length; i++) {
      if (true) {
        while (uniqueProductsInShoppingCart.length >= 1) {
          this.decreaseProductQuantity(uniqueProductsInShoppingCart[i].id);
        }
      }
    }

    fetch(ordersApiEndpointUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, method: 'POST', body: checkoutValue
    })
      .then(response => {
        this.setState({
          checkoutActionStatus: response.status
        })
      })
      .then(result => console.log(result))
      .catch(error => {console.log(error); this.setState({
        checkoutActionStatus: 999
      });});
  }

  resetShoppingCartState() {
    this.setState({
      checkoutActionStatus: 0
    });
  }

  render() {
    this.removeDuplicatesFromMainArray(this.state.productsInShoppingCart);

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Redirect exact from='/' to='/products' />
            <Route path="/products" exact render = {(props) => <ProductList {...props} resetShoppingCartState = {this.resetShoppingCartState.bind(this)}/>}/>
            <Route path="/products/:id" exact render={(props) => <ProductDetails {...props} addProductToShoppingCartFunction={this.addProductToCart.bind(this)} completelyRemoveProductFromStore={this.completelyRemoveProductFromStore.bind(this)} />} />
            <Route path="/shoppingCart" exact render={() => <ShoppingCart productsToBeAddedToShoppingCartFromApp={this.state.productsInShoppingCart} calculateNumberOfSameItem={this.calculateNumberOfSameItem.bind(this)} calculateTotalPrice={this.calculateTotalPrice.bind(this)} uniqueProductsInShoppingCart={this.state.uniqueProductsInShoppingCart} decreaseProductQuantity={this.decreaseProductQuantity.bind(this)} addProductToCart={this.addProductToCart.bind(this)} checkoutShoppingCart={this.checkoutShoppingCart.bind(this)} checkoutActionStatus={this.state.checkoutActionStatus} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}