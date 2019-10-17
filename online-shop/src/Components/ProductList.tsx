import React from 'react';
import { IProduct } from '../Models/Models';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';
import { ProductsImages } from '../Models/Models';
import { AppState } from '../ReduxStore';
import { Dispatch } from 'redux';
import { loadProducts } from '../ReduxStore/ProductListSection/actions';
import { connect } from 'react-redux';

interface ProductListProps {
  match?: any;
  resetShoppingCartState?: any;
  productList: IProduct[];
  isLoading: boolean;
  error: string;
  loadProducts: (data: IProduct[], isLoading: boolean, error: string) => void;
}

interface AdditionalComponentState {
  match?: any;
  resetShoppingCartState?: any;
}

class ProductList extends React.Component<ProductListProps> {
  ProductsApiEndpointUrl = "http://localhost:4000/products";
  
  componentDidMount() {
    let fetchedList: IProduct[] = [];
    let loadingStatus: boolean = true;
    let errorMessage: string = "No errors found";

    fetch(this.ProductsApiEndpointUrl, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        fetchedList = result;
        loadingStatus = false
      })
      .then(this.props.resetShoppingCartState())
      .catch(error => {
        errorMessage = error;
        loadingStatus = false
      })
      .then(() => this.props.loadProducts(fetchedList, loadingStatus, errorMessage));
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
            <img src={ProductsImages[product.id].imageUrl} className="ProductsListImages" alt={product.category + " " + product.id} />
            <p className="is-size-5 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
            <p className="is-size-5 has-text-price-color has-text-weight-semibold">{product.price} lei</p>
            <p className="is-size-7 has-text-grey">In {product.category}</p>
          </div>
        </Link>
    );

    return (
      <div className="container is-fluid">
        
        <div className='columns is-multiline is-mobile is-centered'>
          {productsColumn}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, myOwnState: AdditionalComponentState) => ({
  productList: state.prodListReducer.data,
  isLoading: state.prodListReducer.isLoading,
  error: state.prodListReducer.error,
  match: myOwnState.match
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: (data: IProduct[], isLoading: boolean, error: string) => dispatch(loadProducts(data, isLoading, error))
});

const ProductListInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

export default ProductListInitializer;