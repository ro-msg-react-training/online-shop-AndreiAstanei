import React from 'react';
import './App.scss';
import './Styles/Chapter3Style.css';
import ProductDetails from './Products/ProductDetails';
import ProductsListFromJSON from './products.json';
import ProductList from './Products/ProductList';
//import './Styles/Chapter4Bulma/mystyles.scss';
import './Styles/Chapter4Bulma/App.sass';

export interface IProduct {
  id: number,
  name: string,
  category: string,
  image: string,
  price: number,
  description: string
}

const App: React.FC = () => {
  const products : IProduct[] = Object.values(ProductsListFromJSON);
  
  return (
    <div className="App">
      <a className="button is-primary" href="https://bulma.io/">Bulma</a>
      <ProductDetails data={products[0]}/>
      <ProductList data={products}/>
    </div>
  );
}

export default App;
