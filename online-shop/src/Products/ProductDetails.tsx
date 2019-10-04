import React from 'react';
import { IProduct } from '../App';
import { Link, useRouteMatch } from 'react-router-dom';
import { render } from 'react-dom';

let noImageFound: string = "http://noodleblvd.com/wp-content/uploads/2016/10/No-Image-Available.jpg";

interface IProps {
  data: IProduct;
}

export default class ProductDetails extends React.Component<IProps> {

  render() {
    return (
      <div className="ProductDetailsStyle">
        <h2 className="title">Product: </h2>
        <p>Name </p>
        <p>Category</p>
        <img src={noImageFound} alt="" />
        <p>Price </p>
        <p>Description </p>
        <hr />
      </div>
    );
  }
}