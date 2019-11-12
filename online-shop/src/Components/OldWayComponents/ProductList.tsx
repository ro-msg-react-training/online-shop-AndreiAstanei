import React from 'react';
import { IProduct } from '../../Models/Models';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';
import { AppState } from '../../ReduxStore';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { resetShoppingCart } from '../../ReduxStore/ShoppingCartSection/actions';
import { activateModalRedirectToProducts } from '../../ReduxStore/ProductDetailsSection/actions';

export interface ProductListProps {
  productList: IProduct[];
  isLoading: boolean;
  error: string;
  loadProducts: () => void;
  shoppingCartStatus: number;
  resetShoppingCart: () => void;
  productDeletionRedirectStatus: boolean;
  activateModalRedirectToProducts: () => void;
}

interface AdditionalComponentState {}

class ProductList extends React.Component<ProductListProps> {
  componentDidMount() {
    if (this.props.shoppingCartStatus !== 0) {
      this.props.resetShoppingCart();
    }

    if (this.props.productDeletionRedirectStatus) {
      this.props.activateModalRedirectToProducts();
    }

    this.props.loadProducts();
  }

  render() {
    if (this.props.isLoading && this.props.error === 'No errors found') {
      return <p>Loading ....</p>
    } else if (this.props.error !== 'No errors found') {
      console.log(`ProductList - Error message: ${this.props.error}`);
    }

    let productsColumn = this.props.productList.map(
      (product: IProduct) => 
        <Link key={'ProductLinkKey' + product.id} to={"/products/" + product.id}>
          <div id={'Product' + product.id} className='column box has-text-centered ProductsListElements'>
            <img src={/*ProductsImages[product.id] ? ProductsImages[product.id].imageUrl : */"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png"} className="ProductsListImages" alt={product.category + " " + product.id} />
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
  shoppingCartStatus: state.cartReducer.checkoutActionStatus,
  productDeletionRedirectStatus: state.prodDetailsReducer.shouldRedirectFromModalDelete
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: () => dispatch({type: 'LOAD_PRODUCTS'}),
  resetShoppingCart: () => dispatch(resetShoppingCart()),
  activateModalRedirectToProducts: () => dispatch(activateModalRedirectToProducts())
});

const ProductListInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

export default ProductListInitializer;