import { put } from "redux-saga/effects";
import { IProduct } from "../../Models/Models";
import { loadProducts } from "../../ReduxStore/ProductListSection/actions";

export function* performProductListLoad() {
    const ProductsApiEndpointUrl = "http://localhost:4000/products";
  
    let fetchedList: IProduct[] = [];
    let loadingStatus: boolean = true;
    let errorMessage: string = "No errors found";
  
    yield fetch(ProductsApiEndpointUrl, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        fetchedList = result;
        loadingStatus = false
      })
      .catch(error => {
        errorMessage = error;
        loadingStatus = false
      });
  
    yield put(loadProducts(fetchedList, loadingStatus, errorMessage));
  }