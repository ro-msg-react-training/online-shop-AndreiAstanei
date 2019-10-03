import React from 'react';
import { IProduct } from '../App';

interface IProps {
    data: IProduct[];
}

export default class ProductList extends React.Component<IProps> {
    render() {
      let products = this.props.data.map(
      (product) => 
      <tr className="TableRow">
        <td><img src={product.image} className="ProductsListImages"/></td>
        <td>
          <p className="ProductName">{product.name}</p>
          <p className="ProductPrice">{product.price} lei</p>
          <p className="ProductCategory">{product.category}</p>
        </td>
        <td className="ToProductDetails">></td>
      </tr>
    );
  
    return (
        <table>
           {products}
        </table>
    );
  }
}