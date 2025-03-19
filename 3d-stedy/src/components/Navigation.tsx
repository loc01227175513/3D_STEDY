'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Button,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" className="header_1 header-fixed">
        <Container className="themesflat-container">
          <Toolbar className="wrap-box flex">
            <Box id="site-logo" className="flex">
              <Link href="/" className="main-logo">
                <Image
                  id="logo_header"
                  src="/assets/images/logo/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="mobile-button"
            >
              <MenuIcon />
            </IconButton>

            <Box component="nav" className="main-nav">
              <Stack direction="row" spacing={2}>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  className="menu-item menu-item-has-children"
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/about"
                  className="menu-item"
                >
                  About us
                </Button>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  className="menu-item menu-item-has-children"
                >
                  Explore
                </Button>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  className="menu-item menu-item-has-children"
                >
                  Pages
                </Button>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  className="menu-item menu-item-has-children"
                >
                  Blog
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/contact"
                  className="menu-item"
                >
                  Contact
                </Button>
              </Stack>
            </Box>

            <Box className="flat-wallet flex">
              <Button
                variant="contained"
                className="tf-button style-1"
                component={Link}
                href="/market-wallet"
              >
                <span>Wallet connect</span>
                <i className="icon-wa" />
              </Button>

              <IconButton color="inherit" className="header-search">
                <SearchIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Home 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Home 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Home 3</MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box className="side-bar">
          <Link href="/" className="main-logo">
            <Image
              id="logo_header"
              src="/assets/images/logo/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
          <IconButton onClick={handleDrawerToggle} className="canvas-nav-close">
            <CloseIcon />
          </IconButton>
          <Box className="widget-search mt-30">
            <TextField
              fullWidth
              placeholder="Search..."
              className="search-field style-1"
            />
          </Box>
          <Box className="widget widget-categories">
            <Typography variant="h6" className="title-widget">Categories</Typography>
            <List>
              <ListItem>
                <ListItemText primary="NFTs" secondary="(1.483)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Digital Art" secondary="(97)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Crypto" secondary="(45)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Technology" secondary="(728)" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation; 