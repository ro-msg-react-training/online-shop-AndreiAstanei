import React from 'react';
import './App.css';
import './Styles/Chapter3Style.css';
import ProductDetails from './Products/ProductDetails';
import ProductsListFromJSON from './products.json';
import ProductList from './Products/ProductList';

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
      <ProductDetails data={products[0]}/>
      <ProductList data={products}/>
    </div>
  );
}

export default App;
