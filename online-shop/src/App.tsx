import React from 'react';
import './Styles/Chapter3Style.css';
import ProductDetails from './Products/ProductDetails';
import ProductsListFromJSON from './products.json';
import ProductList from './Products/ProductList';
import './Styles/Chapter4Bulma/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


export interface IProduct {
  id: number,
  name: string,
  category: string,
  image: string,
  price: number,
  description: string
}

const App: React.FC = (props) => {
  const products: IProduct[] = Object.values(ProductsListFromJSON);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from='/' to='/products' />
          <Route path="/products" exact render = {() => <ProductList data={products}/>}/> {/* Folosim render in loc de component pentru props */}
          <Route path="/products/:id" exact component={ProductDetails}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
