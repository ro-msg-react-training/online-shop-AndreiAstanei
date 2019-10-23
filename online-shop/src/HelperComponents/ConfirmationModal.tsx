import React from 'react';
import '../Styles/ComponentsStyles/ConfirmationModal.scss';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../ReduxStore';
import { deleteProductFromStore, activateModalRedirectToProducts } from '../ReduxStore/ProductDetailsSection/actions';
import { decreaseProductQuantity } from '../ReduxStore/ShoppingCartSection/actions';


interface ConfirmationModalProps {
    shouldRedirect: boolean;
    match?: any;
    ProductId: number;
    show: boolean;
    showModalFunction: any;
    completelyRemoveProductFromStore: (productID : number) => void;
    removeFromShoppingCart : (productID : number) => void;
    activateModalRedirectToProducts: () => void;
  }
  
  interface AdditionalConfirmationModalState {
    match?: any;
    ProductId: number;
    show: boolean;
    showModalFunction: any;
  }

class ConfirmationModal extends React.Component<ConfirmationModalProps> {
    abortController = new AbortController();

    handleDeleteProductClick = () => {
        const deleteProductApiEndpoint = `http://localhost:4000/products/${this.props.ProductId}`;

        fetch(deleteProductApiEndpoint, { method: 'DELETE', signal: this.abortController.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Encountered a problem when deleting the product.');
                }
            })
            .then(() => {
                this.props.showModalFunction();
            })
            .catch(error => {
                this.setState(error)
            })
            .then(() => {
                //asta era dupa primul then, si aveam eroarea aia
               this.props.activateModalRedirectToProducts();
               this.props.completelyRemoveProductFromStore(this.props.ProductId);
               this.props.removeFromShoppingCart(this.props.ProductId);
            });
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        if (this.props.shouldRedirect) {
            return <Redirect to="/products" />
        }

        return (
            <div className={`modal ${this.props.show ? "is-active" : ""}`} >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Product deletion confirmation</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="content is-size-5 has-text-weight-semi-bold">
                            <div>You are about to delete a product from the catalog.</div><div className="has-text-danger">Do you want to proceed with this action?</div>
                        </div>
                    </section>
                    <footer id="ConfirmationModalButtonSecion" className="modal-card-foot">
                        <button className="button is-dark is-outlined" onClick={this.props.showModalFunction}>No, abort action</button>
                        <button className="button is-primary is-outlined" onClick={this.handleDeleteProductClick}>Yes, delete product</button>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state : AppState, additionalState : AdditionalConfirmationModalState) => ({
    shouldRedirect: state.prodDetailsReducer.shouldRedirectFromModalDelete,
    match: additionalState.match,
    ProductId: additionalState.ProductId,
    show: additionalState.show,
    showModalFunction: additionalState.showModalFunction
  });
  
  const mapDispatchToProps = (dispatch : Dispatch) => ({
    completelyRemoveProductFromStore : (productID : number) => dispatch(deleteProductFromStore(productID)),
    activateModalRedirectToProducts: () => dispatch(activateModalRedirectToProducts()),
    removeFromShoppingCart : (productID : number) => dispatch(decreaseProductQuantity(productID, 2))
  });
  
  const ProductDetailsInitializer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmationModal);
  
  export default ProductDetailsInitializer;