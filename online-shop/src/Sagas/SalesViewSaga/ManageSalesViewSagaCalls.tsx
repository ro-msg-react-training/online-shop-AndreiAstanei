import { put } from 'redux-saga/effects';
import { SalesItem } from '../../Models/Models';
import { loadSales } from '../../ReduxStore/SalesViewSection/actions';

export function* performLoadSalesCallToServer() {
    const SalesApiEndpointUrl = "http://localhost:4000/sales";

    let fetchedList: SalesItem[] = [];
    let loadingStatus: boolean = true;
    let errorMessage: string = "No errors found";

    yield fetch(SalesApiEndpointUrl, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            fetchedList = result;
            loadingStatus = false
        })
        .catch(error => {
            errorMessage = error;
            loadingStatus = false
        });

    yield put(loadSales(fetchedList, loadingStatus, errorMessage));
}