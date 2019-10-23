import * as ACTypes from './types';
import { CustomProductImage } from '../../Models/Models';

export function addNewEntryToArray(item : CustomProductImage): ACTypes.AppComponentActionTypes {
    return {
        type: ACTypes.UPDATE_SPI_ARRAY,
        newEntryForArray : item
    };
}