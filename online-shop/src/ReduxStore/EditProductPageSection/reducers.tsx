import * as EPTypes from './types';

const initialState: EPTypes.EditProductPageState = {
    productInEditStage : {
        id: 0,
        name: "Unknown",
        category: "Not specified",
        image: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png",
        price: 0,
        description: "No description provided"
    },
    isLoading : true,
    submitChangesResponse : 0
};

export function editProductPageReducer(state: EPTypes.EditProductPageState = initialState, action: EPTypes.EditProductPageActionTypes): EPTypes.EditProductPageState {
    switch(action.type) {
        case EPTypes.LOAD_PRODUCT_DETAILS_FOR_EDIT_ASYNC: {
            const currentAction : EPTypes.EPLoadProductDetailsAction = action as EPTypes.EPLoadProductDetailsAction;

            return {
                productInEditStage : {...currentAction.product},
                isLoading : false,
                submitChangesResponse : 0
            };
        }

        case EPTypes.EDIT_PRODUCT_ASYNC: {
            const currentAction : EPTypes.EPEditProductAction = action as EPTypes.EPEditProductAction;

            return {
                productInEditStage : currentAction.product,
                isLoading : false,
                submitChangesResponse : currentAction.submitChangesResponse
            };
        }

        case EPTypes.INITIAL_PRPODUCT_DETAILS_LOAD: {
            console.log("Reducer Initial Load - " + state.productInEditStage + ", " + state.submitChangesResponse + ", " + state.isLoading);

            return {
                productInEditStage : state.productInEditStage,
                isLoading : true,
                submitChangesResponse : 0
            };
        }

        default:
            return state;
    }
}