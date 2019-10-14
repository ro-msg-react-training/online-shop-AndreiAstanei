import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ShoppingCartStyles.scss';
import { IProduct } from '../Models/Models';
import { ProductsImages as ProductImages } from '../Models/Models';

interface IProps {
  match?: any;
  productsToBeAddedToShoppingCartFromApp: IProduct[];
  decreaseProductQuantityFromShoppingCart: any;
  calculateNumberOfSameItem: any;
  calculateTotalPrice: any;
  uniqueProductsInShoppingCart: IProduct[];
  decreaseProductQuantity: any;
  completelyRemoveProductFromStore: any;
  addProductToCart: any;
  checkoutShoppingCart: any;
  checkoutActionStatus: number;
}

interface IState {
  addedProductsForCheckout: IProduct[];
  shoppingCartUniqueItemsArray: IProduct[];
}

export default class ShoppingCart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      addedProductsForCheckout: this.props.productsToBeAddedToShoppingCartFromApp,
      shoppingCartUniqueItemsArray: this.props.uniqueProductsInShoppingCart
    }
  }

  onDeleteProductPressed = (productID: number): any => {
    //removing product from both arrays untill it is completely gone
    while (this.props.calculateNumberOfSameItem(productID)) {
      this.props.decreaseProductQuantity(productID);
    }
  }

  onDecreaseProductQuantity = (productID: number): any => {
    this.props.decreaseProductQuantity(productID);
  }

  onIncreaseProductQuantity = (product: IProduct): any => {
    this.props.addProductToCart(product);
  }

  onCheckoutClicked() {
    this.props.checkoutShoppingCart();
  }

  render() {
    let product = this.state.shoppingCartUniqueItemsArray.map(
      (product: IProduct) =>
      <div className = "ShoppingCartProducts">
        <div key={product.id + "Key"} className="columns box is-vcentered has-text-centered">
          <div className="column">
            <Link to={`/products/${product.id}`}>
              <img src={ProductImages[product.id].imageUrl} className="imageForShoppingCartProducts ProductsListImages" alt={product.category + " " + product.id} />
            </Link>
          </div>
          <div className="column">
            <Link to={`/products/${product.id}`}>
              <p className="is-size-6 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
              <p className="is-size-6 has-text-price-color has-text-weight-semibold">{this.props.calculateNumberOfSameItem(product.id) * product.price} lei</p>
              <p className="is-size-7 has-text-grey">In {product.category}</p>
            </Link>
          </div>
          <div className="column">
            <p className="is-size-6 has-text-grey has-text-weight-semibold">Quantity</p>
            <div className="columns is-gapless">
              <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick={this.onDecreaseProductQuantity.bind(this, product.id)}>-</button></div>
              <div className="column"><p className="is-vcentered has-text-weight-semibold is-size-6">{this.props.calculateNumberOfSameItem(product.id)}</p></div>
              <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick={this.onIncreaseProductQuantity.bind(this, product)}>+</button></div>
            </div>
            <button className="button is-danger" onClick={this.onDeleteProductPressed.bind(this, product.id)}>Delete product</button>
          </div>
        </div>
        </div>
    );

    if (this.props.checkoutActionStatus === 0) {
      return (
        <div className="container is-fluid">
          <div className='level'>
            <div className='level-item level-left'>
              <p className="title has-text-grey-dark has-text-weight-light">Products in cart: {this.props.productsToBeAddedToShoppingCartFromApp.length}</p>
            </div>
            <div className='level-item level-right'>
              <p id = "shoppingCartPriceTag" className="title has-text-grey-dark has-text-weight-light">Total: {this.props.calculateTotalPrice()} lei</p>
              <button className="button is-primary is-medium is-outlined" onClick={this.onCheckoutClicked.bind(this)}>
                <span className="icon">
                  <i className="fas fa-cart-arrow-down" />
                </span>
                <span>Checkout</span>
              </button>
            </div>
          </div>
          <hr />
          <div className="level">
            <div className="level-item">
              <div>
                {product}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.checkoutActionStatus === 201) {
      return (
        <div className="container has-text-centered">
          <h1 className="has-text-success has-text-weight-semi-bold is-size-3">Successfully placed order!</h1>
          <Link to="/products">
            <button className="button is-text has-text-success is-medium">
              Back to products catalog
            </button>
          </Link>
        </div>
      );
    } else if (this.props.checkoutActionStatus === 401) {
      return (
        <div className="container has-text-centered">
          <h1 className="has-text-danger has-text-weight-semi-bold is-size-3">A problem appeared while placing the order, please try again later.</h1>
        </div>
      );
    } else if (this.props.checkoutActionStatus === 999) {
      return (
        <div className="container has-text-centered">
          <h1 className="has-text-danger has-text-weight-semi-bold is-size-3">There has been a problem while communicating with the server, please check back later.</h1>
        </div>
      );
    }
  }
}