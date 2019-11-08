import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/ComponentsStyles/ShoppingCartStyles/ShoppingCartStyles.scss';
import { IProduct } from '../../Models/Models';
import { ProductsImages } from '../../Models/Models';
import { ShoppingCartProps } from './ShoppingCartSmartView';
import { ErrorComponent } from '../../HelperComponents/ErrorComponent';
import { ActionStatusReport } from '../../HelperComponents/ActionStatusReport';

const calculateNumberOfSameItem = (arrayToCalculateFrom: IProduct[], productId: number): number => {
    let numberOfSameProduct = 0;

    arrayToCalculateFrom.forEach(
        (product) => {
            if (product.id === productId) {
                numberOfSameProduct++;
            }
        });

    return numberOfSameProduct;
}

export const ShoppingCartDumpView : React.FC<ShoppingCartProps> = (props : ShoppingCartProps) => {
    if (props.checkoutActionStatus === 0) {
      let product : JSX.Element[] = [];

      if(props.uniqueProductsInShoppingCart.length) {
        product = props.uniqueProductsInShoppingCart.map(
          (product: IProduct) =>
            <div key={product.id + "Key"} className="ShoppingCartProducts">
              <div className="columns box is-vcentered has-text-centered">
                <div className="column">
                  <Link to={`/products/${product.id}`}>
                    <img src={ProductsImages[product.id] ? ProductsImages[product.id].imageUrl : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png"} className="imageForShoppingCartProducts ProductsListImages" alt={product.category + " " + product.id} />
                  </Link>
                </div>
                <div className="column">
                  <Link to={`/products/${product.id}`}>
                    <p className="is-size-6 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
                    <p className="is-size-6 has-text-price-color has-text-weight-semibold">{calculateNumberOfSameItem(props.productsInShoppingCart, product.id) * product.price} lei</p>
                    <p className="is-size-7 has-text-grey">In {product.category}</p>
                  </Link>
                </div>
                <div className="column">
                  <p className="is-size-6 has-text-grey has-text-weight-semibold">Quantity</p>
                  <div className="columns is-gapless">
                    <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick={() => props.onDecreaseProductQuantity(props, product.id)}>-</button></div>
                    <div className="column"><p className="is-vcentered has-text-weight-semibold is-size-6">{calculateNumberOfSameItem(props.productsInShoppingCart, product.id)}</p></div>
                    <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick={() => props.onIncreaseProductQuantity(props, product)}>+</button></div>
                  </div>
                  <button className="button is-danger" onClick={() => props.onDeleteProductPressed(props, product.id)}>Delete product</button>
                </div>
              </div>
            </div>
        );
      } else {
        product = [(
          <div className = "is-size-4 has-background-white-bis has-text-grey has-text-centered box is-centered has-text-weight-light">
            Looks like your shopping cart is empty! <br/> Head over to the products catalog and start shopping.
          </div>
        )]
      }
  
        return (
          <div className="container is-fluid">
            <div className='level'>
              <div className='level-item level-left'>
                <p className="title has-text-grey-dark has-text-weight-light">Products in cart: {props.numberOfProductsInShoppingCart}</p>
              </div>
              <div className='level-item level-right'>
                <p id="shoppingCartPriceTag" className="title has-text-grey-dark has-text-weight-light">Total: {props.totalPriceForShoppingCart} lei</p>
                <button className={props.productsInShoppingCart.length ? "button is-primary is-medium is-outlined" : "button is-primary is-medium is-outlined is-hidden"} onClick={() => props.onCheckoutClicked(props)}>
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
      } else if (props.checkoutActionStatus === 201) {
        return (
          <ActionStatusReport wasSuccessful = {true} message = {"Successfully placed order!"}/>
        );
      } else if (props.checkoutActionStatus === 401) {
        return (
          <ActionStatusReport wasSuccessful = {false} message = {"A problem appeared while placing the order, please try again later."}/>
        );
      } else {
        return (
          <ErrorComponent />
        );
      }
}