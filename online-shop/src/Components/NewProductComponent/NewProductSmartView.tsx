import { AppState } from '../../ReduxStore';
import { connect } from 'react-redux';
import { IProduct } from '../../Models/Models';
import { Dispatch } from 'redux';
import { createNewProduct, updateToBeCreatedProductData } from '../../ReduxStore/NewProductSection/actions';
import { CREATE_PRODUCT } from '../../ReduxStore/NewProductSection/types';
import { compose, withHandlers, lifecycle, setDisplayName } from 'recompose';
import { NewProductDumpView } from './NewProductDumpView';
import { cloneDeep } from 'lodash';
import { LoadingWindowHoc } from '../../HelperComponents/HocComponents/LoadingWindowHoc';

export interface NewProductProps {
    match: any;
    createProductServerResponse: number;
    createNewProduct: (props: NewProductProps, productData: IProduct) => void;
    resetPageStatus: (props: NewProductProps, status: number) => void;
    dispatch: Dispatch;
    toBeCreatedProductData: IProduct;
    onTitleChange: (props: NewProductProps, value: string) => void;
    onCategoryChange: (props: NewProductProps, value: string) => void;
    onPriceChange: (props: NewProductProps, value: string) => void;
    onImageChange: (props: NewProductProps, value: string) => void;
    onDescriptionChange: (props: NewProductProps, value: string) => void;
    onApplyChangesClicked: (props : NewProductProps) => void;
    isLoading : boolean;
}

interface AdditionalNewProductState {
    match: any;
}

const areNewFormValuesOk = (props: NewProductProps): boolean => {
    if (props.toBeCreatedProductData.name.length !== 0) {
        if (props.toBeCreatedProductData.image.length !== 0) {
            if (props.toBeCreatedProductData.description.length !== 0) {
                if (Number(props.toBeCreatedProductData.price).toString() !== "NaN") {
                    return true;
                } else {
                    alert("Product price must have a numeric value");
                }
            } else {
                alert("Product description is missing");
            }
        } else {
            alert("Product image is missing");
        }
    } else {
        alert("Product title is missing");
    }

    return false;
}

const mapStateToProps = (state: AppState, additionalState: AdditionalNewProductState) => ({
    match: additionalState.match,
    createProductServerResponse: state.newProdReducer.createProductServerResponse,
    toBeCreatedProductData: state.newProdReducer.toBeCreatedProductData,
    isLoading : state.newProdReducer.isLoading
});

const myHandlers = withHandlers({
    createNewProduct: (props: NewProductProps) => (event: any, productData: IProduct) => {
        props.dispatch({ type: CREATE_PRODUCT, payload: productData })
    },
    resetPageStatus: (props: NewProductProps) => (event: any, status: number) => {
        props.dispatch(createNewProduct(status))
    },

    onTitleChange: (props: NewProductProps) => (event: any, value: string) => {
        let productTitle = value.trim();

        let auxTempObject: IProduct = cloneDeep(props.toBeCreatedProductData);
        auxTempObject.name = productTitle;

        props.dispatch(updateToBeCreatedProductData(auxTempObject));
    },

    onCategoryChange: (props: NewProductProps) => (event: any, value: string) => {
        let productCategory = value.trim();

        let auxTempObject: IProduct = cloneDeep(props.toBeCreatedProductData);
        auxTempObject.category = productCategory;

        props.dispatch(updateToBeCreatedProductData(auxTempObject));
    },

    onPriceChange: (props: NewProductProps) => (event: any, value: string) => {
        let productPrice = +value.trim();  //string -> number conversion : +string = number

        let auxTempObject: IProduct = cloneDeep(props.toBeCreatedProductData);
        auxTempObject.price = productPrice;

        props.dispatch(updateToBeCreatedProductData(auxTempObject));
    },

    onImageChange: (props: NewProductProps) => (event: any, value: string) => {
        let productImage = value.trim();

        let auxTempObject: IProduct = cloneDeep(props.toBeCreatedProductData);
        auxTempObject.image = productImage;

        props.dispatch(updateToBeCreatedProductData(auxTempObject));
    },

    onDescriptionChange: (props: NewProductProps) => (event: any, value: string) => {
        let productDescription = value.trim();

        let auxTempObject: IProduct = cloneDeep(props.toBeCreatedProductData);
        auxTempObject.description = productDescription;

        props.dispatch(updateToBeCreatedProductData(auxTempObject));
    },

    onApplyChangesClicked : (props : NewProductProps) => (event : any) => {
        if (areNewFormValuesOk(props)) {
            const newProduct: IProduct = {
                id: 123,
                name: props.toBeCreatedProductData.name,
                category: props.toBeCreatedProductData.category,
                price: props.toBeCreatedProductData.price,
                image: props.toBeCreatedProductData.image,
                description: props.toBeCreatedProductData.description
            };

            //Send the API call to the server to create the new product
            props.dispatch({ type: CREATE_PRODUCT, payload: newProduct })
        }
    }
})

const onComponentDidMount = lifecycle<NewProductProps, {}, {}>({
    componentDidMount() {
        //Reset the state of the component to the default value
        this.props.resetPageStatus(this.props, 0);
    }
})

const NewProductViewInitializer = compose<NewProductProps, {}>(
    setDisplayName('NewProductView'),
    connect(mapStateToProps),
    myHandlers,
    onComponentDidMount,
    LoadingWindowHoc
)(NewProductDumpView);

export default NewProductViewInitializer;