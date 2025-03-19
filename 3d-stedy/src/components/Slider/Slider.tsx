'use client';
import Image from 'next/image';
import { Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css';

const Slider = () => {
  return (
    <Box className="flat-pages-title">
      <Box className="widget-bg-line">
        <Box className="wraper">
          <Box className="bg-grid-line y bottom">
            <Box className="bg-line" />
          </Box>
        </Box>
      </Box>
      <Container maxWidth="xl" className="themesflat-container">
        <Grid container>
          <Grid item xs={12} className="pages-title">
            <Box className="content text-center">
              <Typography variant="h1" className="mb-4">
                World of top works
              </Typography>
              <Typography variant="body1" className="mb-6">
                Welcome to the world of rare digital art. Explore the best art from
                hand-picked digital artist out there and find the hidden gem.
              </Typography>
              <Box className="button-group flex justify-center gap-4 mb-12">
                <Button 
                  variant="contained" 
                  className="primary-button"
                  endIcon={<ArrowForwardIcon />}
                >
                  Discover more
                </Button>
                <Button 
                  variant="contained" 
                  className="secondary-button"
                  endIcon={<ArrowForwardIcon />}
                >
                  All collections
                </Button>
              </Box>
            </Box>

            <Box className="slider-container">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <SwiperSlide key={item}>
                    <Card className="nft-card">
                      <CardMedia className="card-media-container">
                        <Image 
                          src={`/assets/images/box-item/banner-0${item}.jpg`} 
                          alt={`NFT Item ${item}`} 
                          width={400} 
                          height={400}
                          className="card-image" 
                        />
                        <IconButton className="wishlist-button">
                          <FavoriteIcon />
                        </IconButton>
                        <Box className="featured-countdown">
                          <Typography className="countdown-timer">05:30:00</Typography>
                        </Box>
                        <Button
                          variant="contained"
                          className="bid-button"
                        >
                          Place Bid
                        </Button>
                      </CardMedia>
                      <CardContent className="card-content">
                        <Typography variant="h5" className="nft-title">
                          <a href="#">Dayco serpentine belt</a>
                        </Typography>
                        <Typography variant="h6" className="nft-price">
                          <span className="gem-icon">💎</span>
                          0.34 ETH
                        </Typography>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Slider;


