import React, { SyntheticEvent } from 'react';
import '../../Styles/ComponentsStyles/ProductDetails.scss';
import { AppState } from '../../ReduxStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct } from '../../Models/Models';
import { initialProductDetailsLoad } from '../../ReduxStore/EditProductPageSection/actions';
import { Dispatch } from 'redux';
import { LOAD_PRODUCT_DETAILS_FOR_EDIT, EDIT_PRODUCT } from '../../ReduxStore/EditProductPageSection/types';

interface EditProductPageProps1 {
    productInEditStage: IProduct;
    isLoading: boolean;
    submitChangesResponse: number;
    loadProductData: (productID: number) => void;
    editProduct: (product: IProduct) => void;
    match: any;
    initialProductDetailsLoad: () => void;
}

interface AdditionalEditProductPageState {
    match: any;
}

interface LocalComponentState {
    productTitle: string;
    productCategory: string;
    productPrice: number;
    productImage: string;
    productDescription: string;
}

class EditProductPage extends React.Component<EditProductPageProps1, LocalComponentState> {
    constructor(props : EditProductPageProps1) {
        super(props);

        this.state = {
            productTitle : "Unknown title",
            productCategory : "Laptops",
            productPrice : 0,
            productImage : "",
            productDescription : "No description provided"
        };
    }

    onTitleChange = (e: SyntheticEvent) => {
        let title : string = (e.target as HTMLInputElement).value.trim();

        this.setState({
            productTitle : title
        });
    }

    onCategoryChange = (e: SyntheticEvent) => {
        let category : string = (e.target as HTMLInputElement).value.trim();

        this.setState({
            productCategory : category
        });
    }

    onPriceChange = (e: SyntheticEvent) => {
        let price : number = +(e.target as HTMLInputElement).value.trim();  //string -> number conversion : +string = number

        this.setState({
            productPrice : price
        });
    }

    onImageChange = (e: SyntheticEvent) => {
        let image : string = (e.target as HTMLInputElement).value.trim();

        this.setState({
            productImage : image
        });
    }

    onDescriptionChange = (e: SyntheticEvent) => {
        let description : string = (e.target as HTMLInputElement).value.trim();

        this.setState({
            productDescription : description
        });
    }

    //String comparison function
    areStringsEqual = (firstString: string, secondString: string): boolean => {
        if (firstString === secondString) {
            return true;
        } else {
            return false;
        }
    }

    didFormInputValuesChanged = (): boolean => {
        if (!this.areStringsEqual(this.state.productTitle, this.props.productInEditStage.name) ||
            !this.areStringsEqual(this.state.productCategory, this.props.productInEditStage.category) ||
            (this.state.productPrice !== this.props.productInEditStage.price) ||
            !this.areStringsEqual(this.state.productImage, this.props.productInEditStage.image) ||
            !this.areStringsEqual(this.state.productDescription, this.props.productInEditStage.description)) {

            return true;
        } else {
            return false;
        }
    }

    areNewFormValuesOk = (title : string, image : string, description : string, price : string): boolean => {
        if(title.length === 0) {
            alert("Product title is missing");
        } else if(image.length === 0) {
            alert("Product image is missing");
        } else if(description.length === 0) {
            alert("Product description is missing");
        } else if(Number(price)) {
            alert("Product price must have a numeric value");
        } else {
            return true;
        }

        return false;
    }

    onApplyChangesClicked = () => {
        if (this.didFormInputValuesChanged()) {
            if (this.areNewFormValuesOk(this.state.productTitle, this.state.productImage, this.state.productDescription, this.state.productPrice.toString())) {
                const updatedProduct: IProduct = {
                    id: this.props.productInEditStage.id,
                    name: this.state.productTitle,
                    category: this.state.productCategory,
                    price: this.state.productPrice,
                    image: this.state.productImage,
                    description: this.state.productDescription
                };

                console.log("New values for product: " + updatedProduct);
                //this.props.editProduct(updatedProduct);
            }
        } else {
            alert("New values are needed for input fields to apply the changes.");
        }
    }

    componentDidMount() {
        this.props.initialProductDetailsLoad();
        this.props.loadProductData(this.props.match.params.id);

        this.setState({
            productTitle : this.props.productInEditStage.name,
            productCategory : this.props.productInEditStage.category,
            productPrice : this.props.productInEditStage.price,
            productImage : this.props.productInEditStage.image,
            productDescription : this.props.productInEditStage.description
        });
    }

    render() {
        if (this.props.isLoading && this.props.submitChangesResponse === 0) {
            return (
                <div className="container is-vcentered">Loading product details...</div>
            );
        } else if (!this.props.isLoading) {
            if (this.props.submitChangesResponse === 0) {
                return (
                    <div className='container box is-family-primary'>
                        <div className="field">
                            <label className="label has-text-primary">Product Title</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Enter a title for product" defaultValue={this.props.productInEditStage.name} onChange={this.onTitleChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-primary">Product Category</label>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={this.props.productInEditStage.category} onChange={this.onCategoryChange}>
                                        <option>Laptops</option>
                                        <option>Accessories</option>
                                        <option>Flat Screen Monitors</option>
                                        <option>Printers</option>
                                        <option>Multifunction Printers</option>
                                        <option>Mice</option>
                                        <option>Keyboards</option>
                                        <option>Mousepads</option>
                                        <option>Computer System Accessories</option>
                                        <option>Graphic Cards</option>
                                        <option>Scanners</option>
                                        <option>Multifunction Printers</option>
                                        <option>Speakers</option>
                                        <option>Software</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-primary">Product Price</label>
                            <div className="field-body has-addons">
                                <div className="control button is-static">
                                    lei
                            </div>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Enter product price" defaultValue={this.props.productInEditStage.price.toString()} onChange={this.onPriceChange} />
                                </div>
                            </div>

                        </div>

                        <div className="field">
                            <label className="label has-text-primary">Product Image</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Enter an image for product" defaultValue={this.props.productInEditStage.image} onChange={this.onImageChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-primary">Product Description</label>
                            <div className="control">
                                <textarea className="textarea has-fixed-size has-text-justified" placeholder="Enter a product description..." defaultValue={this.props.productInEditStage.description} onChange={this.onDescriptionChange} />
                            </div>
                        </div>

                        <div className="field is-grouped has-addons has-addons-centered">
                            <div className="control">
                                <Link to={`/products/${this.props.match.params.id}`}>
                                    <button className="button is-danger">Cancel</button>
                                </Link>
                            </div>

                            <div className="control">
                                <button className="button is-primary" onClick={this.onApplyChangesClicked.bind(this)}>Apply changes</button>
                            </div>
                        </div>
                    </div>
                );
            } else if (this.props.submitChangesResponse === 204) {
                return (
                    <div className="container has-text-centered">
                        <h1 className="has-text-success has-text-weight-semi-bold is-size-3">Successfully updated product!</h1>
                        <Link to="/products">
                            <button className="button is-text has-text-success is-medium">
                                Back to products catalog
                            </button>
                        </Link>
                    </div>
                );
            } else if (this.props.submitChangesResponse === 404) {
                return (
                    <div className="container has-text-centered">
                        <h1 className="has-text-danger has-text-weight-semi-bold is-size-3">Ops, could not perform operation. Product not found!</h1>
                        <Link to="/products">
                            <button className="button is-text has-text-danger is-medium">
                                Back to products catalog
                            </button>
                        </Link>
                    </div>
                );
            } else if (this.props.submitChangesResponse === 999) {
                return (
                    <div className="container has-text-centered">
                        <h1 className="has-text-danger has-text-weight-semi-bold is-size-3">There has been a problem while communicating with the server, please check back later.</h1>
                        <Link to="/products">
                            <button className="button is-text has-text-danger is-medium">
                                Back to products catalog
                            </button>
                        </Link>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state: AppState, additionalState: AdditionalEditProductPageState) => ({
    match: additionalState.match,
    productInEditStage: state.editProductReducer.productInEditStage,
    isLoading: state.editProductReducer.isLoading,
    submitChangesResponse: state.editProductReducer.submitChangesResponse
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadProductData: (productID: number) => dispatch({ type: LOAD_PRODUCT_DETAILS_FOR_EDIT, payload: productID }),
    editProduct: (product: IProduct) => dispatch({type : EDIT_PRODUCT, payload : product}),
    initialProductDetailsLoad: () => dispatch(initialProductDetailsLoad())
});

const EditProductPageInitializer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProductPage);

export default EditProductPageInitializer;
