'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

const Topseller = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Box component="section" className="tf-section seller">
      <Container className="themesflat-container">
        <Grid container>
          <Grid item xs={12}>
            <Box className="heading-section">
              <Typography variant="h2" className="tf-title pb-30">
                Top seller in
                <Box component="span" className="dropdown" id="select-day">
                  <Box component="span" className="btn-selector tf-color">
                    <span>1 day</span>
                  </Box>
                  <Box component="ul">
                    <li><span>1 day</span></li>
                    <li><span>3 day</span></li>
                    <li><span>7 day</span></li>
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="swiper-container seller seller-slider2">
              <Swiper
                modules={[Navigation]}
                loop={false}
                slidesPerView={2}
                spaceBetween={30}
                navigation={{
                  nextEl: '.seller-next',
                  prevEl: '.seller-prev',
                }}
                breakpoints={{
                  500: {
                    slidesPerView: 3,
                  },
                  640: {
                    slidesPerView: 4,
                  },
                  768: {
                    slidesPerView: 5,
                  },
                  1070: {
                    slidesPerView: 6,
                  },
                }}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="swiper-wrapper"
              >
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-01.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">1</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Courtney Henry</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-02.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">2</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Robertson</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-03.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">3</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Midjourney NFTs</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-04.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">4</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Kristin Watson</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-05.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">5</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Dianne Russell</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-06.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">6</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Jenny Wilson</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-02.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">7</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Courtney Henry</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="tf-author-box text-center">
                    <Box className="author-avatar">
                      <Box
                        component="img"
                        src="assets/images/avatar/avatar-01.png"
                        alt=""
                        className="avatar"
                      />
                      <Box className="number">8</Box>
                    </Box>
                    <Box className="author-infor">
                      <Typography variant="h5">
                        <Box component="a" href="author-2.html">Courtney Henry</Box>
                      </Typography>
                      <Typography variant="h6" className="price gem style-1">
                        <i className="icon-gem" />
                        7,080.95
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              </Swiper>
            </Box>
            <Box className="swiper-button-next seller-next over active" />
            <Box className="swiper-button-prev seller-prev over" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Topseller;


