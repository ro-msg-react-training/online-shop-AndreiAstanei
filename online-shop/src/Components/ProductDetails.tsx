import React from 'react';
import { IProduct } from '../Models/Models';
import '../Styles/ComponentsStyles/ProductDetails.scss';
import ConfirmationModal from '../HelperComponents/ConfirmationModal';
import { Redirect } from 'react-router-dom';
import { AppState } from '../ReduxStore';
import { Dispatch } from 'redux';
import { loadProductDetails } from '../ReduxStore/ProductDetailsSection/actions';
import { connect } from 'react-redux';

interface ProductDetailsProps {
  match?: any;
  addProductToShoppingCartFunction: (product : IProduct) => void;
  completelyRemoveProductFromStore: (productID : number) => void;
  toBeReceivedData: IProduct;
  isLoading: boolean;
  error?: string;
  isDeleteModalOpen: boolean;
  shouldRedirectToShoppingCart: boolean;
  loadProductDetails : (toBeReceivedData: IProduct, isLoading: boolean, isDeleteModalOpen: boolean, shouldRedirectToShoppingCart: boolean, error?: string) => void;
}

interface AdditionalProductDetailsState {
  match?: any;
  addProductToShoppingCartFunction: (product : IProduct) => void;
  completelyRemoveProductFromStore: (productID : number) => void;
}

class ProductDetails extends React.Component<ProductDetailsProps> {

  handleAddToShoppingCartClick = () => {
    this.props.addProductToShoppingCartFunction(this.props.toBeReceivedData);
    this.props.loadProductDetails(this.props.toBeReceivedData, this.props.isLoading, this.props.isDeleteModalOpen, true, this.props.error)
  }

  handleDeleteProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.loadProductDetails(this.props.toBeReceivedData, this.props.isLoading, !this.props.isDeleteModalOpen, false, this.props.error);
  }

  componentDidMount() {
    const ProductDetailsApiEndpoint = `http://localhost:4000/products/${this.props.match.params.id}`;

    let receivedProductData : IProduct = {} as any;
    let loadingStatus : boolean = true;
    let deleteModalStatus : boolean = false;
    let redirectToShoppingCartAction : boolean = false;
    let errorMessage : string = "No errors found";

    fetch(ProductDetailsApiEndpoint, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not load product details.');
        }
      })
      .then(productData => {
        receivedProductData = productData;
        loadingStatus = false;
      })
      .catch(error => {
        console.log("This is the error: " + error);
        errorMessage = error;
        loadingStatus = false;
      })
      .then(() => this.props.loadProductDetails(receivedProductData, loadingStatus, deleteModalStatus, redirectToShoppingCartAction, errorMessage));
  }

  componentDidUpdate() {
    this.props.loadProductDetails(this.props.toBeReceivedData, this.props.isLoading, this.props.isDeleteModalOpen, false, this.props.error);
  }

  render() {
    if (this.props.error !== "No errors found") {
      return <div>Encountered the following error: {this.props.error}</div>
    } else if (this.props.isLoading) {
      return (
        <div className="container is-vcentered">Loading product details...</div>
      );
    } else if (this.props.shouldRedirectToShoppingCart) {
      console.log(this.props.shouldRedirectToShoppingCart);
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
            <button className="button is-rounded is-primary is-medium" onClick={this.handleAddToShoppingCartClick}>
              <span className="icon">
                <i className="fas fa-cart-plus" />
              </span>
              <span>Add to shopping cart</span>
            </button>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-danger is-outlined is-medium" onClick={this.handleDeleteProductClick}>
              <span>Remove product</span>
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>
          </div>
        </div>
        <ConfirmationModal ProductId={this.props.toBeReceivedData.id} show={this.props.isDeleteModalOpen} showModalFunction={this.handleDeleteProductClick.bind(this)} completelyRemoveProductFromStore={this.props.completelyRemoveProductFromStore} />
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
  match: additionalState.match,
  addProductToShoppingCartFunction: additionalState.addProductToShoppingCartFunction,
  completelyRemoveProductFromStore: additionalState.completelyRemoveProductFromStore
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  loadProductDetails : (toBeReceivedData: IProduct, isLoading: boolean, isDeleteModalOpen: boolean, shouldRedirectToShoppingCart: boolean, error?: string) => dispatch(loadProductDetails(toBeReceivedData, isLoading, isDeleteModalOpen, shouldRedirectToShoppingCart, error))
});

const ProductDetailsInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);

export default ProductDetailsInitializer;
