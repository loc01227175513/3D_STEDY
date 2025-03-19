import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const TopCollector = () => {
  const swiperConfig = {
    loop: false,
    spaceBetween: 28,
    slidesPerView: "auto" as const,
    centeredSlides: false,
    observer: true,
    observeParents: true,
    grabCursor: true,
    breakpoints: {
      0: { spaceBetween: 20 },
      480: { spaceBetween: 20 },
      767: { spaceBetween: 28 },
      992: { spaceBetween: 28 }
    }
  };

  const AuthorBox = ({ image, name }: { image: string; name: string }) => (
    <Box className="tf-author-box style-1 text-center flex">
      <Box className="author-avatar">
        <Box
          component="img"
          src={image}
          alt=""
          className="avatar"
        />
      </Box>
      <Box className="author-infor">
        <Typography variant="h5">
          <Box component="a" href="author-2.html">{name}</Box>
        </Typography>
      </Box>
    </Box>
  );

  const authors = [
    { image: "assets/images/avatar/avatar-small-01.png", name: "EHT senders" },
    { image: "assets/images/avatar/avatar-small-02.png", name: "Girls riding things" },
    { image: "assets/images/avatar/avatar-small-03.png", name: "The lobstars" },
    { image: "assets/images/avatar/avatar-small-04.png", name: "Nakamigos" },
    { image: "assets/images/avatar/avatar-small-01.png", name: "Beanz office" },
    { image: "assets/images/avatar/avatar-small-02.png", name: "Sproto gremilins" },
    { image: "assets/images/avatar/avatar-small-03.png", name: "Psyop gang" },
    { image: "assets/images/avatar/avatar-small-04.png", name: "EHT senders" },
    { image: "assets/images/avatar/avatar-small-01.png", name: "Girls riding things" },
    { image: "assets/images/avatar/avatar-small-02.png", name: "The lobstars" },
    { image: "assets/images/avatar/avatar-small-03.png", name: "Nakamigos" },
    { image: "assets/images/avatar/avatar-small-04.png", name: "Beanz office" }
  ];

  return (
    <Box className="tf-section top-collector">
      <Box className="top-collector-wrapper">
        <Box className="bg-text">
          <Typography variant="h2">Top Collector</Typography>
        </Box>
        <Box className="heading-section">
          <Typography variant="h2" className="tf-title">Top Collector Buys Today</Typography>
        </Box>
        
        <Swiper {...swiperConfig} className="featured swiper-container autoslider1">
          <Box className="swiper-wrapper">
            {authors.map((author, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <AuthorBox image={author.image} name={author.name} />
              </SwiperSlide>
            ))}
          </Box>
        </Swiper>

        <Swiper {...swiperConfig} className="featured mt-17 swiper-container autoslider2">
          <Box className="swiper-wrapper">
            {authors.map((author, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <AuthorBox image={author.image} name={author.name} />
              </SwiperSlide>
            ))}
          </Box>
        </Swiper>
      </Box>
    </Box>
  );
};

export default TopCollector;
