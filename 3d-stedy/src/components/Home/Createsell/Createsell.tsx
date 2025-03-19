import { Box, Container, Grid, Typography, Link } from '@mui/material';
import Image from 'next/image';

const Createsell = () => {
  return (
    <Box className="tf-section create-sell">
      <Container className="themesflat-container">
        <Grid container>
          <Grid item xs={12}>
            <Box className="heading-section" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h2" className="tf-title" sx={{ pb: 3 }}>
                Step by step Create and Sell Your NFTs
              </Typography>
            </Box>
          </Grid>
          
          <Grid item lg={3} md={6}>
            <Box className="tf-box-icon relative text-center">
              <Box className="image">
                <Image src="/assets/images/box-icon/icon-01.png" alt="" width={100} height={100} />
                <Typography>Step 1</Typography>
              </Box>
              <Typography variant="h4" className="heading">
                <Link href="contact-us.html">Set Up Your Wallet</Link>
              </Typography>
              <Typography className="content">
                Fusce non dignissim velit, sit amet semper eros. Quisque orci est
              </Typography>
              <Box className="arrow">
                <svg
                  width={114}
                  height={114}
                  viewBox="0 0 114 114"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_625_20131)">
                    <path
                      d="M13.0682 58.6163C14.3723 57.8473 15.7186 57.1206 17.0509 56.436L16.1333 54.65C14.7448 55.3625 13.3845 56.1032 12.0524 56.9002L13.0683 58.6444L13.0682 58.6163ZM21.1465 54.4527C22.5352 53.8244 23.9381 53.2383 25.3551 52.6944L24.6057 50.8245C23.1607 51.3965 21.7298 51.9825 20.313 52.6107L21.1324 54.4386L21.1465 54.4527ZM29.6344 51.1469C31.0797 50.6592 32.5251 50.2277 33.9986 49.8244L33.4458 47.8989C31.9582 48.3162 30.4707 48.7616 28.9974 49.2493L29.6344 51.1469ZM38.4195 48.6986C39.9073 48.3656 41.3952 48.0606 42.8972 47.7977L42.5408 45.8166C41.0107 46.0793 39.4948 46.3842 37.9649 46.7312L38.4195 48.6986ZM47.4036 47.1216C48.9199 46.929 50.4222 46.7786 51.9527 46.6563L51.7788 44.6615C50.2202 44.7838 48.6898 44.9342 47.1455 45.1267L47.4036 47.1216ZM56.5024 46.4156C58.019 46.3635 59.5498 46.3536 61.0666 46.3857L61.0753 44.3774C59.5164 44.3592 57.9715 44.3551 56.4128 44.4211L56.4884 46.4297L56.5024 46.4156ZM65.6314 46.5524C67.1485 46.6407 68.6656 46.7852 70.1829 46.9578L70.4022 44.9641C68.8569 44.7915 67.2977 44.6609 65.7526 44.5725L65.6315 46.5805L65.6314 46.5524ZM74.7067 47.5598C76.2101 47.8025 77.7135 48.0734 79.203 48.3863L79.591 46.4212C78.0734 46.1082 76.5278 45.8232 74.9963 45.5803L74.6927 47.5738L74.7067 47.5598ZM83.6578 49.4235C85.1335 49.8066 86.5952 50.2319 88.057 50.6852L88.6418 48.7767C87.1659 48.3093 85.648 47.8839 84.1582 47.4867L83.6578 49.4235ZM92.3866 52.1574C93.8064 52.6808 95.2405 53.2464 96.6465 53.84L97.428 51.9883C95.9938 51.3665 94.5458 50.8149 93.0978 50.2633L92.4147 52.1574L92.3866 52.1574ZM100.795 55.7471C102.159 56.4108 103.509 57.1166 104.845 57.8645L105.809 56.1116C104.445 55.3636 103.067 54.6296 101.661 53.9517L100.795 55.7471Z"
                      fill="#919191"
                    />
                    <path
                      d="M95.5845 61.1824L95.0597 59.2569L104.589 56.6842L101.292 47.336L103.186 46.681L107.205 58.0676L95.5845 61.1824Z"
                      fill="#919191"
                    />
                    <circle
                      cx="8.69433"
                      cy="59.7296"
                      r="3.91825"
                      transform="rotate(-135 8.69433 59.7296)"
                      stroke="#919191"
                      strokeWidth={2}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_625_20131">
                      <rect
                        width="76.2328"
                        height="83.6102"
                        fill="white"
                        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 113.026 54.5132)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3} md={6}>
            <Box className="tf-box-icon relative text-center type-1">
              <Box className="image">
                <Image src="/assets/images/box-icon/icon-02.png" alt="" width={100} height={100} />
                <Typography>Step 2</Typography>
              </Box>
              <Typography variant="h4" className="heading">
                <Link href="contact-us.html">Create your collection</Link>
              </Typography>
              <Typography className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque luctus
              </Typography>
              <Box className="arrow">
                <svg
                  width={114}
                  height={114}
                  viewBox="0 0 114 114"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_625_20131)">
                    <path
                      d="M13.0682 58.6163C14.3723 57.8473 15.7186 57.1206 17.0509 56.436L16.1333 54.65C14.7448 55.3625 13.3845 56.1032 12.0524 56.9002L13.0683 58.6444L13.0682 58.6163ZM21.1465 54.4527C22.5352 53.8244 23.9381 53.2383 25.3551 52.6944L24.6057 50.8245C23.1607 51.3965 21.7298 51.9825 20.313 52.6107L21.1324 54.4386L21.1465 54.4527ZM29.6344 51.1469C31.0797 50.6592 32.5251 50.2277 33.9986 49.8244L33.4458 47.8989C31.9582 48.3162 30.4707 48.7616 28.9974 49.2493L29.6344 51.1469ZM38.4195 48.6986C39.9073 48.3656 41.3952 48.0606 42.8972 47.7977L42.5408 45.8166C41.0107 46.0793 39.4948 46.3842 37.9649 46.7312L38.4195 48.6986ZM47.4036 47.1216C48.9199 46.929 50.4222 46.7786 51.9527 46.6563L51.7788 44.6615C50.2202 44.7838 48.6898 44.9342 47.1455 45.1267L47.4036 47.1216ZM56.5024 46.4156C58.019 46.3635 59.5498 46.3536 61.0666 46.3857L61.0753 44.3774C59.5164 44.3592 57.9715 44.3551 56.4128 44.4211L56.4884 46.4297L56.5024 46.4156ZM65.6314 46.5524C67.1485 46.6407 68.6656 46.7852 70.1829 46.9578L70.4022 44.9641C68.8569 44.7915 67.2977 44.6609 65.7526 44.5725L65.6315 46.5805L65.6314 46.5524ZM74.7067 47.5598C76.2101 47.8025 77.7135 48.0734 79.203 48.3863L79.591 46.4212C78.0734 46.1082 76.5278 45.8232 74.9963 45.5803L74.6927 47.5738L74.7067 47.5598ZM83.6578 49.4235C85.1335 49.8066 86.5952 50.2319 88.057 50.6852L88.6418 48.7767C87.1659 48.3093 85.648 47.8839 84.1582 47.4867L83.6578 49.4235ZM92.3866 52.1574C93.8064 52.6808 95.2405 53.2464 96.6465 53.84L97.428 51.9883C95.9938 51.3665 94.5458 50.8149 93.0978 50.2633L92.4147 52.1574L92.3866 52.1574ZM100.795 55.7471C102.159 56.4108 103.509 57.1166 104.845 57.8645L105.809 56.1116C104.445 55.3636 103.067 54.6296 101.661 53.9517L100.795 55.7471Z"
                      fill="#919191"
                    />
                    <path
                      d="M95.5845 61.1824L95.0597 59.2569L104.589 56.6842L101.292 47.336L103.186 46.681L107.205 58.0676L95.5845 61.1824Z"
                      fill="#919191"
                    />
                    <circle
                      cx="8.69433"
                      cy="59.7296"
                      r="3.91825"
                      transform="rotate(-135 8.69433 59.7296)"
                      stroke="#919191"
                      strokeWidth={2}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_625_20131">
                      <rect
                        width="76.2328"
                        height="83.6102"
                        fill="white"
                        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 113.026 54.5132)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3} md={6}>
            <Box className="tf-box-icon relative text-center">
              <Box className="image">
                <Image src="/assets/images/box-icon/icon-03.png" alt="" width={100} height={100} />
                <Typography>Step 3</Typography>
              </Box>
              <Typography variant="h4" className="heading">
                <Link href="contact-us.html">Add your NFTs</Link>
              </Typography>
              <Typography className="content">
                Suspendisse porttitor id est non accumsan. Cras vel viverra velit
              </Typography>
              <Box className="arrow">
                <svg
                  width={114}
                  height={114}
                  viewBox="0 0 114 114"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_625_20131)">
                    <path
                      d="M13.0682 58.6163C14.3723 57.8473 15.7186 57.1206 17.0509 56.436L16.1333 54.65C14.7448 55.3625 13.3845 56.1032 12.0524 56.9002L13.0683 58.6444L13.0682 58.6163ZM21.1465 54.4527C22.5352 53.8244 23.9381 53.2383 25.3551 52.6944L24.6057 50.8245C23.1607 51.3965 21.7298 51.9825 20.313 52.6107L21.1324 54.4386L21.1465 54.4527ZM29.6344 51.1469C31.0797 50.6592 32.5251 50.2277 33.9986 49.8244L33.4458 47.8989C31.9582 48.3162 30.4707 48.7616 28.9974 49.2493L29.6344 51.1469ZM38.4195 48.6986C39.9073 48.3656 41.3952 48.0606 42.8972 47.7977L42.5408 45.8166C41.0107 46.0793 39.4948 46.3842 37.9649 46.7312L38.4195 48.6986ZM47.4036 47.1216C48.9199 46.929 50.4222 46.7786 51.9527 46.6563L51.7788 44.6615C50.2202 44.7838 48.6898 44.9342 47.1455 45.1267L47.4036 47.1216ZM56.5024 46.4156C58.019 46.3635 59.5498 46.3536 61.0666 46.3857L61.0753 44.3774C59.5164 44.3592 57.9715 44.3551 56.4128 44.4211L56.4884 46.4297L56.5024 46.4156ZM65.6314 46.5524C67.1485 46.6407 68.6656 46.7852 70.1829 46.9578L70.4022 44.9641C68.8569 44.7915 67.2977 44.6609 65.7526 44.5725L65.6315 46.5805L65.6314 46.5524ZM74.7067 47.5598C76.2101 47.8025 77.7135 48.0734 79.203 48.3863L79.591 46.4212C78.0734 46.1082 76.5278 45.8232 74.9963 45.5803L74.6927 47.5738L74.7067 47.5598ZM83.6578 49.4235C85.1335 49.8066 86.5952 50.2319 88.057 50.6852L88.6418 48.7767C87.1659 48.3093 85.648 47.8839 84.1582 47.4867L83.6578 49.4235ZM92.3866 52.1574C93.8064 52.6808 95.2405 53.2464 96.6465 53.84L97.428 51.9883C95.9938 51.3665 94.5458 50.8149 93.0978 50.2633L92.4147 52.1574L92.3866 52.1574ZM100.795 55.7471C102.159 56.4108 103.509 57.1166 104.845 57.8645L105.809 56.1116C104.445 55.3636 103.067 54.6296 101.661 53.9517L100.795 55.7471Z"
                      fill="#919191"
                    />
                    <path
                      d="M95.5845 61.1824L95.0597 59.2569L104.589 56.6842L101.292 47.336L103.186 46.681L107.205 58.0676L95.5845 61.1824Z"
                      fill="#919191"
                    />
                    <circle
                      cx="8.69433"
                      cy="59.7296"
                      r="3.91825"
                      transform="rotate(-135 8.69433 59.7296)"
                      stroke="#919191"
                      strokeWidth={2}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_625_20131">
                      <rect
                        width="76.2328"
                        height="83.6102"
                        fill="white"
                        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 113.026 54.5132)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3} md={6}>
            <Box className="tf-box-icon relative text-center">
              <Box className="image">
                <Image src="/assets/images/box-icon/icon-04.png" alt="" width={100} height={100} />
                <Typography>Step 4</Typography>
              </Box>
              <Typography variant="h4" className="heading">
                <Link href="contact-us.html">Sell your NFTs</Link>
              </Typography>
              <Typography className="content">
                Maecenas non semper quam. Vivamus et arcu condimentum ipsum
                consectetur
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Createsell;

