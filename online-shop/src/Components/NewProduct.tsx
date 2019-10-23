import React, { SyntheticEvent } from 'react';
import '../Styles/ComponentsStyles/ProductDetails.scss';
import { AppState } from '../ReduxStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct, ProductsImages, CustomProductImage } from '../Models/Models';
import { Dispatch } from 'redux';
import { createNewProduct } from '../ReduxStore/NewProductSection/actions';
import { addNewEntryToArray } from '../ReduxStore/AppComponentSection/actions';

interface NewProductProps {
    match: any;
    createProductServerResponse: number;
    createNewProduct: (serverResponse: number) => void;
    addNewEntryToArray: (newItem : CustomProductImage) => void;
}

interface AdditionalNewProductState {
    match: any;
}

class NewProduct extends React.Component<NewProductProps> {
    productId: number = 0;
    productTitle: string = "";
    productCategory: string = "Laptops";
    productPrice: number = 0;
    productImage: string = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png";
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
        if (this.areNewFormValuesOk()) {
            let serverResponse: number = 0;

            const newProduct: IProduct = {
                id: this.productId,
                name: this.productTitle,
                category: this.productCategory,
                price: this.productPrice,
                image: this.productImage,
                description: this.productDescription
            };

            const apiEndpoint = "http://localhost:4000/products";
            console.log(JSON.stringify(newProduct));

            fetch(apiEndpoint, {
                headers: {
                    'Content-Type': 'application/json; chartset=UTF-8',
                    'Accept': 'application/json'
                }, method: 'POST', body: JSON.stringify(newProduct)
            })
                .then(response => {
                    if(response.status === 200) {
                    serverResponse = response.status;
                    } else {
                        serverResponse = 204;
                    }
                })
                .catch(error => {
                    console.log(error);
                    serverResponse = 999;
                })
                .finally(() => {
                    this.props.createNewProduct(serverResponse);
                    this.props.addNewEntryToArray({productId : this.productId, imageUrl : this.productImage});
                });
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/products", { method: 'GET' })
            .then(response => response.json())
            .then(result => {
                this.productId = [...result].length + 1;
            })
            .catch(error => {
                console.log("Error found: " + error);
            })
            .finally(() => this.props.createNewProduct(0));
    }

    render() {
        if (this.props.createProductServerResponse === 0) {
            return (
                <div className='container box is-family-primary'>
                    <div className="field">
                        <label className="label has-text-primary">Product Title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Enter a title for product" onChange={this.onTitleChange} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label has-text-primary">Product Category</label>
                        <div className="control">
                            <div className="select">
                                <select onChange={this.onCategoryChange}>
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
                                <input className="input" type="text" placeholder="Enter product price" onChange={this.onPriceChange} />
                            </div>
                        </div>

                    </div>

                    <div className="field">
                        <label className="label has-text-primary">Product Image</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png" onChange={this.onImageChange} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label has-text-primary">Product Description</label>
                        <div className="control">
                            <textarea className="textarea has-fixed-size has-text-justified" placeholder="Enter a product description..." onChange={this.onDescriptionChange} />
                        </div>
                    </div>

                    <div className="field is-grouped has-addons has-addons-centered">
                        <div className="control">
                            <Link to="/products">
                                <button className="button is-danger">Cancel</button>
                            </Link>
                        </div>
                        <div className="control">
                            <button className="button is-primary" onClick={this.onApplyChangesClicked.bind(this)}>Create product</button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.createProductServerResponse === 200) {
            return (
                <div className="container has-text-centered">
                    <h1 className="has-text-success has-text-weight-semi-bold is-size-3">New product created successfully!</h1>
                    <Link to="/products">
                        <button className="button is-text has-text-success is-medium">
                            Back to products catalog
                        </button>
                    </Link>
                </div>
            );
        } else if (this.props.createProductServerResponse === 204) {
            return (
                <div className="container has-text-centered">
                    <h1 className="has-text-danger has-text-weight-semi-bold is-size-3">Could not perform operation. Check the product data and please try again.</h1>
                    <Link to="/products">
                        <button className="button is-text has-text-danger is-medium">
                            Back to products catalog
                        </button>
                    </Link>
                </div>
            );
        } else if (this.props.createProductServerResponse === 999) {
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

const mapStateToProps = (state: AppState, additionalState: AdditionalNewProductState) => ({
    match: additionalState.match,
    createProductServerResponse: state.newProdReducer.createProductServerResponse
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    createNewProduct: (serverResponse: number) => dispatch(createNewProduct(serverResponse)),
    addNewEntryToArray: (newItem : CustomProductImage) => dispatch(addNewEntryToArray(newItem))
});

const NewProductInitializer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProduct);

export default NewProductInitializer;
