import * as SCTypes from './types';
import { IProduct } from '../../Models/Models';
import { cloneDeep } from 'lodash';

const initialState: SCTypes.ShoppingCartState = {
    productsInShoppingCart: [],
    uniqueProductsInShoppingCart: [],
    checkoutActionStatus: 0,
    numberOfProductsInShoppingCart: 0,
    totalPriceForShoppingCart: 0,
    isLoading : false
};

export function shoppingCartReducer(state: SCTypes.ShoppingCartState = initialState, action: SCTypes.ShoppingCartActionTypes): SCTypes.ShoppingCartState {
    switch (action.type) {
        case SCTypes.ADD_PRODUCT_TO_CART: {
            let addedProductsToArray: IProduct[] = [...state.productsInShoppingCart, action.productToBeAddedInCart];
            return {
                productsInShoppingCart: addedProductsToArray,
                uniqueProductsInShoppingCart: removeDuplicatesFromMainArray(state, addedProductsToArray),
                checkoutActionStatus: state.checkoutActionStatus,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(addedProductsToArray),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(addedProductsToArray),
                isLoading : state.isLoading
            };
        }

        case SCTypes.DECREASE_PRODUCT_QUANTITY: {
            let tempProductsInShoppingCart: IProduct[] = [];
            let tempUniqueProductsInShoppingCart: IProduct[] = [];
            let tempCheckoutActionStatus: number = state.checkoutActionStatus;

            let deleteMode = action.deleteMode;

            //Single mode delete
            if (deleteMode === 1) {
                tempProductsInShoppingCart = cloneDeep(state.productsInShoppingCart);
                tempUniqueProductsInShoppingCart = cloneDeep(state.uniqueProductsInShoppingCart);

                if (calculateNumberOfSameItem(tempProductsInShoppingCart, action.productID) > 1) {
                    tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(tempProductsInShoppingCart, action.productID);
                } else if (calculateNumberOfSameItem(tempProductsInShoppingCart, action.productID) === 1) {
                    tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(tempProductsInShoppingCart, action.productID);
                    tempUniqueProductsInShoppingCart = removeItemFromUniqueArray(tempUniqueProductsInShoppingCart, action.productID);
                }   //All mode delete
            } else if (deleteMode === 2) {
                tempProductsInShoppingCart = cloneDeep(state.productsInShoppingCart);
                tempUniqueProductsInShoppingCart = cloneDeep(state.uniqueProductsInShoppingCart);
                
                while (calculateNumberOfSameItem(tempProductsInShoppingCart, action.productID) >= 1) {
                    if (calculateNumberOfSameItem(tempProductsInShoppingCart, action.productID) > 1) {
                        tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(tempProductsInShoppingCart, action.productID);
                    } else if (calculateNumberOfSameItem(tempProductsInShoppingCart, action.productID) === 1) {
                        tempProductsInShoppingCart = decreaseProductQuantityFromShoppingCart(tempProductsInShoppingCart, action.productID);
                        tempUniqueProductsInShoppingCart = removeItemFromUniqueArray(tempUniqueProductsInShoppingCart, action.productID);
                    }
                }
            }

            return {
                productsInShoppingCart: [...tempProductsInShoppingCart],
                uniqueProductsInShoppingCart: [...tempUniqueProductsInShoppingCart],
                checkoutActionStatus: tempCheckoutActionStatus,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(tempProductsInShoppingCart),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(tempProductsInShoppingCart),
                isLoading : state.isLoading
            };
        }

        case SCTypes.CHECKOUT_SHOPPING_CART_ASYNC: {
            return {
                productsInShoppingCart: action.productsInShoppingCart,
                uniqueProductsInShoppingCart: action.uniqueProductsInShoppingCart,
                checkoutActionStatus: action.checkoutActionStatus,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(state.productsInShoppingCart),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(state.productsInShoppingCart),
                isLoading : false
            };
        }

        case SCTypes.RESET_SHOPPING_CART: {
            return {
                productsInShoppingCart: state.productsInShoppingCart,
                uniqueProductsInShoppingCart: state.uniqueProductsInShoppingCart,
                checkoutActionStatus: 0,
                numberOfProductsInShoppingCart: calculateNumberOfItemsInShoppingCart(state.productsInShoppingCart),
                totalPriceForShoppingCart: calculateTotalPriceForShoppingCart(state.productsInShoppingCart),
                isLoading : state.isLoading
            };
        }

        case SCTypes.SC_RESET_LOADING_STATUS: {
            return {
                ...state,
                isLoading : true
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
    let temporaryArray: IProduct[] = cloneDeep(arrayToDecreaseQuantityFrom);

    if (shoppingArrayIndex > -1) {
        temporaryArray.splice(shoppingArrayIndex, 1);
    }

    return temporaryArray;
}

let removeItemFromUniqueArray = (arrayToDecreaseQuantityFrom : IProduct[], productID: number): IProduct[] => {
    let productIndexInUniqueArray = arrayToDecreaseQuantityFrom.findIndex(i => i.id === productID);
    let temporaryArray: IProduct[] = cloneDeep(arrayToDecreaseQuantityFrom);

    if (productIndexInUniqueArray > -1) {
        temporaryArray.splice(productIndexInUniqueArray, 1);
    }

    return temporaryArray;
}
