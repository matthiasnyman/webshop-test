import React from 'react';
import './App.css';
import DetailsComp from './DetailsComp';
import { Product } from './interfaces';
import Navbar from './Navbar';
import ProductsComp from './ProductsComp';
const axios = require('axios');

const App = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [category, setCategory] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<Product | null>();
  const [productOptions, setProductOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res: any) => {
        setProducts(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });

    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((res: any) => {
        setProductOptions(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="App">
      <Navbar />
      {!selectedItem ? (
        <ProductsComp
          Products={products}
          productOptions={productOptions}
          setSelectedItem={setSelectedItem}
          category={category}
          setCategory={setCategory}
        />
      ) : (
        <DetailsComp Product={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </section>
  );
};

export default App;
