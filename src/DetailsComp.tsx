import { Button, Container } from '@mui/material';
import React from 'react';
import './App.css';
import { Product } from './interfaces';

interface DetailsType {
  Product: Product;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<Product | null | undefined>
  >;
}

const DetailsComp = (props: DetailsType) => {
  const { title, price, image, description } = props.Product;

  return (
    <Container maxWidth="md">
      <div className="flex">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <Button variant="outlined" onClick={() => props.setSelectedItem(null)}>
          back
        </Button>
      </div>

      <div className="">
        <img className="product-image" src={image} alt="Product" />
        <p>{description}</p>
        <div className="flex">
          <p>
            pris: <b>{price}</b> kr
          </p>
          <Button id="contained">köp</Button>
        </div>
      </div>
    </Container>
  );
};

export default DetailsComp;
