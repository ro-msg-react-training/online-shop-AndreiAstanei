import * as SVTypes from './types';
import { SalesViewState } from './types';
import { PIE_CHART } from '../../Components/SalesComponent/ChartsHelper';

const initialState: SalesViewState = {
    salesData: [],
    isLoading: true,
    error: "No errors found",
    selectedChart : PIE_CHART
};

export function salesViewReducer(state : SalesViewState = initialState, action: SVTypes.SalesViewActionTypes): SalesViewState {    
    switch (action.type) {
        case SVTypes.LOAD_SALES_ASYNC:
            return {
                salesData : action.salesData,
                isLoading : action.isLoading,
                error : action.error,
                selectedChart : state.selectedChart
            };

        case SVTypes.CHANGE_SELECTION: {
            return {
                ...state,
                selectedChart : action.selectedChart
            };
        }

        case SVTypes.SV_RESET_LOADING_STATUS: {
            return {
                ...state,
                isLoading : true
            };
        }

        default:
            return state;
    }
}