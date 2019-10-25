import * as PDTypes from './types';

const initialState: PDTypes.ProductDetailsState = {
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

export function productDetailsReducer(state : PDTypes.ProductDetailsState = initialState, action : PDTypes.ProductDetailsActionTypes) : PDTypes.ProductDetailsState {
    switch(action.type) {
        case PDTypes.LOAD_PRODUCT_DETAILS_ASYNC:{
            return {
                toBeReceivedData : action.toBeReceivedData,
                isLoading : action.isLoading,
                isDeleteModalOpen : action.isDeleteModalOpen,
                shouldRedirectToShoppingCart : action.shouldRedirectToShoppingCart,
                error : action.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            };
        }

        case PDTypes.DELETE_PRODUCT_FROM_STORE: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : state.shouldRedirectToShoppingCart,
                error : state.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            }
        }

        case PDTypes.ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : state.shouldRedirectToShoppingCart,
                error : state.error,
                shouldRedirectFromModalDelete : !state.shouldRedirectFromModalDelete
            };
        }

        case PDTypes.ACTIVATE_REDIRECT: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : true,
                error : state.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            };
        }

        case PDTypes.DEACTIVATE_REDIRECT: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : false,
                error : state.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            };
        }

        case PDTypes.TOGGLE_CONFIRMATION_DIALOG: {
            return {
                toBeReceivedData : state.toBeReceivedData,
                isLoading : state.isLoading,
                isDeleteModalOpen : !state.isDeleteModalOpen,
                shouldRedirectToShoppingCart : state.shouldRedirectToShoppingCart,
                error : state.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            };
        }

        default:
            return state;
    }
}