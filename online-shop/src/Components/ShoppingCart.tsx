import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ShoppingCartStyles.scss';
import { IProduct } from '../Models/Models';
import { ProductsImages as ProductImages } from '../Models/Models';
import { AppState } from '../ReduxStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addProductToCart } from '../ReduxStore/ShoppingCartSection/actions';

interface ShoppingCartProps {
  match?: any;
  shoppingCartUniqueItemsArray: IProduct[];

  decreaseProductQuantity: (productID: number) => void;
  completelyRemoveProductFromStore: (productID : number) => void;
  calculateNumberOfSameItem: (productId: number) => number;
  calculateTotalPrice: () => void;
  checkoutShoppingCart: () => void;

  //Din store
  productsInShoppingCart : IProduct[];
  checkoutActionStatus: number;
  addProductToCart: (updatedProductsInShoppingCart : IProduct, updatedCheckoutStatus : number) => void;
}

interface AdditionalShoppingCartState {
  match?: any;
  shoppingCartUniqueItemsArray: IProduct[];

  decreaseProductQuantity: (productID: number) => void;
  completelyRemoveProductFromStore: (productID : number) => void;
  calculateNumberOfSameItem: (productId: number) => number;
  calculateTotalPrice: () => void;
  checkoutShoppingCart: () => void;
}

class ShoppingCart extends React.Component<ShoppingCartProps> {
  constructor(props: ShoppingCartProps) {
    super(props);

    this.state = {
      shoppingCartUniqueItemsArray: this.props.shoppingCartUniqueItemsArray
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
    this.props.addProductToCart(product, 0);
  }

  onCheckoutClicked() {
    this.props.checkoutShoppingCart();
  }

  render() {
    let product = this.props.shoppingCartUniqueItemsArray.map(
      (product: IProduct) =>
      <div key={product.id + "Key"} className = "ShoppingCartProducts">
        <div className="columns box is-vcentered has-text-centered">
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
              <p className="title has-text-grey-dark has-text-weight-light">Products in cart: {this.props.productsInShoppingCart.length}</p>
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

const mapStateToProps = (state : AppState, additionalState : AdditionalShoppingCartState) => ({
  match: additionalState.match,
  shoppingCartUniqueItemsArray: additionalState.shoppingCartUniqueItemsArray,

  decreaseProductQuantity: additionalState.decreaseProductQuantity,
  completelyRemoveProductFromStore: additionalState.completelyRemoveProductFromStore,
  calculateNumberOfSameItem: additionalState.calculateNumberOfSameItem,
  calculateTotalPrice: additionalState.calculateTotalPrice,
  checkoutShoppingCart: additionalState.checkoutShoppingCart,

  //Din store
  productsInShoppingCart : state.cartReducer.productsInShoppingCart,
  checkoutActionStatus: state.cartReducer.checkoutActionStatus
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  addProductToCart: (updatedProductsInShoppingCart : IProduct, updatedCheckoutStatus : number) => dispatch(addProductToCart(updatedProductsInShoppingCart,updatedCheckoutStatus ))
});

const ShoppingCartInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

export default ShoppingCartInitializer;