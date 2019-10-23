import { IProduct } from "../../Models/Models";

export interface ShoppingCartState {
    productsInShoppingCart : IProduct[];
    uniqueProductsInShoppingCart : IProduct[];
    checkoutActionStatus : number;
    numberOfProductsInShoppingCart : number;
    totalPriceForShoppingCart : number;

}

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const CHECKOUT_SHOPPING_CART = "CHECKOUT_SHOPPING_CART";
export const RESET_SHOPPING_CART = "RESER_SHOPPING_CART";

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
    type: typeof CHECKOUT_SHOPPING_CART;
    productsInShoppingCart : IProduct[];
    uniqueProductsInShoppingCart : IProduct[];
    checkoutActionStatus : number;
}

export interface SCResetShoppingCartAction {
    type: typeof RESET_SHOPPING_CART
}

export type ShoppingCartActionTypes = SCAddProductToCartAction | SCDecreaseProductQuantityAction | SCCheckoutShoppingCartAction | SCResetShoppingCartAction;