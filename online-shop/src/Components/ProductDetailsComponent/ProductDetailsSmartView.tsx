import { IProduct } from '../../Models/Models';
import { AppState } from '../../ReduxStore';
import { Dispatch } from 'redux';
import { activateRedirect, deactivateRedirect, toggleConfirmationDialog } from '../../ReduxStore/ProductDetailsSection/actions';
import { connect } from 'react-redux';
import { addProductToCart } from '../../ReduxStore/ShoppingCartSection/actions';
import { LOAD_PRODUCT_DETAILS } from '../../ReduxStore/ProductDetailsSection/types';
import { compose, lifecycle, withHandlers, setDisplayName } from 'recompose';
import { ProductDetailsDumpView } from './ProductDetailsDumpView';
import { LoadingWindowHoc } from '../../HelperComponents/HocComponents/LoadingWindowHoc';

export interface ProductDetailsProps {
    match?: any;
    toBeReceivedData: IProduct;
    isLoading: boolean;
    error?: string;
    isDeleteModalOpen: boolean;
    shouldRedirectToShoppingCart: boolean;
    loadProductDetails: (id: number) => void;
    addProductToCart: (productToBeAddedInCart: IProduct) => void;
    activateRedirect: () => void;
    deactivateRedirect: () => void;
    toggleConfirmationDialog: () => void;
    handleAddToShoppingCartClick: (props : ProductDetailsProps) => void;
    handleDeleteProductClick: (props : ProductDetailsProps) => void;
}

interface AdditionalProductDetailsState {
    match?: any;
}

const mapStateToProps = (state: AppState, additionalState: AdditionalProductDetailsState) => ({
    toBeReceivedData: state.prodDetailsReducer.toBeReceivedData,
    isLoading: state.prodDetailsReducer.isLoading,
    error: state.prodDetailsReducer.error,
    isDeleteModalOpen: state.prodDetailsReducer.isDeleteModalOpen,
    shouldRedirectToShoppingCart: state.prodDetailsReducer.shouldRedirectToShoppingCart,
    match: additionalState.match
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadProductDetails: (id: number) => dispatch({ type: LOAD_PRODUCT_DETAILS, payload: id }),
    addProductToCart: (productToBeAddedInCart: IProduct) => dispatch(addProductToCart(productToBeAddedInCart)),
    activateRedirect: () => dispatch(activateRedirect()),
    deactivateRedirect: () => dispatch(deactivateRedirect()),
    toggleConfirmationDialog: () => dispatch(toggleConfirmationDialog())
});

const onComponentDidMount = lifecycle<ProductDetailsProps, {}, {}>({
    componentDidMount() {
        this.props.loadProductDetails(this.props.match.params.id)
    }
})

const onComponentDidUpdate = lifecycle<ProductDetailsProps, {}, {}>({
    componentDidUpdate() {
        this.props.deactivateRedirect();
    }
})

const myHandlers = withHandlers({
    handleAddToShoppingCartClick : (props : ProductDetailsProps) => (event : any) => {
        props.addProductToCart(props.toBeReceivedData);
        props.activateRedirect();
      },

      handleDeleteProductClick : (props : ProductDetailsProps) => (event : any) => {
        props.toggleConfirmationDialog();
      }
})

const ProductDetailsViewInitializer = compose<ProductDetailsProps, {}>(
    setDisplayName('ProductDetailsView'),
    connect(mapStateToProps, mapDispatchToProps),
    myHandlers,
    onComponentDidMount,
    onComponentDidUpdate,
    LoadingWindowHoc
)(ProductDetailsDumpView);

export default ProductDetailsViewInitializer;