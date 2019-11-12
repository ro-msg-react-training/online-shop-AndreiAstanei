import { NewProductProps } from "./NewProductSmartView";
import React from "react";
import { Link } from "react-router-dom";
import { ActionStatusReport } from "../../HelperComponents/ActionStatusReport";
import '../../Styles/ComponentsStyles/ProductDetailsStyles/ProductDetails.scss';

export const NewProductDumpView: React.FC<NewProductProps> = (props : NewProductProps) => {
    if (props.createProductServerResponse === 0) {
        return (
            <div className='container box is-family-primary'>
                <div className="field">
                    <label className="label has-text-primary">Product Title</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter a title for product" onChange={(e) => props.onTitleChange(props, e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label has-text-primary">Product Category</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={(e) => props.onCategoryChange(props, e.target.value)}>
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
                            <input className="input" type="text" placeholder="Enter product price" onChange={(e) => props.onPriceChange(props, e.target.value)} />
                        </div>
                    </div>

                </div>

                <div className="field">
                    <label className="label has-text-primary">Product Image</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png" onChange={(e) => props.onImageChange(props, e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label has-text-primary">Product Description</label>
                    <div className="control">
                        <textarea className="textarea has-fixed-size has-text-justified" placeholder="Enter a product description..." onChange={(e) => props.onDescriptionChange(props, e.target.value)} />
                    </div>
                </div>

                <div className="field is-grouped has-addons has-addons-centered">
                    <div className="control">
                        <Link to="/products">
                            <button className="button is-danger">Cancel</button>
                        </Link>
                    </div>
                    <div className="control">
                        <button className="button is-primary" onClick={() => props.onApplyChangesClicked(props)}>Create product</button>
                    </div>
                </div>
            </div>
        );
    } else if (props.createProductServerResponse === 200) {
        return (
            <ActionStatusReport wasSuccessful = {true} message = {"New product successfully created!"}/>
        );
    } else if (props.createProductServerResponse === 204) {
        return (
            <ActionStatusReport wasSuccessful = {false} message = {"Could not perform operation. Check the product data and please try again."}/>
        );
    } else if (props.createProductServerResponse === 999) {
        return (
            <ActionStatusReport wasSuccessful = {false} message = {"There has been a problem while communicating with the server, please check back later."}/>
        );
    } else {
        return (
            <ActionStatusReport wasSuccessful = {false} message = {"Oops, page not found! (404 to the rescue)"}/>
        );
    }
}