import * as SCTypes from './types';

const initialState: SCTypes.ProductDetailsState = {
    toBeReceivedData: {
        id: 0,
        name: "Unknown",
        category: "Not Specified",
        image: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png",
        price: 0,
        description: "No description",
    },
    isLoading: false,
    isDeleteModalOpen: false,
    shouldRedirectToShoppingCart: false,
    error: "No errors found",
    shouldRedirectFromModalDelete: false
};

export function productDetailsReducer(state : SCTypes.ProductDetailsState = initialState, action : SCTypes.ProductDetailsActionTypes) : SCTypes.ProductDetailsState {
    switch(action.type) {
        case SCTypes.LOAD_PRODUCT_DETAILS:{
            return {
                toBeReceivedData : action.toBeReceivedData,
                isLoading : action.isLoading,
                isDeleteModalOpen : action.isDeleteModalOpen,
                shouldRedirectToShoppingCart : action.shouldRedirectToShoppingCart,
                error : action.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            };
        }

        case SCTypes.DELETE_PRODUCT_FROM_STORE: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : state.shouldRedirectToShoppingCart,
                error : state.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            }
        }

        case SCTypes.ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : state.shouldRedirectToShoppingCart,
                error : state.error,
                shouldRedirectFromModalDelete : !state.shouldRedirectFromModalDelete
            };
        }

        default:
            return state;
    }
}