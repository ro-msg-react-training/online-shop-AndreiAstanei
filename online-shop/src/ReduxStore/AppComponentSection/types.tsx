import { CustomProductImage } from "../../Models/Models";

export interface AppComponentState {
    secondaryProductImagesArray : CustomProductImage[];
}

export const UPDATE_SPI_ARRAY = "UPDATE_SPI_ARRAY";

export interface ACAddEntryToProductImagesArrayAction {
    type : typeof UPDATE_SPI_ARRAY;
    newEntryForArray : CustomProductImage;
}

export type AppComponentActionTypes = ACAddEntryToProductImagesArrayAction;