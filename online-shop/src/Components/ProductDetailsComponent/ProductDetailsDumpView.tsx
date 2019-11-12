import React from 'react';
import '../../Styles/ComponentsStyles/ProductDetailsStyles/ProductDetails.scss';
import ConfirmationModal from '../../HelperComponents/ConfirmationModal';
import { Redirect, Link } from 'react-router-dom';
import { ProductDetailsProps } from './ProductDetailsSmartView';
import { ErrorComponent } from '../../HelperComponents/ErrorComponent';

export const ProductDetailsDumpView: React.FC<ProductDetailsProps> = (props: ProductDetailsProps) => {
  if (props.error !== "No errors found") {
    return (
      <ErrorComponent />
    );
  } else if (props.shouldRedirectToShoppingCart) {
    return <Redirect to="/shoppingCart" />
  } else {
    return (
      <div id="MainProductDetailsConstainer" className='container box has-text-centered is-family-primary'>
        <div className='columns'>
          <div className='column'>
            <img className='imageForProductDetails' src={props.toBeReceivedData.image} alt="" />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <h1 className="title is-4">{props.toBeReceivedData.name}</h1>
          </div>
        </div>

        <div className='columns is-centered'>
          <div className="column tags  has-addons">
            <span className="tag is-rounded is-medium has-text-weight-semibold">Category</span>
            <span className='tag is-dark is-rounded is-medium has-text-weight-semibold'>
              {props.toBeReceivedData.category}
            </span>
          </div>

          <div className="column tags has-addons">
            <span className="tag is-rounded is-medium has-text-weight-semibold">Price</span>
            <span className='tag is-price-color is-rounded is-medium has-text-weight-semibold'>
              {props.toBeReceivedData.price} lei
              </span>
          </div>
        </div>

        <hr />

        <div className='columns'>
          <div className='column'>
            <textarea className='textarea has-fixed-size has-text-justified has-text-grey' readOnly rows={4} value={props.toBeReceivedData.description} />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-primary is-medium" onClick={() => props.handleAddToShoppingCartClick(props)}>
              <span className="icon">
                <i className="fas fa-cart-plus" />
              </span>
              <span>Add to shopping cart</span>
            </button>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-danger is-medium" onClick={() => props.handleDeleteProductClick(props)}>
              <span>Remove product</span>
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>

            <Link to={`../editProduct/${props.toBeReceivedData.id}`}>
              <button className="button is-rounded is-info is-medium">
                <span>Edit product</span>
                <span className="icon">
                  <i className="fas fa-times" />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <ConfirmationModal ProductId={props.toBeReceivedData.id} show={props.isDeleteModalOpen} showModalFunction={() => props.handleDeleteProductClick(props)} />
      </div>
    );
  }
}