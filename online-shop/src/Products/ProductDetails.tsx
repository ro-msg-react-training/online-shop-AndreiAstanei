import React from 'react';
import { IProduct } from '../App';
import '../Styles/ComponentsStyles/ProductDetails.scss';

let noImageFound: string = "http://noodleblvd.com/wp-content/uploads/2016/10/No-Image-Available.jpg";

interface IProps {
  data: IProduct;
  match: any;
}

export default class ProductDetails extends React.Component<IProps> {
  render() {
    let productDetails = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec porttitor justo, et vehicula nunc. Integer purus diam, eleifend a augue at, ullamcorper malesuada odio. Mauris libero orci, bibendum non tellus id, suscipit viverra tellus. Vestibulum eu convallis lectus, eget dictum nisl. Duis sed bibendum ex. Nullam ac velit quis mi imperdiet fermentum ut eget neque. Phasellus hendrerit sollicitudin velit et ultrices. Vivamus venenatis pharetra risus, et faucibus mauris ultricies non. Praesent dictum arcu ac elementum iaculis. Pellentesque luctus rhoncus leo non semper. Sed arcu metus, euismod et imperdiet eu, cursus eget urna. Donec sed efficitur lorem. Fusce id massa ligula." +
    "Proin venenatis ut turpis sed commodo. Praesent suscipit malesuada consectetur. Nullam in molestie risus, sit amet finibus orci. Vestibulum ornare lacus a iaculis suscipit. Sed finibus eros sit amet risus placerat hendrerit. Curabitur ac auctor quam, non dignissim justo. Ut hendrerit diam nec erat sollicitudin lobortis. Curabitur et congue libero, a congue quam. Quisque semper sem ac ante rutrum, vitae vestibulum velit tincidunt. Pellentesque maximus urna enim, nec interdum arcu sollicitudin id. Pellentesque quis nibh vitae felis vehicula dapibus. Aenean venenatis id ipsum non commodo. Curabitur ut dignissim orci, a facilisis felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus";

    return (
      <div id="MainProductDetailsContainer" className='container box has-text-centered is-family-primary'>
        <div className='columns'>
          <div className='column'>
            <img className='imageForProductDetails' src={noImageFound} alt="" />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <h1 className="title is-4">Product ID is: {this.props.match.params.id}</h1>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
          <span className='tag is-dark is-rounded is-medium has-text-weight-semibold'>
              Laptops
            </span>
          </div>

          <div className='column'>
            <span className='tag is-price-color is-rounded is-medium has-text-weight-semibold'>
              1500 lei
            </span>
          </div>
        </div>

        <hr/>

        <div className='columns'>
          <div className='column'>
            <textarea className='textarea has-fixed-size has-text-justified has-text-grey' readOnly rows={6} value={productDetails}/>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <button className="button is-rounded is-primary is-medium">
              <span className="icon">
                <i className="fas fa-cart-plus" />
              </span>
              <span>Add to shopping cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}