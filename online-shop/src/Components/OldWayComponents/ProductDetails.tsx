import React from 'react';
import { IProduct } from '../../Models/Models';
import '../Styles/ComponentsStyles/ProductDetails.scss';
import ConfirmationModal from '../../HelperComponents/ConfirmationModal';
import { Redirect, Link } from 'react-router-dom';
import { AppState } from '../../ReduxStore';
import { Dispatch } from 'redux';
import { activateRedirect, deactivateRedirect, toggleConfirmationDialog } from '../../ReduxStore/ProductDetailsSection/actions';
import { connect } from 'react-redux';
import { addProductToCart } from '../../ReduxStore/ShoppingCartSection/actions';
import { LOAD_PRODUCT_DETAILS } from '../../ReduxStore/ProductDetailsSection/types';

interface ProductDetailsProps {
  match?: any;
  toBeReceivedData: IProduct;
  isLoading: boolean;
  error?: string;
  isDeleteModalOpen: boolean;
  shouldRedirectToShoppingCart: boolean;
  loadProductDetails : (id : number) => void;
  addProductToCart : (productToBeAddedInCart : IProduct, checkoutStatus : number) => void;
  activateRedirect : () => void;
  deactivateRedirect : () => void;
  toggleConfirmationDialog : () => void;
}

interface AdditionalProductDetailsState {
  match?: any;
}

class ProductDetails extends React.Component<ProductDetailsProps> {

  handleAddToShoppingCartClick = () => {
    this.props.addProductToCart(this.props.toBeReceivedData, 0);
    this.props.activateRedirect();
  }

  handleDeleteProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.toggleConfirmationDialog();
  }

  componentDidMount() {
    this.props.loadProductDetails(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.deactivateRedirect();
  }

  render() {
    if (this.props.error !== "No errors found") {
      return <div>Encountered the following error: {this.props.error}</div>
    } else if (this.props.isLoading) {
      return (
        <div className="container is-vcentered">Loading product details...</div>
      );
    } else if (this.props.shouldRedirectToShoppingCart) {
      return <Redirect to="/shoppingCart" />
    }

    return (
      <div id="MainProductDetailsConstainer" className='container box has-text-centered is-family-primary'>
        <div className='columns'>
          <div className='column'>
            <img className='imageForProductDetails' src={this.props.toBeReceivedData.image} alt="" />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <h1 className="title is-4">{this.props.toBeReceivedData.name}</h1>
          </div>
        </div>

        <div className='columns is-centered'>
          <div className="column tags  has-addons">
            <span className="tag is-rounded is-medium has-text-weight-semibold">Category</span>
            <span className='tag is-dark is-rounded is-medium has-text-weight-semibold'>
              {this.props.toBeReceivedData.category}
            </span>
          </div>

          <div className="column tags has-addons">
            <span className="tag is-rounded is-medium has-text-weight-semibold">Price</span>
            <span className='tag is-price-color is-rounded is-medium has-text-weight-semibold'>
              {this.props.toBeReceivedData.price} lei
            </span>
          </div>
        </div>

        <hr />

        <div className='columns'>
          <div className='column'>
            <textarea className='textarea has-fixed-size has-text-justified has-text-grey' readOnly rows={4} value={this.props.toBeReceivedData.description} />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-primary is-medium" onClick={this.handleAddToShoppingCartClick.bind(this)}>
              <span className="icon">
                <i className="fas fa-cart-plus" />
              </span>
              <span>Add to shopping cart</span>
            </button>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-danger is-medium" onClick={this.handleDeleteProductClick.bind(this)}>
              <span>Remove product</span>
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>

            <Link to={`../editProduct/${this.props.toBeReceivedData.id}`}>
            <button className="button is-rounded is-info is-medium">
              <span>Edit product</span>
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>
            </Link>
          </div>
        </div>
        <ConfirmationModal ProductId={this.props.toBeReceivedData.id} show={this.props.isDeleteModalOpen} showModalFunction={this.handleDeleteProductClick.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state : AppState, additionalState : AdditionalProductDetailsState) => ({
  toBeReceivedData: state.prodDetailsReducer.toBeReceivedData,
  isLoading: state.prodDetailsReducer.isLoading,
  error: state.prodDetailsReducer.error,
  isDeleteModalOpen: state.prodDetailsReducer.isDeleteModalOpen,
  shouldRedirectToShoppingCart: state.prodDetailsReducer.shouldRedirectToShoppingCart,
  match: additionalState.match
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  loadProductDetails : (id : number) => dispatch({type : LOAD_PRODUCT_DETAILS, payload : id}),
  addProductToCart : (productToBeAddedInCart : IProduct) => dispatch(addProductToCart(productToBeAddedInCart)),
  activateRedirect : () => dispatch(activateRedirect()),
  deactivateRedirect : () => dispatch(deactivateRedirect()),
  toggleConfirmationDialog : () => dispatch(toggleConfirmationDialog())
});

const ProductDetailsInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);

export default ProductDetailsInitializer;
