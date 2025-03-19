import { Box, Container, Grid, Typography, Button, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
const Action = () => {
  return (
    <>
      <Box className="tf-section action">
        <Container className="themesflat-container">
          <Grid container>
            <Grid item xs={12}>
              <Box className="action__body">
                <Box className="tf-tsparticles">
                  <Box id="tsparticles1" data-color="#161616" data-line="#000" />
                </Box>
                <Typography variant="h2">Discover, create and sell your own NFT</Typography>
                <Stack direction="row" spacing={2} className="flat-button flex">
                  <Button 
                    variant="contained" 
                    className="tf-button style-2 h50 w190 mr-10"
                    endIcon={<ArrowForwardIcon className="icon-arrow-up-right2" />}
                  >
                    Explore now
                  </Button>
                  <Button 
                    variant="contained" 
                    className="tf-button style-2 h50 w230"
                    endIcon={<ArrowForwardIcon className="icon-arrow-up-right2" />}
                  >
                    Create your first NFT
                  </Button>
                </Stack>
                <Box className="bg-home7">
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={14}
                    slidesPerView="auto"
                    loop={true}
                    direction="vertical"
                    speed={10000}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false
                    }}
                    className="autoslider3reverse"
                  >
                    <SwiperSlide>
                      <Image src="/assets/images/item-background/bg-action-1.png" alt="" width={300} height={300} />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src="/assets/images/item-background/bg-action-1.png" alt="" width={300} height={300} />
                    </SwiperSlide>
                  </Swiper>
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={14}
                    slidesPerView="auto"
                    loop={true}
                    direction="vertical"
                    speed={10000}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                      reverseDirection: true
                    }}
                    className="autoslider4reverse"
                  >
                    <SwiperSlide>
                      <Image src="/assets/images/item-background/bg-action-1.png" alt="" width={300} height={300} />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src="/assets/images/item-background/bg-action-1.png" alt="" width={300} height={300} />
                    </SwiperSlide>
                  </Swiper>
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={14}
                    slidesPerView="auto"
                    loop={true}
                    direction="vertical"
                    speed={10000}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false
                    }}
                    className="autoslider3reverse"
                  >
                    <SwiperSlide>
                      <Image src="/assets/images/item-background/bg-action-1.png" alt="" width={300} height={300} />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src="/assets/images/item-background/bg-action-1.png" alt="" width={300} height={300} />
                    </SwiperSlide>
                  </Swiper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Action;


