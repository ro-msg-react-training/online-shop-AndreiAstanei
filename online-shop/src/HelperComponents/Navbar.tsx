import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles//NavbarStyles/Navbar.scss';

interface IProps {  }
interface IState {  }

export default class Navbar extends React.Component<IProps, IState> {
    render() {
        return (
            <nav className="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/">
                        <div className="navbar-item">
                            <img src="https://www.msg-systems.ro/images/msg_og_logo.png" alt="" width="112" height="30" />
                        </div>
                    </Link>

                    <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                            <Link to="/products">
                                    <button className="button is-primary navBarProductsButton">
                                        <span className="icon">
                                            <i className="fas fa-store-alt" />
                                        </span>
                                        <span>Products</span>
                                    </button>
                                </Link>
                                <Link to="/shoppingCart">
                                    <button className="button is-primary navBarProductsButton">
                                        <span className="icon">
                                            <i className="fas fa-shopping-cart" />
                                        </span>
                                        <span>Shopping cart</span>
                                    </button>
                                </Link>
                                <Link to="/sales">
                                    <button className="button is-primary">
                                        <span className="icon">
                                            <i className="fas fa-shopping-cart" />
                                        </span>
                                        <span>Sales</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

