import { IProduct } from "../../Models/Models";

export interface ShoppingCartState {
    productsInShoppingCart : IProduct[];
    uniqueProductsInShoppingCart : IProduct[];
    checkoutActionStatus : number;
}

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";

export const CALCULATE_NUMBER_OF_SAME_ITEM = "CALCULATE_NUMBER_OF_SAME_ITEM";
export const CALCULATE_TOTAL_PRICE = "CALCULATE_TOTAL_PRICE";
export const REMOVE_DUPLICATES_FROM_CART = "REMOVE_DUPLICATES_FROM_CART";
export const REMOVE_ITEM_FROM_UNIQUE_ARRAY = "REMOVE_ITEM_FROM_UNIQUE_ARRAY";
export const CHECKOUT_SHOPPING_CART = "CHECKOUT_SHOPPING_CART";
export const GENERATE_CHECKOUT_ARRAY = "GENERATE_CHECKOUT_ARRAY";

export interface SCAddProductToCartAction {
    type: typeof ADD_PRODUCT_TO_CART;
    productToBeAddedInCart : IProduct;
    updatedCheckoutActionStatus : number;
}

export interface SCDecreaseProductQuantityAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export interface SCCalculateNumberOfSameItemAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export interface SCCalculateTotalPriceAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export interface SCRemoveDuplicatesFromCartAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export interface SCRemoveItemFromUniqueArrayAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export interface SCCheckoutShoppingCartAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export interface SCGenerateCheckoutArrayAction {
    type: typeof ADD_PRODUCT_TO_CART;
}

export type ShoppingCartActionTypes = SCAddProductToCartAction | SCDecreaseProductQuantityAction | SCCalculateNumberOfSameItemAction | SCCalculateTotalPriceAction | SCRemoveDuplicatesFromCartAction | SCRemoveItemFromUniqueArrayAction | SCCheckoutShoppingCartAction | SCGenerateCheckoutArrayAction ;