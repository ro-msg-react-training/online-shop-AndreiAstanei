import React from 'react';
import { IProduct } from '../Models/Models';
import '../Styles/ComponentsStyles/ProductDetails.scss';
import ConfirmationModal from '../HelperComponents/ConfirmationModal';
import { Redirect } from 'react-router-dom';

interface IProps {
  match?: any;
  addProductToShoppingCartFunction : any;
}

interface IState {
  toBeReceivedData: IProduct;
  isLoading: boolean;
  error?: Error;
  isDeleteModalOpen: boolean;
  shouldRedirectToShoppingCart: boolean;
}

export default class ProductDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      toBeReceivedData: {
        id: 0,
        name: "Unknown",
        category: "Not Specified",
        image: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png",
        price: 0,
        description: "No description",
      },
      isLoading: false,
      isDeleteModalOpen: false,
      shouldRedirectToShoppingCart: false
    };
  }

  handleAddToShoppingCartClick = () => {
    this.props.addProductToShoppingCartFunction(this.state.toBeReceivedData);

    this.setState({
      shouldRedirectToShoppingCart: true
    });
  }

  handleModalShow = () => {
    //Changing the vizibility of the delete dialog --- showing, thanks Serban :)
    this.setState({
      isDeleteModalOpen: !this.state.isDeleteModalOpen
    });
  }

  handleDeleteProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.handleModalShow();
  }

  componentDidMount() {
    const ProductDetailsApiEndpoint = `http://localhost:4000/products/${this.props.match.params.id}`;

    fetch(ProductDetailsApiEndpoint, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not load product details.');
        }
      })
      .then(productData => this.setState({
        toBeReceivedData: productData,
        isLoading: false
      }))
      .catch(error => {
        console.log("This is the error: " + error)

        this.setState({
          error, isLoading: false
        });
      });
  }

  render() {
    const { toBeReceivedData, isLoading, error, isDeleteModalOpen } = this.state;

    if (error) {
      return <div>Encountered the following error: {error.message}</div>
    } else if (isLoading) {
      return (
        <div className="container is-vcentered">Loading product details...</div>
      );
    } else if(this.state.shouldRedirectToShoppingCart) {
      return <Redirect to="/shoppingCart"/>
    }

    return (
      <div id="MainProductDetailsConstainer" className='container box has-text-centered is-family-primary'>
        <div className='columns'>
          <div className='column'>
            <img className='imageForProductDetails' src={toBeReceivedData.image} alt="" />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <h1 className="title is-4">{toBeReceivedData.name}</h1>
          </div>
        </div>

        <div className='columns is-centered'>
          <div className="column tags  has-addons">
            <span className="tag is-rounded is-medium has-text-weight-semibold">Category</span>
            <span className='tag is-dark is-rounded is-medium has-text-weight-semibold'>
              {toBeReceivedData.category}
            </span>
          </div>

          <div className="column tags has-addons">
            <span className="tag is-rounded is-medium has-text-weight-semibold">Price</span>
            <span className='tag is-price-color is-rounded is-medium has-text-weight-semibold'>
              {toBeReceivedData.price} lei
            </span>
          </div>
        </div>

        <hr />

        <div className='columns'>
          <div className='column'>
            <textarea className='textarea has-fixed-size has-text-justified has-text-grey' readOnly rows={4} value={toBeReceivedData.description} />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-primary is-medium" onClick={this.handleAddToShoppingCartClick}>
              <span className="icon">
                <i className="fas fa-cart-plus" />
              </span>
              <span>Add to shopping cart</span>
            </button>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-danger is-outlined is-medium" onClick={this.handleDeleteProductClick}>
              <span>Remove product</span>
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>
          </div>
        </div>
        <ConfirmationModal ProductId={toBeReceivedData.id} show={isDeleteModalOpen} showModalFunction={this.handleModalShow.bind(this)} />
      </div>
    );
  }
}

