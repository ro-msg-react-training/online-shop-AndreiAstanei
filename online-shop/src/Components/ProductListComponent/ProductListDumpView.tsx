import { ProductListProps } from "./ProductListSmartView";
import React from "react";
import { IProduct, ProductsImages } from "../../Models/Models";
import { Link } from "react-router-dom";
import '../../Styles/ComponentsStyles/ProductListStyles/ProductList.scss';
import { ErrorComponent } from "../../HelperComponents/ErrorComponent";

export const ProductListDumpView: React.FC<ProductListProps> = (props: ProductListProps) => {
     if (props.error !== 'No errors found') {
        return (
            <ErrorComponent />
        );
    } else {
        let productsColumn = props.productList.map(
            (product: IProduct) =>
                <Link key={'ProductLinkKey' + product.id} to={"/products/" + product.id}>
                    <div id={'Product' + product.id} className='column box has-text-centered ProductsListElements'>
                        <img src={ProductsImages[product.id] ? ProductsImages[product.id].imageUrl : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png"} className="ProductsListImages" alt={product.category + " " + product.id} />
                        <p className="is-size-5 has-text-grey-dark has-text-weight-semibold appliedEllipsisEffect">{product.name}</p>
                        <p className="is-size-5 has-text-price-color has-text-weight-semibold appliedEllipsisEffect">{product.price} lei</p>
                        <p className="is-size-7 has-text-grey appliedEllipsisEffect">In {product.category}</p>
                    </div>
                </Link>
        );

        return (
            <div className="container is-fluid is-clearfix">
                <div className='columns is-multiline is-mobile is-centered'>
                    {productsColumn}
                </div>
                <Link to="/newProduct">
                    <button className="button is-primary is-rounded is-large has-text-centered is-uppedcase has-text-weight-bold" id="addButton">+</button>
                </Link>
            </div>
        );
    }
}