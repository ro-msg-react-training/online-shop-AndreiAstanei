import React, { SyntheticEvent } from 'react';
import '../Styles/ComponentsStyles/ProductDetails.scss';
import { AppState } from '../ReduxStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct } from '../Models/Models';
import { loadProductData, editProduct, initialProductDetailsLoad } from '../ReduxStore/EditProductPageSection/actions';
import { Dispatch } from 'redux';

interface EditProductPageProps {
    productInEditStage: IProduct;
    isLoading: boolean;
    submitChangesResponse: number;
    loadProductData: (product: IProduct) => void;
    editProduct: (product: IProduct, serverResponse: number) => void;
    match: any;
    initialProductDetailsLoad: () => void;
}

interface AdditionalEditProductPageState {
    match: any;
}

class EditProductPage extends React.Component<EditProductPageProps> {
    productTitle: string = "";
    productCategory: string = "";
    productPrice: number = 0;
    productImage: string = "";
    productDescription: string = "";

    onTitleChange = (e: SyntheticEvent) => {
        this.productTitle = (e.target as HTMLInputElement).value.trim();
    }

    onCategoryChange = (e: SyntheticEvent) => {
        this.productCategory = (e.target as HTMLInputElement).value.trim();
    }

    onPriceChange = (e: SyntheticEvent) => {
        this.productPrice = +(e.target as HTMLInputElement).value.trim();  //string -> number conversion : +string = number
    }

    onImageChange = (e: SyntheticEvent) => {
        this.productImage = (e.target as HTMLInputElement).value.trim();
    }

    onDescriptionChange = (e: SyntheticEvent) => {
        this.productDescription = (e.target as HTMLInputElement).value.trim();
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
        if (this.areStringsEqual(this.productTitle, this.props.productInEditStage.name) &&
            this.areStringsEqual(this.productCategory, this.props.productInEditStage.category) &&
            (this.productPrice === this.props.productInEditStage.price) &&
            this.areStringsEqual(this.productImage, this.props.productInEditStage.image) &&
            this.areStringsEqual(this.productDescription, this.props.productInEditStage.description)) {

            return false;
        } else {
            return true;
        }
    }

    areNewFormValuesOk = (): boolean => {
        if (this.productTitle.length !== 0) {
            if (this.productImage.length !== 0) {
                if (this.productDescription.length !== 0) {
                    if (Number(this.productPrice)) {
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

    onApplyChangesClicked = () => {
        if (this.didFormInputValuesChanged()) {
            if (this.areNewFormValuesOk()) {
                let serverResponse: number = 0;

                const updatedProduct: IProduct = {
                    id: this.props.productInEditStage.id,
                    name: this.productTitle,
                    category: this.productCategory,
                    price: this.productPrice,
                    image: this.productImage,
                    description: this.productDescription
                };

                const apiEndpoint = "http://localhost:4000/products/" + this.props.productInEditStage.id;


                fetch(apiEndpoint, {
                    headers: {
                        'Content-Type': 'application/json; chartset=UTF-8',
                        'Accept': 'application/json'
                    }, method: 'PUT', body: JSON.stringify(updatedProduct)
                })
                    .then(response => {
                        serverResponse = response.status;
                    })
                    .then(result => console.log(result))
                    .catch(error => {
                        console.log(error);
                        serverResponse = 999;
                    })
                    .finally(() => {
                        this.props.editProduct(updatedProduct, serverResponse);
                    });
            }
        } else {
            alert("New values are needed for input fields to apply the changes.");
        }
    }

    componentDidMount() {
        this.props.initialProductDetailsLoad();

        const ProductDetailsApiEndpoint = "http://localhost:4000/products/" + this.props.match.params.id;

        let receivedProductData: IProduct = {} as any;

        fetch(ProductDetailsApiEndpoint)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Could not load product details.');
                }
            })
            .then(productData => {
                receivedProductData = productData;
            })
            .catch(error => {
                console.log("This is the error: " + error);
            })
            .finally(() => {
                this.productTitle = receivedProductData.name;
                this.productCategory = receivedProductData.category;
                this.productPrice = receivedProductData.price;
                this.productImage = receivedProductData.image;
                this.productDescription = receivedProductData.description;
                this.props.loadProductData(receivedProductData);
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
    loadProductData: (product: IProduct) => dispatch(loadProductData(product)),
    editProduct: (product: IProduct, serverResponse: number) => dispatch(editProduct(product, serverResponse)),
    initialProductDetailsLoad: () => dispatch(initialProductDetailsLoad())
});

const EditProductPageInitializer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProductPage);

export default EditProductPageInitializer;
