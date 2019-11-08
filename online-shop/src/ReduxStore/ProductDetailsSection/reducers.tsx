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
                isLoading : false,
                isDeleteModalOpen : action.isDeleteModalOpen,
                shouldRedirectToShoppingCart : action.shouldRedirectToShoppingCart,
                error : action.error,
                shouldRedirectFromModalDelete : state.shouldRedirectFromModalDelete
            };
        }

        case PDTypes.DELETE_PRODUCT_FROM_STORE: {
            return {
                ...state
            }
        }

        case PDTypes.ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS: {
            return {
                ...state,
                shouldRedirectFromModalDelete : !state.shouldRedirectFromModalDelete
            };
        }

        case PDTypes.ACTIVATE_REDIRECT: {
            return {
                ...state,
                shouldRedirectToShoppingCart : true
            };
        }

        case PDTypes.DEACTIVATE_REDIRECT: {
            return {
                ...state,
                shouldRedirectToShoppingCart : false
            };
        }

        case PDTypes.TOGGLE_CONFIRMATION_DIALOG: {
            return {
                ...state,
                isDeleteModalOpen : !state.isDeleteModalOpen
            };
        }

        case PDTypes.PD_RESET_LOADING_STATUS: {
            return {
                ...state,
                isLoading : true
            };
        }

        default:
            return state;
    }
}