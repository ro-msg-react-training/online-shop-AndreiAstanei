import React from 'react';
import { IProduct } from '../App';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductDetails from './ProductDetails';

interface IProps {
  data: IProduct[];
}

export default class ProductList extends React.Component<IProps> {
  render() {
    let products = this.props.data.map(
      (product) =>
        <Link to={`/ProductDetails/${product.id}`}>
          <tr className="TableRow">
            <td><img src={product.image} className="ProductsListImages" alt={product.category + " " + product.id} /></td>
            <td>
              <p className="ProdauctName">{product.name}</p>
              <p className="ProductPrice">{product.price} lei</p>
              <p className="ProductCategory">{product.category}</p>
            </td>
            <td className="ToProductDetails">></td>
          </tr>
        </Link>
    );

    return (
      <table>
        {products}
      </table>
    );
  }
}