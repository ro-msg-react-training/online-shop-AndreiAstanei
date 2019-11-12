import { AppState } from '../../ReduxStore';
import { connect } from 'react-redux';
import { IProduct } from '../../Models/Models';
import { initialProductDetailsLoad, updateTemporaryProduct } from '../../ReduxStore/EditProductPageSection/actions';
import { Dispatch } from 'redux';
import { LOAD_PRODUCT_DETAILS_FOR_EDIT, EDIT_PRODUCT } from '../../ReduxStore/EditProductPageSection/types';
import { withHandlers, compose, lifecycle, setDisplayName } from 'recompose';
import { cloneDeep } from 'lodash';
import { EditProductDumpView } from './EditProductDumpView';
import { LoadingWindowHoc } from '../../HelperComponents/HocComponents/LoadingWindowHoc';

export interface EditProductPageProps {
    dispatch: Dispatch;
    productInEditStage: IProduct;
    isLoading: boolean;
    submitChangesResponse: number;
    loadProductData: (props: EditProductPageProps, productID: number) => void;
    editProduct: (product: IProduct) => void;
    match: any;
    initialProductDetailsLoad: () => void;
    temporaryProduct: IProduct;
    updateTemporaryProductValues: (newValues: IProduct) => void;
    onApplyChangesClicked: (props: EditProductPageProps) => void;
    onTitleChange: (props: EditProductPageProps, value : string) => void;
    onCategoryChange: (props: EditProductPageProps, value : string) => void;
    onPriceChange: (props: EditProductPageProps, value : string) => void;
    onImageChange: (props: EditProductPageProps, value : string) => void;
    onDescriptionChange: (props: EditProductPageProps, value : string) => void;
}

interface AdditionalEditProductPageState {
    match: any;
}

//String comparison function
const areStringsEqual = (firstString: string, secondString: string): boolean => {
    if (firstString === secondString) {
        return true;
    } else {
        return false;
    }
}

const didFormInputValuesChanged = (props: EditProductPageProps): boolean => {
    if (!areStringsEqual(props.temporaryProduct.name, props.productInEditStage.name) ||
        !areStringsEqual(props.temporaryProduct.category, props.productInEditStage.category) ||
        (props.temporaryProduct.price !== props.productInEditStage.price) ||
        !areStringsEqual(props.temporaryProduct.image, props.productInEditStage.image) ||
        !areStringsEqual(props.temporaryProduct.description, props.productInEditStage.description)) {

        return true;
    } else {
        return false;
    }
}

const areNewFormValuesOk = (title: string, image: string, description: string, price: string): boolean => {
    if (title.length === 0) {
        alert("Product title is missing");
    } else if (image.length === 0) {
        alert("Product image is missing");
    } else if (description.length === 0) {
        alert("Product description is missing");
    } else if (Number(price).toString() === "NaN") {
        alert("Product price must have a numeric value");
    } else {
        return true;
    }

    return false;
}

const mapStateToProps = (state: AppState, additionalState: AdditionalEditProductPageState) => ({
    match: additionalState.match,
    productInEditStage: state.editProductReducer.productInEditStage,
    isLoading: state.editProductReducer.isLoading,
    submitChangesResponse: state.editProductReducer.submitChangesResponse,
    temporaryProduct: state.editProductReducer.temporaryValuesForProduct
});

const myHandlers = withHandlers({
    loadProductData: (props: EditProductPageProps) => (event: any, productID: number) => {
        props.dispatch({ type: LOAD_PRODUCT_DETAILS_FOR_EDIT, payload: productID })
    },

    editProduct: (props: EditProductPageProps) => (event: any, product: IProduct) => {
        props.dispatch({ type: EDIT_PRODUCT, payload: product })
    },
    initialProductDetailsLoad: (props: EditProductPageProps) => (event: any) => {
        props.dispatch(initialProductDetailsLoad())
    },
    updateTemporaryProductValues: (props: EditProductPageProps) => (event: any, newProdValues: IProduct) => {
        props.dispatch(updateTemporaryProduct(newProdValues))
    },
    onApplyChangesClicked: (props: EditProductPageProps) => (event: any) => {
        if (didFormInputValuesChanged(props)) {
            if (areNewFormValuesOk(props.temporaryProduct.name, props.temporaryProduct.image, props.temporaryProduct.description, props.temporaryProduct.price.toString())) {
                const updatedProduct: IProduct = {
                    id: props.productInEditStage.id,
                    name: props.temporaryProduct.name,
                    category: props.temporaryProduct.category,
                    price: props.temporaryProduct.price,
                    image: props.temporaryProduct.image,
                    description: props.temporaryProduct.description
                };

                props.dispatch({ type: EDIT_PRODUCT, payload: updatedProduct })
            }
        } else {
            alert("New values are needed for input fields to apply the changes.");
        }
    },
    onTitleChange: (props: EditProductPageProps) => (event: any, value: string) => {
        let title: string = value;

        let auxTempObject: IProduct = cloneDeep(props.temporaryProduct);
        auxTempObject.name = title;

        props.dispatch(updateTemporaryProduct(auxTempObject));
    },

    onCategoryChange: (props: EditProductPageProps) => (event: any, value: string) => {
        let category: string = value;

        let auxTempObject: IProduct = cloneDeep(props.temporaryProduct);
        auxTempObject.category = category;

        props.dispatch(updateTemporaryProduct(auxTempObject));
    },

    onPriceChange: (props: EditProductPageProps) => (event: any, value: string) => {
        let price: number = +value;  //string -> number conversion : +string = number

        let auxTempObject: IProduct = cloneDeep(props.temporaryProduct);
        auxTempObject.price = price;

        props.dispatch(updateTemporaryProduct(auxTempObject));
    },

    onImageChange: (props: EditProductPageProps) => (event: any, value: string) => {
        let image: string = value;

        let auxTempObject: IProduct = cloneDeep(props.temporaryProduct);
        auxTempObject.image = image;

        props.dispatch(updateTemporaryProduct(auxTempObject));
    },

    onDescriptionChange: (props: EditProductPageProps) => (event: any, value: string) => {
        let description : string = value.trim();
        console.log(description);

        let auxTempObject : IProduct = cloneDeep(props.temporaryProduct);
        auxTempObject.description = description;

        props.dispatch(updateTemporaryProduct(auxTempObject));
    }
})

const onComponentDidMount = lifecycle<EditProductPageProps, {}, {}>({
    componentDidMount() {
        this.props.initialProductDetailsLoad();
        this.props.loadProductData(this.props, this.props.match.params.id);
    }
})

//Problems here
const onComponentDiUpdate = lifecycle<EditProductPageProps, {}, {}>({
    componentDidUpdate() {
        //Aici e problema cu update-ul de date. Nu stiu de ce sterge informatiile din tempProd, desi cand se executa informatiile sunt acolo
        if (!this.props.isLoading) {
            //this.props.updateTemporaryProductValues(this.props.productInEditStage);
        }
    }
})

const EditProductPageViewInitializer = compose<EditProductPageProps, {}>(
    setDisplayName('EditProductView'),
    connect(mapStateToProps),
    myHandlers,
    onComponentDidMount,
    onComponentDiUpdate,
    LoadingWindowHoc
)(EditProductDumpView);

export default EditProductPageViewInitializer;