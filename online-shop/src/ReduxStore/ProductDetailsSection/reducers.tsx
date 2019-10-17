import { ProductDetailsState, LOAD_PRODUCT_DETAILS, ProductDetailsActionTypes } from './types';

const initialState: ProductDetailsState = {
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
    error: "No errors found"
};

export function productDetailsReducer(state : ProductDetailsState = initialState, action : ProductDetailsActionTypes) : ProductDetailsState {
    switch(action.type) {
        case LOAD_PRODUCT_DETAILS:
            return {
                toBeReceivedData : action.toBeReceivedData,
                isLoading : action.isLoading,
                isDeleteModalOpen : action.isDeleteModalOpen,
                shouldRedirectToShoppingCart : action.shouldRedirectToShoppingCart,
                error : action.error
            };

        default:
            return state;
    }
}