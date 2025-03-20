"use client"

import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  Button, 
  Divider
} from '@mui/material';

export default async function DetailPage() {
  return (
    <>
    <Box className="tf-section-2 product-detail">
      <Container className="themesflat-container">
        <Grid container className="row">
          <Grid item md={6} data-wow-delay="0s" className="wow fadeInLeft col-md-6">
            <Card className="tf-card-box style-5 mb-0">
              <CardMedia className="card-media mb-0">
                <Box component="a" href="#">
                  <Box
                    component="img"
                    src="assets/images/box-item/product-detail-01.jpg"
                    alt=""
                  />
                </Box>
              </CardMedia>
              <Typography component="h6" className="price gem">
                <i className="icon-gem" />
              </Typography>
              <Box className="wishlist-button">
                10
                <i className="icon-heart" />
              </Box>
              <Box className="featured-countdown">
                <Box
                  component="span"
                  className="js-countdown"
                  data-timer={7500}
                  data-labels="d,h,m,s"
                />
              </Box>
            </Card>
          </Grid>
          <Grid item md={6} className="col-md-6">
            <Box data-wow-delay="0s" className="wow fadeInRight infor-product">
              <Typography className="text">
                8SIAN Main Collection{" "}
                <Box component="span" className="icon-tick">
                  <Box component="span" className="path1" />
                  <Box component="span" className="path2" />
                </Box>
              </Typography>
              <Box className="menu_card">
                <Box className="dropdown">
                  <Box className="icon">
                    <Box
                      component="a"
                      href="javascript:void(0);"
                      className="btn-link"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-link-1" />
                    </Box>
                    <Box className="dropdown-menu">
                      <Box component="a" className="dropdown-item" href="#">
                        <i className="icon-link" />
                        Copy link
                      </Box>
                      <Box component="a" className="dropdown-item" href="#">
                        <i className="icon-facebook" />
                        Share on facebook
                      </Box>
                      <Box component="a" className="dropdown-item mb-0" href="#">
                        <i className="icon-twitter" />
                        Share on twitter
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="dropdown">
                  <Box className="icon">
                    <Box
                      component="a"
                      href="javascript:void(0);"
                      className="btn-link"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-content" />
                    </Box>
                    <Box className="dropdown-menu">
                      <Box component="a" className="dropdown-item" href="#">
                        <i className="icon-refresh" />
                        Refresh metadata
                      </Box>
                      <Box component="a" className="dropdown-item mb-0" href="#">
                        <i className="icon-report" />
                        Report
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Typography variant="h2">Themesflat #0270</Typography>
              <Box className="author flex items-center mb-30">
                <Box className="avatar">
                  <Box component="img" src="assets/images/avatar/avatar-box-05.jpg" alt="Image" />
                </Box>
                <Box className="info">
                  <Typography component="span">Owned by:</Typography>
                  <Typography component="h6">
                    <Box component="a" href="author-1.html">Marvin McKinney</Box>{" "}
                  </Typography>
                </Box>
              </Box>
              <Box className="meta mb-20">
                <Box className="meta-item view">
                  <i className="icon-show" />
                  208 view
                </Box>
                <Box className="meta-item rating">
                  <i className="icon-link-2" />
                  Top #2 trending
                </Box>
                <Box className="meta-item favorites">
                  <i className="icon-heart" />
                  10 favorites
                </Box>
              </Box>
            </Box>
            <Box
              data-wow-delay="0s"
              className="wow fadeInRight product-item time-sales"
            >
              <Typography component="h6">
                <i className="icon-clock" />
                Sale ends May 22 at 9:39
              </Typography>
              <Box className="content">
                <Typography className="text">Current price</Typography>
                <Box className="flex justify-between">
                  <Typography component="p">
                    0,032 ETH <Box component="span">$58,11</Box>
                  </Typography>
                  <Button
                    href="#"
                    data-toggle="modal"
                    data-target="#popup_bid"
                    className="tf-button style-1 h50 w216"
                  >
                    Place a bid
                    <i className="icon-arrow-up-right2" />
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              data-wow-delay="0s"
              className="wow fadeInRight product-item description"
            >
              <Typography component="h6">
                <i className="icon-description" />
                Description
              </Typography>
              <i className="icon-keyboard_arrow_down" />
              <Box className="content">
                <Typography component="p">
                  8,888 NFTs of beautiful, Asian women painstakingly-crafted where
                  even the most intricate details are steeped in historical
                  significance. We envision 8SIAN being a global, inclusive
                  community <Box component="span">see more</Box>
                </Typography>
              </Box>
            </Box>
            <Box
              data-wow-delay="0s"
              className="wow fadeInRight product-item history"
            >
              <Typography component="h6">
                <i className="icon-description" />
                Price History
              </Typography>
              <i className="icon-keyboard_arrow_down" />
              <Box className="content">
                <Box className="chart">
                  <Box component="canvas" id="myChart" />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} data-wow-delay="0s" className="wow fadeInUp col-12">
            <Box className="product-item details">
              <Typography component="h6">
                <i className="icon-description" />
                Details
              </Typography>
              <i className="icon-keyboard_arrow_down" />
              <Box className="content">
                <Box className="details-item">
                  <Box component="span">Contract Address</Box>
                  <Box component="span" className="tf-color">0x1984...c38f</Box>
                </Box>
                <Box className="details-item">
                  <Box component="span">Token ID</Box>
                  <Box component="span" className="tf-color">0270</Box>
                </Box>
                <Box className="details-item">
                  <Box component="span">Token Standard</Box>
                  <Box component="span" className="">ERC-721</Box>
                </Box>
                <Box className="details-item">
                  <Box component="span">Chain</Box>
                  <Box component="span" className="">Ethereum</Box>
                </Box>
                <Box className="details-item">
                  <Box component="span">Last Updated</Box>
                  <Box component="span" className="">8 months ago</Box>
                </Box>
                <Box className="details-item mb-0">
                  <Box component="span">Creator Earnings</Box>
                  <Box component="span" className="">8%</Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} data-wow-delay="0s" className="wow fadeInUp col-12">
            <Box className="product-item traits style-1">
              <Typography component="h6">
                <i className="icon-description" />
                Traits
              </Typography>
              <i className="icon-keyboard_arrow_down" />
              <Box className="content">
                <Box className="trait-item">
                  <Typography component="p">Apparel</Typography>
                  <Box className="title">Bathrobe Red 1%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Background</Typography>
                  <Box className="title">Orange 5%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Earrings</Typography>
                  <Box className="title">None 60%</Box>
                  <Typography component="p">Floor: 0,037 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Apparel</Typography>
                  <Box className="title">Bathrobe Red 1%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Background</Typography>
                  <Box className="title">Orange 5%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Earrings</Typography>
                  <Box className="title">None 60%</Box>
                  <Typography component="p">Floor: 0,037 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Apparel</Typography>
                  <Box className="title">Bathrobe Red 1%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Background</Typography>
                  <Box className="title">Orange 5%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Earrings</Typography>
                  <Box className="title">None 60%</Box>
                  <Typography component="p">Floor: 0,037 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Earrings</Typography>
                  <Box className="title">None 60%</Box>
                  <Typography component="p">Floor: 0,037 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Apparel</Typography>
                  <Box className="title">Bathrobe Red 1%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
                <Box className="trait-item">
                  <Typography component="p">Background</Typography>
                  <Box className="title">Orange 5%</Box>
                  <Typography component="p">Floor: 0,056 ETH</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} data-wow-delay="0s" className="wow fadeInUp col-12">
            <Box className="product-item offers">
              <Typography component="h6">
                <i className="icon-description" />
                Offers
              </Typography>
              <i className="icon-keyboard_arrow_down" />
              <Box className="content">
                <Box className="table-heading">
                  <Box className="column">Price</Box>
                  <Box className="column">USD Price</Box>
                  <Box className="column">Quantity</Box>
                  <Box className="column">Floor Diference</Box>
                  <Box className="column">Expiration</Box>
                  <Box className="column">Form</Box>
                </Box>
                <Box className="table-item">
                  <Box className="column">
                    <Typography component="h6" className="price gem">
                      <i className="icon-gem" />
                      0,0034
                    </Typography>
                  </Box>
                  <Box className="column">$6,60</Box>
                  <Box className="column">3</Box>
                  <Box className="column">90% below</Box>
                  <Box className="column">In 26 day</Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">273E40</Box>
                  </Box>
                </Box>
                <Box className="table-item">
                  <Box className="column">
                    <Typography component="h6" className="price gem">
                      <i className="icon-gem" />
                      0,0034
                    </Typography>
                  </Box>
                  <Box className="column">$6,60</Box>
                  <Box className="column">3</Box>
                  <Box className="column">90% below</Box>
                  <Box className="column">In 26 day</Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">273E40</Box>
                  </Box>
                </Box>
                <Box className="table-item">
                  <Box className="column">
                    <Typography component="h6" className="price gem">
                      <i className="icon-gem" />
                      0,0034
                    </Typography>
                  </Box>
                  <Box className="column">$6,60</Box>
                  <Box className="column">3</Box>
                  <Box className="column">90% below</Box>
                  <Box className="column">In 26 day</Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">273E40</Box>
                  </Box>
                </Box>
                <Box className="table-item">
                  <Box className="column">
                    <Typography component="h6" className="price gem">
                      <i className="icon-gem" />
                      0,0034
                    </Typography>
                  </Box>
                  <Box className="column">$6,60</Box>
                  <Box className="column">3</Box>
                  <Box className="column">90% below</Box>
                  <Box className="column">In 26 day</Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">273E40</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} data-wow-delay="0s" className="wow fadeInUp col-12">
            <Box className="product-item item-activity mb-0">
              <Typography component="h6">
                <i className="icon-two-arrow rotateZ90" />
                Item activity
              </Typography>
              <i className="icon-keyboard_arrow_down" />
              <Box className="content">
                <Box className="table-heading">
                  <Box className="column">Event</Box>
                  <Box className="column">Price</Box>
                  <Box className="column">Form</Box>
                  <Box className="column">To</Box>
                  <Box className="column">Date</Box>
                </Box>
                <Box className="table-item">
                  <Box className="column flex items-center">
                    <i className="icon-two-arrow" />
                    Transfer
                  </Box>
                  <Box className="column">-/-</Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">985DE3</Box>
                  </Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">Nosyu</Box>
                  </Box>
                  <Box className="column">19h ago</Box>
                </Box>
                <Box className="table-item">
                  <Box className="column flex items-center">
                    <i className="icon-sale" />
                    Sale
                  </Box>
                  <Box className="column">
                    <Typography component="h6" className="price gem">
                      <i className="icon-gem" />
                      0,0319
                    </Typography>
                  </Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">985DE3</Box>
                  </Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">Nosyu</Box>
                  </Box>
                  <Box className="column">19h ago</Box>
                </Box>
                <Box className="table-item">
                  <Box className="column flex items-center">
                    <i className="icon-two-arrow" />
                    Transfer
                  </Box>
                  <Box className="column">-/-</Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">985DE3</Box>
                  </Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">Nosyu</Box>
                  </Box>
                  <Box className="column">19h ago</Box>
                </Box>
                <Box className="table-item">
                  <Box className="column flex items-center">
                    <i className="icon-sale" />
                    Sale
                  </Box>
                  <Box className="column">
                    <Typography component="h6" className="price gem">
                      <i className="icon-gem" />
                      0,0319
                    </Typography>
                  </Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">985DE3</Box>
                  </Box>
                  <Box className="column">
                    <Box component="span" className="tf-color">Nosyu</Box>
                  </Box>
                  <Box className="column">19h ago</Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box className="tf-section-2 featured-item style-bottom">
      <Container className="themesflat-container">
        <Grid container className="row">
          <Grid item md={12} className="col-md-12">
            <Box className="heading-section pb-20">
              <Typography variant="h2" className="tf-title ">Related artworks</Typography>
              <Box component="a" href="explore-3.html" className="">
                Discover more <i className="icon-arrow-right2" />
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} className="col-md-12">
            <Box
              className="featured pt-10 swiper-container carousel"
              data-swiper='{
                            "loop":false,
                            "slidesPerView": 1,
                            "observer": true,
                            "observeParents": true,
                            "spaceBetween": 30,
                            "navigation": {
                                "clickable": true,
                                "nextEl": ".slider-next",
                                "prevEl": ".slider-prev"
                            },
                            "pagination": {
                                "el": ".swiper-pagination",
                                "clickable": true
                            },
                            "breakpoints": {
                                "768": {
                                    "slidesPerView": 2,
                                    "spaceBetween": 30
                                },
                                "1024": {
                                    "slidesPerView": 3,
                                    "spaceBetween": 30
                                },
                                "1300": {
                                    "slidesPerView": 4,
                                    "spaceBetween": 30
                                }
                            }
                        }'
            >
              <Box className="swiper-wrapper">
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-11.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-01.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-12.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="/details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-02.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-13.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="/details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-03.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-14.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-04.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-11.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-05.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-12.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-06.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
                <Box className="swiper-slide">
                  <Card className="tf-card-box style-1">
                    <CardMedia className="card-media">
                      <Box component="a" href="#">
                        <Box
                          component="img"
                          src="assets/images/box-item/card-item-13.jpg"
                          alt=""
                        />
                      </Box>
                      <Box component="span" className="wishlist-button icon-heart" />
                      <Box className="featured-countdown">
                        <Box
                          component="span"
                          className="js-countdown"
                          data-timer={7500}
                          data-labels="d,h,m,s"
                        />
                      </Box>
                      <Box className="button-place-bid">
                        <Button
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          <Box component="span">Place Bid</Box>
                        </Button>
                      </Box>
                    </CardMedia>
                    <Typography component="h5" className="name">
                      <Box component="a" href="details">Dayco serpentine belt</Box>
                    </Typography>
                    <Box className="author flex items-center">
                      <Box className="avatar">
                        <Box
                          component="img"
                          src="assets/images/avatar/avatar-box-07.jpg"
                          alt="Image"
                        />
                      </Box>
                      <Box className="info">
                        <Box component="span">Posted by:</Box>
                        <Typography component="h6">
                          <Box component="a" href="author-2.html">Cody Fisher</Box>{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider className="divider" />
                    <Box className="meta-info flex items-center justify-between">
                      <Box component="span" className="text-bid">Current Bid</Box>
                      <Typography component="h6" className="price gem">
                        <i className="icon-gem" />
                        0,34
                      </Typography>
                    </Box>
                  </Card>
                </Box>
              </Box>
              <Box className="swiper-pagination" />
              <Box className="slider-next swiper-button-next" />
              <Box className="slider-prev swiper-button-prev" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  
  );
}

