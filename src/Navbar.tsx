import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

const Navbar = (): JSX.Element => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <IconButton edge="start" style={{ color: 'black' }} aria-label="menu">
          Logo
        </IconButton>
        <Typography
          variant="h5"
          style={{ color: 'black', marginLeft: '200px' }}
          className="title"
        >
          Products
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
