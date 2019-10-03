import React from 'react';
import { IProduct } from '../App';

interface IProps {
    data: IProduct;
}

export default class ProductDetails extends React.Component<IProps> {
    render() {
      return (
        <div className="ProductDetailsStyle">
          <h2>Product: {this.props.data.name}</h2>
          <p>Name {this.props.data.name}</p>
          <p>Category {this.props.data.category}</p>
          <img src={this.props.data.image} />
          <p>Price {this.props.data.price}</p>
          <p>Description {this.props.data.description}</p>
          <hr/>
        </div>
      );
    }
  }