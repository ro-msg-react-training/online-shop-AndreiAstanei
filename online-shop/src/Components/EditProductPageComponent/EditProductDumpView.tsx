import React from 'react';
import '../../Styles/ComponentsStyles/ProductDetailsStyles/ProductDetails.scss';
import { Link } from 'react-router-dom';
import { EditProductPageProps } from './EditProductSmartView';
import { ActionStatusReport } from '../../HelperComponents/ActionStatusReport';

export const EditProductDumpView: React.FC<EditProductPageProps> = (props: EditProductPageProps) => {
    if (!props.isLoading) {
        if (props.submitChangesResponse === 0) {
            return (
                <div className='container box is-family-primary'>
                    <div className="field">
                        <label className="label has-text-primary">Product Title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Enter a title for product" defaultValue={props.productInEditStage.name} onChange={(e) => props.onTitleChange(props, e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label has-text-primary">Product Category</label>
                        <div className="control">
                            <div className="select">
                                <select defaultValue={props.productInEditStage.category} onChange={(e) => props.onCategoryChange(props, e.target.value)}>
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
                                <input className="input" type="text" placeholder="Enter product price" defaultValue={props.productInEditStage.price.toString()} onChange={(e) => props.onPriceChange(props, e.target.value)} />
                            </div>
                        </div>

                    </div>

                    <div className="field">
                        <label className="label has-text-primary">Product Image</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Enter an image for product" defaultValue={props.productInEditStage.image} onChange={(e) => props.onImageChange(props, e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label has-text-primary">Product Description</label>
                        <div className="control">
                            <textarea className="textarea has-fixed-size has-text-justified" placeholder="Enter a product description..." defaultValue={props.productInEditStage.description} onChange={(e) => props.onDescriptionChange(props, e.target.value)} />
                        </div>
                    </div>

                    <div className="field is-grouped has-addons has-addons-centered">
                        <div className="control">
                            <Link to={`/products/${props.match.params.id}`}>
                                <button className="button is-danger">Cancel</button>
                            </Link>
                        </div>

                        <div className="control">
                            <button className="button is-primary" onClick={() => props.onApplyChangesClicked(props)}>Apply changes</button>
                        </div>
                    </div>
                </div>
            );
        } else if (props.submitChangesResponse === 204) {
            return (
                <ActionStatusReport wasSuccessful = {true} message = {"Successfully updated product!"}/>
            );
        } else if (props.submitChangesResponse === 404) {
            return (
                <ActionStatusReport wasSuccessful = {false} message = {"Ops, could not perform operation. Product not found!"}/>
            );
        } else {
            return (
                <ActionStatusReport wasSuccessful = {false} message = {"There has been a problem while communicating with the server, please check back later."}/>
            );
        } 
    } else {
        return (
            <ActionStatusReport wasSuccessful = {false} message = {"Oops, page not found! (404 to the rescue)"}/>
        );
    }
}