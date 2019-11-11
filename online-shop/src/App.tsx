import React from 'react';
import './Styles/ComponentsStyles/AppStyles/App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './HelperComponents/Navbar';
import './App.scss';
import SalesViewInitializer from './Components/SalesComponent/SalesSmartView';
import ProductListViewInitializer from './Components/ProductListComponent/ProductListSmartView';
import ProductDetailsViewInitializer from './Components/ProductDetailsComponent/ProductDetailsSmartView';
import ShoppingCartViewInitializer from './Components/ShoppingCartComponent/ShoppingCartSmartView';
import EditProductPageViewInitializer from './Components/EditProductPageComponent/EditProductSmartView';
import NewProductViewInitializer from './Components/NewProductComponent/NewProductSmartView';
import { AppState } from './ReduxStore';
import { connect } from 'react-redux';
import { LoginComponentDumpView } from './Components/LoginComponent/LoginComponentDumpView';
import LoginComponentViewInitializer from './Components/LoginComponent/LoginComponentSmartView';

interface AppComponentState {
  isLoggedIn: boolean;
}

class App extends React.Component<AppComponentState> {
  checkIsLoggedIn(): boolean {
    //username doej, password: password
    console.log("Is someone logged in? " + this.props.isLoggedIn);
    return this.props.isLoggedIn;
  }

  render() {
    return (
      <Router key="General Router">
        <div className="App">
          <Navbar isHidden={this.props.isLoggedIn} />
          <Switch>
            <Redirect exact from='/' to='/products' />
            <Route path="/products" exact component={this.checkIsLoggedIn() ? ProductListViewInitializer : LoginComponentViewInitializer} />
            <Route path="/products/:id" exact render={(props) => this.checkIsLoggedIn() ? <ProductDetailsViewInitializer {...props}/> : LoginComponentViewInitializer} />
            <Route path="/shoppingCart" exact component={this.checkIsLoggedIn() ? ShoppingCartViewInitializer : LoginComponentViewInitializer} />
            <Route path="/editProduct/:id" exact render={(props) => this.checkIsLoggedIn() ? <EditProductPageViewInitializer {...props} /> : LoginComponentViewInitializer} />
            <Route path="/newProduct" exact render={(props) => this.checkIsLoggedIn() ? <NewProductViewInitializer {...props}/> : LoginComponentViewInitializer} />
            <Route path="/sales" exact render={(props) => this.checkIsLoggedIn() ? <SalesViewInitializer match={props.match}/> : LoginComponentViewInitializer} />
            {/* Se poate sa fie ceva eroare aici! Nu functioneaza bine loginul(problema aparuta de la redirectionarea spre login din wrong credentials) */}
            <Route path="/login" exact component={LoginComponentViewInitializer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.loginReducer.isLoggedIn
});

const AppInitializer = connect(
  mapStateToProps
)(App);

export default AppInitializer;