import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ShoppingCartStyles.scss';
import { IProduct, CheckoutArrayItem } from '../../Models/Models';
import { AppState } from '../../ReduxStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addProductToCart, decreaseProductQuantity } from '../../ReduxStore/ShoppingCartSection/actions';
import { CHECKOUT_SHOPPING_CART } from '../../ReduxStore/ShoppingCartSection/types';

interface ShoppingCartProps {
  match: any;
  //Din store
  productsInShoppingCart: IProduct[];
  uniqueProductsInShoppingCart: IProduct[];
  checkoutActionStatus: number;
  numberOfProductsInShoppingCart : number;
  totalPriceForShoppingCart : number;
  addProductToCart: (updatedProductsInShoppingCart: IProduct) => void;
  decreaseProductQuantity: (productID: number, deleteMode : number) => void;
  checkoutShoppingCart: (generatedStringForApiCall : string) => void;
}

interface AdditionalShoppingCartState {
  match: any;
}

class ShoppingCart extends React.Component<ShoppingCartProps> {  
  onDeleteProductPressed = (productID: number): any => {
    //removing product from both arrays untill it is completely gone
      this.props.decreaseProductQuantity(productID, 2);

  }

  onDecreaseProductQuantity = (productID: number): any => {
    this.props.decreaseProductQuantity(productID, 1);
  }

  onIncreaseProductQuantity = (product: IProduct): any => {
    this.props.addProductToCart(product);
  }

  onCheckoutClicked() {
    const checkoutValue : string = `{"customer": "doej", "products": ${JSON.stringify(this.generateCheckoutArray(this.props.uniqueProductsInShoppingCart))}}`;

    this.props.checkoutShoppingCart(checkoutValue);
  }

  calculateNumberOfSameItem = (arrayToCalculateFrom: IProduct[], productId: number): number => {
  let numberOfSameProduct = 0;

  arrayToCalculateFrom.forEach(
      (product) => {
          if (product.id === productId) {
              numberOfSameProduct++;
          }
      });

  return numberOfSameProduct;
}

  generateCheckoutArray = (arrayToGenerateCheckoutValueFrom : IProduct[]): CheckoutArrayItem[] => {
    let customCheckoutArray: Array<CheckoutArrayItem> = arrayToGenerateCheckoutValueFrom.map(product => ({ 'productId': product.id, 'quantity': this.calculateNumberOfSameItem(this.props.productsInShoppingCart, product.id) }));

    return customCheckoutArray;
  }

  render() {
    if (this.props.checkoutActionStatus === 0) {
      let product = this.props.uniqueProductsInShoppingCart.map(
        (product: IProduct) =>
          <div key={product.id + "Key"} className="ShoppingCartProducts">
            <div className="columns box is-vcentered has-text-centered">
              <div className="column">
                <Link to={`/products/${product.id}`}>
                  <img src={/* ProductsImages[product.id] ? ProductsImages[product.id].imageUrl : */"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png"} className="imageForShoppingCartProducts ProductsListImages" alt={product.category + " " + product.id} />
                </Link>
              </div>
              <div className="column">
                <Link to={`/products/${product.id}`}>
                  <p className="is-size-6 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
                  <p className="is-size-6 has-text-price-color has-text-weight-semibold">{this.calculateNumberOfSameItem(this.props.productsInShoppingCart, product.id) * product.price} lei</p>
                  <p className="is-size-7 has-text-grey">In {product.category}</p>
                </Link>
              </div>
              <div className="column">
                <p className="is-size-6 has-text-grey has-text-weight-semibold">Quantity</p>
                <div className="columns is-gapless">
                  <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick={this.onDecreaseProductQuantity.bind(this, product.id)}>-</button></div>
                  <div className="column"><p className="is-vcentered has-text-weight-semibold is-size-6">{this.calculateNumberOfSameItem(this.props.productsInShoppingCart, product.id)}</p></div>
                  <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick={this.onIncreaseProductQuantity.bind(this, product)}>+</button></div>
                </div>
                <button className="button is-danger" onClick={this.onDeleteProductPressed.bind(this, product.id)}>Delete product</button>
              </div>
            </div>
          </div>
      );

      return (
        <div className="container is-fluid">
          <div className='level'>
            <div className='level-item level-left'>
              <p className="title has-text-grey-dark has-text-weight-light">Products in cart: {this.props.numberOfProductsInShoppingCart}</p>
            </div>
            <div className='level-item level-right'>
              <p id="shoppingCartPriceTag" className="title has-text-grey-dark has-text-weight-light">Total: {this.props.totalPriceForShoppingCart} lei</p>
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

const mapStateToProps = (state: AppState, additionalState: AdditionalShoppingCartState) => ({
  match: additionalState.match,
  //Din store
  productsInShoppingCart: state.cartReducer.productsInShoppingCart,
  uniqueProductsInShoppingCart: state.cartReducer.uniqueProductsInShoppingCart,
  checkoutActionStatus: state.cartReducer.checkoutActionStatus,
  numberOfProductsInShoppingCart : state.cartReducer.numberOfProductsInShoppingCart,
  totalPriceForShoppingCart : state.cartReducer.totalPriceForShoppingCart
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addProductToCart: (updatedProductsInShoppingCart: IProduct) => dispatch(addProductToCart(updatedProductsInShoppingCart)),
  decreaseProductQuantity: (productID: number, deleteMode : number) => dispatch(decreaseProductQuantity(productID, deleteMode)),
  checkoutShoppingCart: (generatedStringForApiCall : string) => dispatch({type : CHECKOUT_SHOPPING_CART, checkoutValue : generatedStringForApiCall})
});

const ShoppingCartInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

export default ShoppingCartInitializer;