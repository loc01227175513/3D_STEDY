import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedItem = () => {
  return (
    <Box className="tf-section featured-item style-bottom">
      <Container className="themesflat-container">
        <Grid container>
          <Grid item xs={12}>
            <Box className="heading-section pb-20" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h2" className="tf-title">
                Featured Item
              </Typography>
              <Box component="a" href="explore-3.html" sx={{ display: 'flex', alignItems: 'center' }}>
                Discover more <ArrowForwardIcon className="icon-arrow-right2" />
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box className="featured pt-10" sx={{ position: 'relative' }}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: '.slider-next',
                  prevEl: '.slider-prev'
                }}
                pagination={{
                  el: '.swiper-pagination',
                  clickable: true
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2
                  },
                  1024: {
                    slidesPerView: 3
                  },
                  1300: {
                    slidesPerView: 4
                  }
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <SwiperSlide key={item}>
                    <Box className="tf-card-box style-1">
                      <Box className="card-media">
                        <Box component="a" href="details">
                          <Box component="img" src={`assets/images/box-item/card-item-0${item > 4 ? item - 4 : item}.jpg`} alt="" />
                        </Box>
                        <IconButton className="wishlist-button">
                          <FavoriteIcon />
                        </IconButton>
                        <Box className="featured-countdown">
                          <span className="js-countdown" data-timer={7500} data-labels="d,h,m,s" />
                        </Box>
                        <Box className="button-place-bid">
                          <Box
                            component="a"
                            href="#"
                            data-toggle="modal"
                            data-target="#popup_bid"
                            className="tf-button"
                          >
                            <span>Place Bid</span>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Typography variant="h5" className="name">
                        <Box component="a" href="details">Dayco serpentine belt</Box>
                      </Typography>
                      
                      <Box className="author flex items-center">
                        <Box className="avatar">
                          <Box component="img" src={`assets/images/avatar/avatar-box-0${item}.jpg`} alt="Image" />
                        </Box>
                        <Box className="info">
                          <Typography variant="body2">Created by:</Typography>
                          <Typography variant="h6">
                            <Box component="a" href="author-2.html">
                              {item === 1 ? 'Kathryn Murphy' : 'Cody Fisher'}
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box className="divider" />
                      
                      <Box className="meta-info flex items-center justify-between">
                        <Typography variant="body2" className="text-bid">Current Bid</Typography>
                        <Typography variant="h6" className="price gem">
                          <i className="icon-gem" />
                          0,34
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <Box className="swiper-pagination" />
              <IconButton className="slider-next swiper-button-next" />
              <IconButton className="slider-prev swiper-button-prev" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedItem;


