import React from 'react';
import { IProduct } from '../App';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyles/ProductList.scss';

interface CustomProductImage {
  productId: number;
  imageUrl: string;
}

export const ProductsImages: CustomProductImage[] = [
  { productId: 0, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg" },
  { productId: 1, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg" },
  { productId: 2, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg" },
  { productId: 3, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1003.jpg" },
  { productId: 4, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1007.jpg" },
  { productId: 5, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1010.jpg" },
  { productId: 6, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1011.jpg" },
  { productId: 7, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1020.jpg" },
  { productId: 8, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1021.jpg" },
  { productId: 9, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1022.jpg" },
  { productId: 10, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1023.jpg" },
  { productId: 11, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1030.jpg" },
  { productId: 12, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1031.jpg" },
  { productId: 13, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1032.jpg" },
  { productId: 14, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1035.jpg" },
  { productId: 15, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1036.jpg" },
  { productId: 16, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1037.jpg" },
  { productId: 17, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1040.jpg" },
  { productId: 18, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1041.jpg" },
  { productId: 19, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1042.jpg" },
  { productId: 20, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1050.jpg" },
  { productId: 21, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1051.jpg" },
  { productId: 22, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1052.jpg" },
  { productId: 23, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1055.jpg" },
  { productId: 24, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1056.jpg" },
  { productId: 25, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1060.jpg" },
  { productId: 26, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1061.jpg" },
  { productId: 27, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1062.jpg" },
  { productId: 28, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1063.jpg" },
  { productId: 29, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1064.jpg" },
  { productId: 30, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1065.jpg" },
  { productId: 31, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1066.jpg" },
  { productId: 32, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1067.jpg" },
  { productId: 33, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1068.jpg" },
  { productId: 34, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1069.jpg" },
  { productId: 35, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1070.jpg" },
  { productId: 36, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1071.jpg" },
  { productId: 37, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1072.jpg" },
  { productId: 38, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1073.jpg" },
  { productId: 39, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1080.jpg" },
  { productId: 40, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1081.jpg" },
  { productId: 41, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1082.jpg" },
  { productId: 42, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1083.jpg" },
  { productId: 43, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1085.jpg" },
  { productId: 44, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1090.jpg" },
  { productId: 45, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1091.jpg" },
  { productId: 46, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1092.jpg" },
  { productId: 47, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1100.jpg" },
  { productId: 48, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1101.jpg" },
  { productId: 49, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1102.jpg" },
  { productId: 50, imageUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1103.jpg" }
];

interface IProps {
  match: any;
}

interface IState {
  data: IProduct[];
  isLoading: boolean;
  error: string;
}

const ProductsApiEndpointUrl = "http://localhost:4000/products";

export default class ProductList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      error: "No errors found"
    };
  }

  componentDidMount() {
    fetch(ProductsApiEndpointUrl, { method: 'GET' })
      .then(response => response.json())
      .then(result => this.setState({ data: result, isLoading: false }))
      .catch(error => this.setState({ error: error, isLoading: false }));

  }

  render() {
    const { data, isLoading, error } = this.state;  //Preluam datele din state intr-un obiect anonim

    if (isLoading && error === 'No errors found') {
      return <p>Loading ....</p>
    } else if (error !== 'No errors found') {
      console.log(`ProductList - Error message: ${error}`);
    }

    let productsColumn = data.map(
      (product: IProduct) =>
        <Link key={'ProductLinkKey' + product.id} to={`${this.props.match.url}/${product.id}`}>
          <div id={'Product' + product.id} className='column box has-text-centered ProductsListElements'>
            <img src={ProductsImages[product.id].imageUrl} className="ProductsListImages" alt={product.category + " " + product.id} />
            <p className="is-size-5 has-text-grey-dark has-text-weight-semibold">{product.name}</p>
            <p className="is-size-5 has-text-price-color has-text-weight-semibold">{product.price} lei</p>
            <p className="is-size-7 has-text-grey">In {product.category}</p>
          </div>
        </Link>
    );

    return (
      <div className="container is-fluid">
        
        <div className='columns is-multiline is-mobile is-centered'>
          {productsColumn}
        </div>
      </div>
    );
  }
}