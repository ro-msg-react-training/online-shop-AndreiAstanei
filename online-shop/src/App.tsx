import React from 'react';
import './Styles/Chapter3Style.css';
import ProductDetails from './Products/ProductDetails';
import ProductsListFromJSON from './products.json';
import ProductList from './Products/ProductList';
import './Styles/Chapter4Bulma/App.sass';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export interface IProduct {
  id: number,
  name: string,
  category: string,
  image: string,
  price: number,
  description: string
}

const App: React.FC = () => {
  const products: IProduct[] = Object.values(ProductsListFromJSON);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render = {() => <ProductList data={products}/>}/> {/* Folosim render in loc de component pentru props */}
          <Route path="/ProductDetails" component={ProductDetails}/>
        </Switch>

        {/* <ProductDetails data={products[0]}/>
      <ProductList data={products}/> */}
      </div>
    </Router>
  );
}

export default App;
