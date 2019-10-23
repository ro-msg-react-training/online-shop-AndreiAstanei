import React from 'react';
import { IProduct, CustomProductImage } from '../Models/Models';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';
import { ProductsImages } from '../Models/Models';
import { AppState } from '../ReduxStore';
import { Dispatch } from 'redux';
import { loadProducts } from '../ReduxStore/ProductListSection/actions';
import { connect } from 'react-redux';
import { resetShoppingCart } from '../ReduxStore/ShoppingCartSection/actions';
import { activateModalRedirectToProducts } from '../ReduxStore/ProductDetailsSection/actions';

interface ProductListProps {
  match?: any;
  productList: IProduct[];
  isLoading: boolean;
  error: string;
  loadProducts: (data: IProduct[], isLoading: boolean, error: string) => void;
  shoppingCartStatus: number;
  resetShoppingCart: () => void;
  productDeletionRedirectStatus: boolean;
  activateModalRedirectToProducts: () => void;
  secondaryProductImagesArray : CustomProductImage[];
}

interface AdditionalComponentState {
  match?: any;
}

class ProductList extends React.Component<ProductListProps> {
  ProductsApiEndpointUrl = "http://localhost:4000/products";

  componentDidMount() {
    let fetchedList: IProduct[] = [];
    let loadingStatus: boolean = true;
    let errorMessage: string = "No errors found";

    if (this.props.shoppingCartStatus !== 0) {
      this.props.resetShoppingCart();
    }

    if (this.props.productDeletionRedirectStatus) {
      this.props.activateModalRedirectToProducts();
    }

    fetch(this.ProductsApiEndpointUrl, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        fetchedList = result;
        loadingStatus = false
      })
      .catch(error => {
        errorMessage = error;
        loadingStatus = false
      })
      .then(() => this.props.loadProducts(fetchedList, loadingStatus, errorMessage));
  }

  getCorrespondingImageForProduct = (id : number) : string => {
    let defaultValue : string = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png";

    for(let i : number = this.props.secondaryProductImagesArray.length - 1; i >= 0; i--) {
      let product : CustomProductImage = this.props.secondaryProductImagesArray[i];

      if(product.productId === id) {
        defaultValue = product.imageUrl;
      }
    }

    return defaultValue;
  }

  render() {
    if (this.props.isLoading && this.props.error === 'No errors found') {
      return <p>Loading ....</p>
    } else if (this.props.error !== 'No errors found') {
      console.log(`ProductList - Error message: ${this.props.error}`);
    }

    let productsColumn = this.props.productList.map(
      (product: IProduct) => 
        <Link key={'ProductLinkKey' + product.id} to={`${this.props.match.url}/${product.id}`}>
          <div id={'Product' + product.id} className='column box has-text-centered ProductsListElements'>
            <img src={this.getCorrespondingImageForProduct(product.id)} className="ProductsListImages" alt={product.category + " " + product.id} />
            <p className="is-size-5 has-text-grey-dark has-text-weight-semibold appliedEllipsisEffect">{product.name}</p>
            <p className="is-size-5 has-text-price-color has-text-weight-semibold appliedEllipsisEffect">{product.price} lei</p>
            <p className="is-size-7 has-text-grey appliedEllipsisEffect">In {product.category}</p>
          </div>
        </Link>
      );

    return (
      <div className="container is-fluid is-clearfix">
        <div className='columns is-multiline is-mobile is-centered'>
          {productsColumn}
        </div>
        <Link to = "/newProduct">
        <button className="button is-primary is-rounded is-large has-text-centered is-uppedcase has-text-weight-bold" id = "addButton">+</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, myOwnState: AdditionalComponentState) => ({
  productList: state.prodListReducer.data,
  isLoading: state.prodListReducer.isLoading,
  error: state.prodListReducer.error,
  match: myOwnState.match,
  shoppingCartStatus: state.cartReducer.checkoutActionStatus,
  productDeletionRedirectStatus: state.prodDetailsReducer.shouldRedirectFromModalDelete,
  secondaryProductImagesArray: state.appReducer.secondaryProductImagesArray
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: (data: IProduct[], isLoading: boolean, error: string) => dispatch(loadProducts(data, isLoading, error)),
  resetShoppingCart: () => dispatch(resetShoppingCart()),
  activateModalRedirectToProducts: () => dispatch(activateModalRedirectToProducts())
});

const ProductListInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

export default ProductListInitializer;