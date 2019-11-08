import { IProduct } from "../../Models/Models";

export interface ShoppingCartState {
    productsInShoppingCart : IProduct[];
    uniqueProductsInShoppingCart : IProduct[];
    checkoutActionStatus : number;
    numberOfProductsInShoppingCart : number;
    totalPriceForShoppingCart : number;
    isLoading : boolean;
}

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const CHECKOUT_SHOPPING_CART = "CHECKOUT_SHOPPING_CART";
export const RESET_SHOPPING_CART = "RESER_SHOPPING_CART";
export const CHECKOUT_SHOPPING_CART_ASYNC = "CHECKOUT_SHOPPING_CART_ASYNC";
export const SC_RESET_LOADING_STATUS = "SC_RESET_LOADING_STATUS";

export interface SCAddProductToCartAction {
    type: typeof ADD_PRODUCT_TO_CART;
    productToBeAddedInCart : IProduct;
}

export interface SCDecreaseProductQuantityAction {
    type: typeof DECREASE_PRODUCT_QUANTITY;
    productID : number;
    deleteMode : number;
}

export interface SCCheckoutShoppingCartAction {
    type: typeof CHECKOUT_SHOPPING_CART_ASYNC;
    productsInShoppingCart : IProduct[];
    uniqueProductsInShoppingCart : IProduct[];
    checkoutActionStatus : number;
}

export interface SCResetShoppingCartAction {
    type: typeof RESET_SHOPPING_CART
}

export interface SCReserLoadingStatusAction {
    type : typeof SC_RESET_LOADING_STATUS;
}

export type ShoppingCartActionTypes = SCAddProductToCartAction | SCDecreaseProductQuantityAction | SCCheckoutShoppingCartAction | SCResetShoppingCartAction | SCReserLoadingStatusAction;