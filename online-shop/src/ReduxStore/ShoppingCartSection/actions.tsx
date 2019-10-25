import { IProduct } from '../../Models/Models';
import * as SCTypes from './types';

export function addProductToCart(productToBeAddedInCart: IProduct): SCTypes.ShoppingCartActionTypes {
    return {
        type: SCTypes.ADD_PRODUCT_TO_CART,
        productToBeAddedInCart: productToBeAddedInCart
    };
}

export function decreaseProductQuantity(productID : number, deleteMode : number) : SCTypes.SCDecreaseProductQuantityAction {
    return {
        type : SCTypes.DECREASE_PRODUCT_QUANTITY,
        productID : productID,
        deleteMode : deleteMode
    };
}

export function checkoutShoppingCart(productsInShoppingCart : IProduct[], uniqueProductsInShoppingCart : IProduct[], checkoutActionStatus : number) : SCTypes.SCCheckoutShoppingCartAction {
    return {
        type : SCTypes.CHECKOUT_SHOPPING_CART_ASYNC,
        productsInShoppingCart : productsInShoppingCart,
        uniqueProductsInShoppingCart : uniqueProductsInShoppingCart,
        checkoutActionStatus : checkoutActionStatus
    };
}

export function resetShoppingCart() : SCTypes.SCResetShoppingCartAction {
    return {
        type : SCTypes.RESET_SHOPPING_CART,
    };
}