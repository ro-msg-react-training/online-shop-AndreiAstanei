import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';
import { IProduct } from '../App';
import { ProductsImages as ProductImages } from './ProductList';

interface IProps {
  match?: any;
  productsToBeAddedToShoppingCartFromApp: IProduct[];
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

    console.log("Received items: " + this.state.addedProductsForCheckout);
  }

  calculateNumberOfSameItem(productId: number): number {
    let numberOfSameProduct = 0;

    this.state.addedProductsForCheckout.map(
      (product) => {
        if (product.id === productId) {
          numberOfSameProduct++
        }
      }
    );

    return numberOfSameProduct;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    if (this.state.addedProductsForCheckout.length === 0) {
      return totalPrice;
    }

    this.state.addedProductsForCheckout.map(
      (product) => {
        totalPrice += product.price
      }
    );

    return totalPrice;
  }

  /* 
    <div id={'Product' + product.id} className='column box has-text-centered ProductsListElements'>
          <img src={ProductImages[product.id].imageUrl} className="ProductsListImages" alt={product.category + " " + product.id} />
          <p className="is-size-5 has-text-grey-dark has-text-weight-semibold">{product.name} x {this.calculateNumberOfSameItem(product.id)}</p>
          <p className="is-size-5 has-text-price-color has-text-weight-semibold">{product.price} lei</p>
          <p className="is-size-7 has-text-grey">In {product.category}</p>
        </div>
  */

  render() {
    let product = this.state.addedProductsForCheckout.map(
      (product: IProduct) =>
        <tr className="tr">
          <td className="td">
            <img src={ProductImages[product.id].imageUrl} className="ProductsListImages" alt={product.category + " " + product.id} />
          </td>
          <td className="td">
            <p className="is-size-5 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
            <p className="is-size-5 has-text-price-color has-text-weight-semibold">{product.price} lei</p>
            <p className="is-size-7 has-text-grey">In {product.category}</p>
          </td>
          <td className="td">
            Hey
            </td>
        </tr>
    );

    return (
      <div className="container is-fluid">
        <div className='level'>
          <div className='level-item level-left'>
            <p className="title">Products in cart: {this.state.addedProductsForCheckout.length}</p>
          </div>
          <div className='level-item level-right'>
            <p className="title">Total: {this.calculateTotalPrice()} lei</p>
            <button className="button is-primary is-medium is-outlined">
              <span className="icon">
                <i className="fas fa-cart-arrow-down" />
              </span>
              <span>Checkout</span>
            </button>
          </div>
        </div>


        <table className='table'>
          <div className="tbody">
            {product}
          </div>
        </table>
      </div>
    );
  }
}