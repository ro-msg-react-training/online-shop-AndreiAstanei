import * as ACTypes from './types';
import { ProductsImages } from '../../Models/Models';

const initialState: ACTypes.AppComponentState = {
    secondaryProductImagesArray : ProductsImages
};

export function appComponentReducer(state: ACTypes.AppComponentState = initialState, action: ACTypes.AppComponentActionTypes): ACTypes.AppComponentState {
    switch(action.type) {
        case ACTypes.UPDATE_SPI_ARRAY: {
            const currentAction : ACTypes.ACAddEntryToProductImagesArrayAction = action as ACTypes.ACAddEntryToProductImagesArrayAction;

            return {
                secondaryProductImagesArray : [...state.secondaryProductImagesArray, currentAction.newEntryForArray]
            };
        }

        default:
            return state;
    }
}