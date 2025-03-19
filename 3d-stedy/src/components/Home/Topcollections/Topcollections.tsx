import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Topcollections = () => {
  return (
    <Box className="tf-section top-collections">
      <Container className="themesflat-container">
        <Grid container>
          <Grid item xs={12}>
            <Box className="heading-section pb-20">
              <Typography variant="h2" className="tf-title">
                Top collections in week
              </Typography>
              <Link href="explore-3.html" className="">
                Discover more <ArrowForwardIcon className="icon-arrow-right2" />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="featured pt-10">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  600: {
                    slidesPerView: 2
                  },
                  991: {
                    slidesPerView: 3
                  }
                }}
                loop={false}
                observer={true}
                observeParents={true}
              >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <SwiperSlide key={item}>
                    <Box className="tf-card-collection">
                      <Link href="author-2.html">
                        <Box className="media-images-collection">
                          <img
                            src={`assets/images/box-item/img-collection-${String(item).padStart(2, '0')}.jpg`}
                            alt=""
                          />
                          <img
                            src={`assets/images/box-item/img-collection-${String(item + 1).padStart(2, '0')}.jpg`}
                            alt=""
                          />
                          <img
                            src={`assets/images/box-item/img-collection-${String(item + 2).padStart(2, '0')}.jpg`}
                            alt=""
                          />
                          <img
                            src={`assets/images/box-item/img-collection-${String(item + 3).padStart(2, '0')}.jpg`}
                            alt=""
                          />
                          <Box className="author-poster">
                            <img
                              src={`assets/images/avatar/avatar-${String(item % 3 + 1).padStart(2, '0')}.png`}
                              alt=""
                              className="w-full"
                            />
                          </Box>
                        </Box>
                      </Link>
                      <Box className="card-bottom">
                        <Box className="author">
                          <Typography variant="h5">
                            <Link href="author-1.html">Bored ape#21</Link>
                          </Typography>
                          <Typography className="infor">@Themesflat</Typography>
                        </Box>
                        <Box className="bottom-right">
                          <Box className="shop">
                            <IconButton className="icon">
                              <ShoppingBagIcon />
                            </IconButton>
                            <Typography>12 Item</Typography>
                          </Box>
                          <Box className="like">
                            <IconButton className="wishlist-button">
                              <FavoriteIcon />
                            </IconButton>
                            <Typography>97 like</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
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

export default Topcollections;

