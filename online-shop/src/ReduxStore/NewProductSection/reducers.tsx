import * as NPTypes from './types';

const initialState: NPTypes.NewProductState = {
    createProductServerResponse : 0
};

export function newProductReducer(state: NPTypes.NewProductState = initialState, action: NPTypes.NewProductActionTypes): NPTypes.NewProductState {
    switch(action.type) {
        case NPTypes.CREATE_PRODUCT: {
            const currentAction : NPTypes.NPCreateNewProductAction = action as NPTypes.NPCreateNewProductAction;

            return {
                createProductServerResponse : currentAction.createProductServerResponse
            };
        }

        default:
            return state;
    }
}