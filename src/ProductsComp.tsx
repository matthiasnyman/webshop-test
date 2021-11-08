import React from 'react';
import './App.css';
import {
  Grid,
  Card,
  CardMedia,
  Container,
  Autocomplete,
  TextField,
  Rating,
  Button,
  MenuItem,
} from '@mui/material';
import { Product } from './interfaces';

interface ProductsType {
  Products: Product[];
  productOptions: string[];
  setSelectedItem: React.Dispatch<
    React.SetStateAction<Product | null | undefined>
  >;
  category: string | null | undefined;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const ratingOptions = {};

const ProductsComp = (props: ProductsType) => {
  const { Products, productOptions, setSelectedItem, category, setCategory } =
    props;
  const [filteredProducts, setFilteredProducts] = React.useState(Products);
  const [sortDirection, setSortDirection] = React.useState<boolean | null>(
    null
  );
  const [rating, setRating] = React.useState<number>(1);

  React.useEffect(() => {
    setSortDirection(null);
    if (category && rating) {
      setFilteredProducts(
        Products.filter(
          (item) =>
            item.category === category && Math.round(item.rating.rate) >= rating
        )
      );
    } else {
      setFilteredProducts(
        Products.filter((item) => Math.round(item.rating.rate) >= rating)
      );
    }
  }, [category, Products, rating]);

  const sort = () => {
    let sortedProducts = filteredProducts.sort((a, b) => {
      return sortDirection
        ? a.rating.rate - b.rating.rate
        : b.rating.rate - a.rating.rate;
    });

    setSortDirection(!sortDirection);
    setFilteredProducts(sortedProducts);
  };

  const numbers = [1, 2, 3, 4, 5];
  const ratingOptions = numbers.map((number) => (
    <MenuItem
      value={number}
      key={number}
      onClick={(event) => setRating(number)}
    >
      <Rating name="read-only" value={number} readOnly />
    </MenuItem>
  ));

  return (
    <Container maxWidth="md">
      <div className="filter-section">
        <Autocomplete
          disablePortal
          options={productOptions}
          sx={{ width: 300 }}
          value={category}
          onChange={(event: any, value: string | null) => setCategory(value)}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
        <Button onClick={sort}>
          {!sortDirection ? 'Sort on highest rating' : 'Sort on lowest rating'}
        </Button>
        <TextField label="Filter on rating" select value={rating}>
          {ratingOptions}
        </TextField>
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 6, md: 4 }}>
        {filteredProducts.map((i) => {
          const { id, image, title, rating } = i;
          return (
            <Grid item xs={6} sm={3} md={3} key={id}>
              <Card onClick={() => setSelectedItem(i)}>
                <CardMedia
                  component="img"
                  height="280"
                  image={image}
                  alt={`image for ${title}`}
                />
                <h4 className="card-header">{title}</h4>
                <Rating
                  name="read-only"
                  value={rating.rate}
                  precision={0.5}
                  readOnly
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProductsComp;
