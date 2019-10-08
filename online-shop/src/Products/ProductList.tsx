import React from 'react';
import { IProduct } from '../App';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';

interface IProps {
  data: IProduct[];
}

export default class ProductList extends React.Component<IProps> {
  render() {
    let productsColumn = this.props.data.map(
      (product) =>
        <Link to={`/ProductDetails/${product.id}`}>
          <div id='ProductsListElements' className='column box has-text-centered'>
            <img src={product.image} className="ProductsListImages" alt={product.category + " " + product.id} />
            <p className="is-size-5 has-text-dark has-text-weight-semibold">{product.name}</p>
            <p className="is-size-5 has-text-price-color has-text-weight-semibold">{product.price} lei</p>
            <p className="is-size-7 has-text-grey">{product.category}</p>
          </div>
        </Link>
    );

    return (
      <div className="container is-fluid">
        <div className='level'>
          <div className='level-item level-left'>
            <section className='section'>
              <h1 className='title is-1'>Products</h1>
            </section>
          </div>
          <div className='level-item level-right'>
            <section className='section'>
              <button className="button is-rounded is-primary is-medium">
                <span className="icon">
                  <i className="fas fa-shopping-cart" />
                </span>
                <span>Shopping cart</span>
              </button>
            </section>
          </div>
        </div>


        <div className='columns is-multiline is-mobile is-centered'>
          {productsColumn}
        </div>
      </div>
    );
  }
}