import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ShoppingCartStyles.scss';
import { IProduct } from '../Models/Models';
import { ProductsImages as ProductImages } from '../Models/Models';

interface IProps {
  match?: any;
  productsToBeAddedToShoppingCartFromApp: IProduct[];
  decreaseProductQuantityFromShoppingCart : any;
  completlyRemoveProductFromShoppingCart : any;
}

interface IState {
  addedProductsForCheckout: IProduct[];
}

export default class ShoppingCart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      addedProductsForCheckout: this.props.productsToBeAddedToShoppingCartFromApp
    }
  }

  //In main array
  calculateNumberOfSameItem(productId: number): number {
    let numberOfSameProduct = 0;

    this.state.addedProductsForCheckout.forEach(
      (product) => {
        if (product.id === productId) {
          numberOfSameProduct++
        }
      });

    return numberOfSameProduct;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    if (this.state.addedProductsForCheckout.length === 0) {
      return totalPrice;
    }

    this.state.addedProductsForCheckout.forEach(
      (product) => {
        totalPrice += product.price
      }
    );

    return totalPrice;
  }

  removeDuplicatesFromMainArray(arrayToParse: IProduct[]): IProduct[] {
    const unique: IProduct[] = [];

    //pentru fiecare element din state
    arrayToParse.forEach((product) => {

      let flagProductAlreadyExists: boolean = true;

      //verificam daca este in unique, in cazul in care unique are macar 1 element
      if (unique.length) {
        unique.forEach((uniqueProduct) => {
          if (product.id === uniqueProduct.id) {
            flagProductAlreadyExists = false;
          }
        });
      }

      if (flagProductAlreadyExists) {
        unique.push(product);
      }
    });

    return unique;
  }

  onDecreaseProductQuantity = (productID : number) : any => {
    console.log("Hey look!, the decrease button was pressed :)");

    if(this.calculateNumberOfSameItem(productID) >= 1) {
      this.props.decreaseProductQuantityFromShoppingCart(productID);
    }
  }

  onDeleteProductPressed = (productID : number) : any => {
    this.props.completlyRemoveProductFromShoppingCart(productID);
  }

  render() {
    const duplicatesFreeArray: IProduct[] = this.removeDuplicatesFromMainArray(this.state.addedProductsForCheckout);

    let product = duplicatesFreeArray.map(
      (product: IProduct) =>
        <div key={product.id + "Key"} className="columns box is-vcentered has-text-centered">
          <div className="column">
            <img src={ProductImages[product.id].imageUrl} className="imageForShoppingCartProducts ProductsListImages" alt={product.category + " " + product.id} />
          </div>
          <div className="column">
            <p className="is-size-6 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
            <p className="is-size-6 has-text-price-color has-text-weight-semibold">{this.calculateNumberOfSameItem(product.id) * product.price} lei</p>
            <p className="is-size-7 has-text-grey">In {product.category}</p>
          </div>
          <div className="column">
            <p className="is-size-6 has-text-grey has-text-weight-semibold">Quantity</p>
            <div className="columns is-gapless">
              <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold" onClick = {this.onDecreaseProductQuantity.bind(this, product.id)}>-</button></div>
              <div className="column"><p className="is-vcentered has-text-weight-semibold is-size-6">{this.calculateNumberOfSameItem(product.id)}</p></div>
              <div className="column"><button className="button is-small is-danger is-outlined has-text-weight-bold">+</button></div>
            </div>
            <button className="button is-danger" onClick = {this.onDeleteProductPressed.bind(this, product.id)}>Delete product</button>
          </div>
        </div>
    );

    return (
      <div className="container is-fluid">
        <div className='level'>
          <div className='level-item level-left'>
            <p className="title has-text-grey-dark has-text-weight-light">Products in cart: {this.state.addedProductsForCheckout.length}</p>
          </div>
          <div className='level-item level-right'>
            <p className="title has-text-grey-dark has-text-weight-light">Total: {this.calculateTotalPrice()} lei</p>
            <button className="button is-primary is-medium is-outlined">
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
  }
}