import { IProduct } from "../../Models/Models";
import { AppState } from "../../ReduxStore";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { resetShoppingCart } from "../../ReduxStore/ShoppingCartSection/actions";
import { activateModalRedirectToProducts } from "../../ReduxStore/ProductDetailsSection/actions";
import { ProductListDumpView } from "./ProductListDumpView";
import { lifecycle, withHandlers, compose, setDisplayName } from 'recompose';
import { LoadingWindowHoc } from "../../HelperComponents/HocComponents/LoadingWindowHoc";
import { activateLoadingWindow } from "../../ReduxStore/ProductListSection/actions";

/**
 * Switched from a local images array, to the server side information. Changes on server side:
 * backend -> index.js:
 * 
 * app.get('/products') { ... .sort()); } -> remove the additional map function, to allow the transfer of image data as well
 */

export interface ProductListProps {
    productList: IProduct[];
    isLoading: boolean;
    error: string;
    loadProducts: () => void;
    shoppingCartStatus: number;
    resetShoppingCart: () => void;
    productDeletionRedirectStatus: boolean;
    activateModalRedirectToProducts: () => void;
    dispatch: Dispatch;
    activateLoadingWindow: (props : ProductListProps) => void;
}

const mapStateToProps = (state: AppState) => ({
    productList: state.prodListReducer.data,
    isLoading: state.prodListReducer.isLoading,
    error: state.prodListReducer.error,
    shoppingCartStatus: state.cartReducer.checkoutActionStatus,
    productDeletionRedirectStatus: state.prodDetailsReducer.shouldRedirectFromModalDelete
});

const myHandlers = withHandlers({
    loadProducts: (props: ProductListProps) => (event: any) => {
        props.dispatch({ type: 'LOAD_PRODUCTS' });
    },

    resetShoppingCart: (props: ProductListProps) => (event: any) => {
        props.dispatch(resetShoppingCart());
    },

    activateModalRedirectToProducts: (props: ProductListProps) => (event: any) => {
        props.dispatch(activateModalRedirectToProducts());
    },

    activateLoadingWindow: (props : ProductListProps) => (event : any) => {
        props.dispatch(activateLoadingWindow(true))
    }
})

const onComponentDidMount = lifecycle<ProductListProps, {}, {}>({
    componentDidMount() {
        if (this.props.shoppingCartStatus !== 0) {
            this.props.resetShoppingCart();
        }

        if (this.props.productDeletionRedirectStatus) {
            this.props.activateModalRedirectToProducts();
        }

        //Reset the loading value
        if(!this.props.isLoading) {
            this.props.activateLoadingWindow(this.props);
        }

        this.props.loadProducts();
    }
})

const ProductListViewInitializer = compose<ProductListProps, {}>(
    setDisplayName('ProductListView'),
    connect(mapStateToProps),
    myHandlers,
    onComponentDidMount,
    LoadingWindowHoc
)(ProductListDumpView);

export default ProductListViewInitializer;