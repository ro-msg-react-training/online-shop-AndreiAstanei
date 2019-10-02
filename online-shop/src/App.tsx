import React from 'react';
import logo from './logo.svg';
import './App.css';

let mockupProduct = {
  id: 0,
  name: "Notebook Basic 15",
  category: "Laptops",
  image: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
  price: 965,
  description: "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
}

let productsArray = [
  {
    "id": 0,
    "name": "Notebook Basic 15",
    "category": "Laptops",
    "image": "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
    "price": 956,
    "description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
  }, {
    "id": 1,
    "name": "Notebook Basic 17",
    "category": "Laptops",
    "image": "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
    "price": 1249,
    "description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
  }, {
    "id": 2,
    "name": "Notebook Basic 18",
    "category": "Laptops",
    "image": "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg",
    "price": 1570,
    "description": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro"
  }, {
    "id": 3,
    "name": "Notebook Basic 19",
    "category": "Laptops",
    "image": "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1003.jpg",
    "price": 1650,
    "description": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro"
  }, {
    "id": 4,
    "name": "ITelO Vault",
    "category": "Accessories",
    "image": "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1007.jpg",
    "price": 299,
    "description": "Digital Organizer with State-of-the-Art Storage Encryption"
  }
]

class ProductDetails extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <div className="ProductDetailsStyle">
        <h2>Product: {mockupProduct.name}</h2>
        <p>Name {mockupProduct.name}</p>
        <p>Category {mockupProduct.category}</p>
        <img src={mockupProduct.image} alt="Product image" />
        <p>Price {mockupProduct.price}</p>
        <p>Description {mockupProduct.description}</p>
        <hr/>
      </div>
    );
  }
}

class ProductList extends React.Component {
  render() {
    let products = productsArray.map(
      (product) => 
      <tr className="TableRow">
        <td><img src={product.image} className="ProductsListImages"/></td>
        <td>
          <p className="ProductName">{product.name}</p>
          <p className="ProductPrice">{product.price} ron</p>
          <p className="ProductCategory">{product.category}</p>
        </td>
        <td className="ToProductDetails">></td>
      </tr>
    );

    return (
        <table>
          {products}
        </table>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <ProductDetails /> */}
      <ProductList />
    </div>
  );
}

export default App;
