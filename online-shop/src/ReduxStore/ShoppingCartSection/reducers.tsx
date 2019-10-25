import * as SCTypes from './types';
import { IProduct } from '../../Models/Models';

const initialState: SCTypes.ShoppingCartState = {
    productsInShoppingCart: [],
    uniqueProductsInShoppingCart: [],
    checkoutActionStatus: 0,
    numberOfProductsInShoppingCart: 0,
    totalPriceForShoppingCart: 0
};

export function shoppingCartReducer(state: SCTypes.ShoppingCartState = initialState, action: SCTypes.ShoppingCartActionTypes): SCTypes.ShoppingCartState {
    switch (action.type) {
        case SCTypes.ADD_PRODUCT_TO_CART: {
            const currentAction: SCTypes.SCAddProductToCartAction = action as SCTypes.SCAddProductToCartAction;

            let addedProductsToArray: IProduct[] = [...state.productsInShoppingCart, currentAction.productToBeAddedInCart];
            return {
                productsInShoppingCart: addedProductsToArray,
                uniqueProductsInShoppingCart: removeDuplicatesFromMainArray(state, addedProductsToArray),
                checkoutActionStatus: state.checkoutActionStatus,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(addedProductsToArray),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(addedProductsToArray)
            };
        }

        case SCTypes.DECREASE_PRODUCT_QUANTITY: {
            const currentAction: SCTypes.SCDecreaseProductQuantityAction = action as SCTypes.SCDecreaseProductQuantityAction;
            let tempProductsInShoppingCart: IProduct[] = [];
            let tempUniqueProductsInShoppingCart: IProduct[] = [];
            let tempCheckoutActionStatus: number = state.checkoutActionStatus;

            let deleteMode = currentAction.deleteMode;

            //Single mode delete
            if (deleteMode === 1) {
                tempProductsInShoppingCart = state.productsInShoppingCart;
                tempUniqueProductsInShoppingCart = state.uniqueProductsInShoppingCart;

                if (calculateNumberOfSameItem(state.productsInShoppingCart, currentAction.productID) > 1) {
                    tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(state.productsInShoppingCart, currentAction.productID);
                } else if (calculateNumberOfSameItem(state.productsInShoppingCart, currentAction.productID) === 1) {
                    tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(state.productsInShoppingCart, currentAction.productID);
                    tempUniqueProductsInShoppingCart = removeItemFromUniqueArray(state, currentAction.productID);
                }   //All mode delete
            } else if (deleteMode === 2) {
                tempProductsInShoppingCart = state.productsInShoppingCart;
                tempUniqueProductsInShoppingCart = state.uniqueProductsInShoppingCart;
                
                while (calculateNumberOfSameItem(state.productsInShoppingCart, currentAction.productID) >= 1) {
                    if (calculateNumberOfSameItem(state.productsInShoppingCart, currentAction.productID) > 1) {
                        tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(state.productsInShoppingCart, currentAction.productID);
                    } else if (calculateNumberOfSameItem(state.productsInShoppingCart, currentAction.productID) === 1) {
                        tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(state.productsInShoppingCart, currentAction.productID);
                        tempUniqueProductsInShoppingCart = removeItemFromUniqueArray(state, currentAction.productID);
                    }
                }
            }

            return {
                productsInShoppingCart: [...tempProductsInShoppingCart],
                uniqueProductsInShoppingCart: [...tempUniqueProductsInShoppingCart],
                checkoutActionStatus: tempCheckoutActionStatus,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(state.productsInShoppingCart),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(state.productsInShoppingCart)
            };
        }

        case SCTypes.CHECKOUT_SHOPPING_CART_ASYNC: {
            const currentAction: SCTypes.SCCheckoutShoppingCartAction = action as SCTypes.SCCheckoutShoppingCartAction;

            return {
                productsInShoppingCart: currentAction.productsInShoppingCart,
                uniqueProductsInShoppingCart: currentAction.uniqueProductsInShoppingCart,
                checkoutActionStatus: currentAction.checkoutActionStatus,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(state.productsInShoppingCart),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(state.productsInShoppingCart)
            };
        }

        case SCTypes.RESET_SHOPPING_CART: {
            return {
                productsInShoppingCart: state.productsInShoppingCart,
                uniqueProductsInShoppingCart: state.uniqueProductsInShoppingCart,
                checkoutActionStatus: 0,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(state.productsInShoppingCart),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(state.productsInShoppingCart)
            };
        }

        default:
            return state;
    }
}

let calculateNumberOfSameItem = (arrayToCalculateFrom: IProduct[], productId: number): number => {
    let numberOfSameProduct = 0;

    arrayToCalculateFrom.forEach(
        (product) => {
            if (product.id === productId) {
                numberOfSameProduct++;
            }
        });

    return numberOfSameProduct;
}

let calculateNumberOfItemsInShoppingCart = (arrayToCalculateFrom: IProduct[]): number => {
    return arrayToCalculateFrom.length;
}

let calculateTotalPriceForShoppingCart = (arrayToCalculateFrom: IProduct[]): number => {
    let calculatedPrice = 0;

    if (arrayToCalculateFrom.length) {
        arrayToCalculateFrom.forEach(
            (currentProduct) => {
                calculatedPrice += currentProduct.price;
            }
        );
    }

    return calculatedPrice;
}

let removeDuplicatesFromMainArray = (state: SCTypes.ShoppingCartState = initialState, arrayToParse: IProduct[]): IProduct[] => {
    //pentru fiecare element din state
    arrayToParse.forEach((product) => {
        let flagProductAlreadyExists: boolean = true;

        //verificam daca este in unique, in cazul in care unique are macar 1 element
        if (state.uniqueProductsInShoppingCart.length >= 1) {
            state.uniqueProductsInShoppingCart.forEach((uniqueProduct) => {
                if (product.id === uniqueProduct.id) {
                    flagProductAlreadyExists = false;
                }
            });
        }

        if (flagProductAlreadyExists) {
            state.uniqueProductsInShoppingCart = [...state.uniqueProductsInShoppingCart, product];
        }
    });

    return state.uniqueProductsInShoppingCart;
}

let decreaseProductQuantityFromShoppingCart = (arrayToDecreaseQuantityFrom: IProduct[], productId: number): IProduct[] => {
    let shoppingArrayIndex = arrayToDecreaseQuantityFrom.findIndex(i => i.id === productId);
    let temporaryArray: IProduct[] = arrayToDecreaseQuantityFrom;

    if (shoppingArrayIndex > -1) {
        //am pus asta aici si merge acum
        temporaryArray.splice(shoppingArrayIndex, 1);
    }

    return temporaryArray;
}

let removeItemFromUniqueArray = (state: SCTypes.ShoppingCartState = initialState, productID: number): IProduct[] => {
    let productIndexInUniqueArray = state.uniqueProductsInShoppingCart.findIndex(i => i.id === productID);
    let temporaryArray: IProduct[] = state.uniqueProductsInShoppingCart;

    if (productIndexInUniqueArray > -1) {
        temporaryArray.splice(productIndexInUniqueArray, 1);
    }

    return temporaryArray;
}
