import * as SCTypes from './types';

const initialState: SCTypes.ShoppingCartState = {
    productsInShoppingCart : [],
    uniqueProductsInShoppingCart : [],
    checkoutActionStatus : 0
};

export function shoppingCartReducer(state : SCTypes.ShoppingCartState = initialState, action : SCTypes.ShoppingCartActionTypes) : SCTypes.ShoppingCartState {
    switch(action.type) {
        case SCTypes.ADD_PRODUCT_TO_CART:
            let currentAction : SCTypes.SCAddProductToCartAction = action as SCTypes.SCAddProductToCartAction;

            return {
                productsInShoppingCart : [...state.productsInShoppingCart, currentAction.productToBeAddedInCart],
                uniqueProductsInShoppingCart : state.uniqueProductsInShoppingCart,
                checkoutActionStatus : currentAction.updatedCheckoutActionStatus
            };

        default:
            return state;
    }
}