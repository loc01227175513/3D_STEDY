import { Box, Container, Grid, Typography, Link, List, ListItem, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box component="footer" id="footer">
      <Container className="themesflat-container">
        <Grid container>
          <Grid item xs={12}>
            <Box className="footer-content" sx={{ display: 'flex', flexGrow: 1 }}>
              <Box className="widget-logo" sx={{ flexGrow: 1 }}>
                <Box className="logo-footer" id="logo-footer">
                  <Link href="index.html">
                    <Box
                      component="img"
                      id="logo_footer"
                      src="assets/images/logo/logo.png"
                      data-retina="assets/images/logo/logo@2x.png"
                      alt="Logo"
                    />
                  </Link>
                </Box>
              </Box>

              <Box className="widget widget-menu style-1">
                <Typography variant="h5" className="title-widget">Marketplace</Typography>
                <List>
                  <ListItem><Link href="#">All NFTs</Link></ListItem>
                  <ListItem><Link href="#">Virtual worlds</Link></ListItem>
                  <ListItem><Link href="#">Domain names</Link></ListItem>
                  <ListItem><Link href="#">Photography</Link></ListItem>
                  <ListItem><Link href="#">Digital art</Link></ListItem>
                  <ListItem><Link href="#">Music</Link></ListItem>
                </List>
              </Box>

              <Box className="widget widget-menu style-2">
                <Typography variant="h5" className="title-widget">Resource</Typography>
                <List>
                  <ListItem><Link href="#">Help center</Link></ListItem>
                  <ListItem><Link href="#">Platform status</Link></ListItem>
                  <ListItem><Link href="#">Partners</Link></ListItem>
                  <ListItem><Link href="#">Discount community</Link></ListItem>
                  <ListItem><Link href="#">Live auctions</Link></ListItem>
                  <ListItem><Link href="#">Discover</Link></ListItem>
                </List>
              </Box>

              <Box className="widget widget-menu style-3">
                <Typography variant="h5" className="title-widget">Account</Typography>
                <List>
                  <ListItem><Link href="#">Authors</Link></ListItem>
                  <ListItem><Link href="#">My Collection</Link></ListItem>
                  <ListItem><Link href="#">Author Profile</Link></ListItem>
                  <ListItem><Link href="#">Go to dashboard</Link></ListItem>
                  <ListItem><Link href="#">Collection</Link></ListItem>
                  <ListItem><Link href="#">Create Collection</Link></ListItem>
                </List>
              </Box>

              <Box className="widget-last">
                <Box className="widget-menu style-4">
                  <Typography variant="h5" className="title-widget">Company</Typography>
                  <List>
                    <ListItem><Link href="#">Help center</Link></ListItem>
                    <ListItem><Link href="#">Platform status</Link></ListItem>
                  </List>
                </Box>
                <Typography variant="h5" className="title-widget" sx={{ mt: 4 }}>Join the community</Typography>
                <Box className="widget-social">
                  <Box sx={{ display: 'flex' }}>
                    <IconButton><FacebookIcon /></IconButton>
                    <IconButton><TwitterIcon /></IconButton>
                    <IconButton><YouTubeIcon /></IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box className="footer-bottom" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>© 2023 OpeN9 - Made By Themesflat</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;


