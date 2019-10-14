import React from 'react';
import '../Styles/ComponentsStyles/ConfirmationModal.scss';
import { Redirect } from 'react-router';

interface IProps {
    match?: any;
    ProductId: number;
    show: boolean;
    showModalFunction: any;
    completelyRemoveProductFromStore : any;
}

interface IState {
    shouldRedirect: boolean;
}

export default class ConfirmationModal extends React.Component<IProps, IState> {
    abortController = new AbortController();

    constructor(props: IProps) {
        super(props);

        this.state = {
            shouldRedirect: false
        }
    }

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
                this.setState({
                    shouldRedirect: true
                });
            })
            .then(
                this.props.completelyRemoveProductFromStore(this.props.ProductId)
            );
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        if (this.state.shouldRedirect) {
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