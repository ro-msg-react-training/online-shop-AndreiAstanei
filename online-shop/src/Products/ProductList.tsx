import React from 'react';
import { IProduct } from '../Models/Models';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';
import { ProductsImages } from '../Models/Models';

interface IProps {
  match: any;
  resetShoppingCartState: any;
}

interface IState {
  data: IProduct[];
  isLoading: boolean;
  error: string;
}

const ProductsApiEndpointUrl = "http://localhost:4000/products";

export default class ProductList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      error: "No errors found"
    };
  }

  componentDidMount() {
    fetch(ProductsApiEndpointUrl, { method: 'GET' })
      .then(response => response.json())
      .then(result => this.setState({ data: result, isLoading: false }))
      .then(this.props.resetShoppingCartState())
      .catch(error => this.setState({ error: error, isLoading: false }));
  }

  render() {
    const { data, isLoading, error } = this.state;  //Preluam datele din state intr-un obiect anonim

    if (isLoading && error === 'No errors found') {
      return <p>Loading ....</p>
    } else if (error !== 'No errors found') {
      console.log(`ProductList - Error message: ${error}`);
    }

    let productsColumn = data.map(
      (product: IProduct) =>
        <Link key={'ProductLinkKey' + product.id} to={`${this.props.match.url}/${product.id}`}>
          <div id={'Product' + product.id} className='column box has-text-centered ProductsListElements'>
            <img src={ProductsImages[product.id].imageUrl} className="ProductsListImages" alt={product.category + " " + product.id} />
            <p className="is-size-5 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
            <p className="is-size-5 has-text-price-color has-text-weight-semibold">{product.price} lei</p>
            <p className="is-size-7 has-text-grey">In {product.category}</p>
          </div>
        </Link>
    );

    return (
      <div className="container is-fluid">
        
        <div className='columns is-multiline is-mobile is-centered'>
          {productsColumn}
        </div>
      </div>
    );
  }
}