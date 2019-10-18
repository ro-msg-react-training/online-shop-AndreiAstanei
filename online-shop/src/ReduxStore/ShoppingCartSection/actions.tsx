import { IProduct } from '../../Models/Models';
import * as SCTypes from './types';

export function addProductToCart(productToBeAddedInCart : IProduct, checkoutStatus : number) : SCTypes.ShoppingCartActionTypes {
    return {
        type : SCTypes.ADD_PRODUCT_TO_CART,
        productToBeAddedInCart : productToBeAddedInCart,
        updatedCheckoutActionStatus : checkoutStatus
    };
}