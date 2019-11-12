import { IProduct, CheckoutArrayItem } from '../../Models/Models';
import { AppState } from '../../ReduxStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addProductToCart, decreaseProductQuantity, SCResetLoadingStatus } from '../../ReduxStore/ShoppingCartSection/actions';
import { CHECKOUT_SHOPPING_CART } from '../../ReduxStore/ShoppingCartSection/types';
import { withHandlers, compose, setDisplayName } from 'recompose';
import { ShoppingCartDumpView } from './ShoppingCartDumpView';
import { LoadingWindowHoc } from '../../HelperComponents/HocComponents/LoadingWindowHoc';

export interface ShoppingCartProps {
    match: any;
    productsInShoppingCart: IProduct[];
    uniqueProductsInShoppingCart: IProduct[];
    checkoutActionStatus: number;
    numberOfProductsInShoppingCart: number;
    totalPriceForShoppingCart: number;
    addProductToCart: (updatedProductsInShoppingCart: IProduct) => void;
    decreaseProductQuantity: (productID: number, deleteMode: number) => void;
    checkoutShoppingCart: (generatedStringForApiCall: string) => void;
    onDeleteProductPressed: (props: ShoppingCartProps, productID: number) => void;
    onDecreaseProductQuantity: (props: ShoppingCartProps, productID: number) => void;
    onIncreaseProductQuantity: (props: ShoppingCartProps, product: IProduct) => void;
    onCheckoutClicked: (props: ShoppingCartProps) => void;
    isLoading : boolean;
    resetLoadingStatus: () => void;
}

interface AdditionalShoppingCartState {
    match: any;
}

const calculateNumberOfSameItem = (arrayToCalculateFrom: IProduct[], productId: number): number => {
    let numberOfSameProduct = 0;

    arrayToCalculateFrom.forEach(
        (product) => {
            if (product.id === productId) {
                numberOfSameProduct++;
            }
        });

    return numberOfSameProduct;
}

const generateCheckoutArray = (props: ShoppingCartProps, arrayToGenerateCheckoutValueFrom: IProduct[]): CheckoutArrayItem[] => {
    let customCheckoutArray: Array<CheckoutArrayItem> = arrayToGenerateCheckoutValueFrom.map(product => ({ 'productId': product.id, 'quantity': calculateNumberOfSameItem(props.productsInShoppingCart, product.id) }));

    return customCheckoutArray;
}

const myHandlers = withHandlers({
    onDeleteProductPressed: (props: ShoppingCartProps) => (event: any, productID: number) => {
        //removing product from both arrays untill it is completely gone
        props.decreaseProductQuantity(productID, 2);
    },

    onDecreaseProductQuantity: (props: ShoppingCartProps) => (event: any, prodctuID: number) => {
        props.decreaseProductQuantity(prodctuID, 1);
    },
    

    onIncreaseProductQuantity: (props: ShoppingCartProps) => (event: any, product: IProduct) => {
        props.addProductToCart(product);
    },

    onCheckoutClicked: (props: ShoppingCartProps) => (event: any) => {
        const checkoutValue: string = `{"customer": "doej", "products": ${JSON.stringify(generateCheckoutArray(props, props.uniqueProductsInShoppingCart))}}`;

        props.checkoutShoppingCart(checkoutValue);
    }
})

const mapStateToProps = (state: AppState, additionalState: AdditionalShoppingCartState) => ({
    match: additionalState.match,
    //Din store
    productsInShoppingCart: state.cartReducer.productsInShoppingCart,
    uniqueProductsInShoppingCart: state.cartReducer.uniqueProductsInShoppingCart,
    checkoutActionStatus: state.cartReducer.checkoutActionStatus,
    numberOfProductsInShoppingCart: state.cartReducer.numberOfProductsInShoppingCart,
    totalPriceForShoppingCart: state.cartReducer.totalPriceForShoppingCart,
    isLoading: state.cartReducer.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addProductToCart: (updatedProductsInShoppingCart: IProduct) => dispatch(addProductToCart(updatedProductsInShoppingCart)),
    decreaseProductQuantity: (productID: number, deleteMode: number) => dispatch(decreaseProductQuantity(productID, deleteMode)),
    checkoutShoppingCart: (generatedStringForApiCall: string) => dispatch({ type: CHECKOUT_SHOPPING_CART, checkoutValue: generatedStringForApiCall }),
    resetLoadingStatus: () => dispatch(SCResetLoadingStatus())
});

const ShoppingCartViewInitializer = compose<ShoppingCartProps, {}>(
    setDisplayName('ShoppingCartView'),
    connect(mapStateToProps, mapDispatchToProps),
    myHandlers,
    LoadingWindowHoc
)(ShoppingCartDumpView);

export default ShoppingCartViewInitializer;