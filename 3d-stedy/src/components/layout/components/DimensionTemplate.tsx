import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
  Paper,
  Popover,
  Tooltip,
  ClickAwayListener,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import theme from '@/themes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useBrandStore, productStore, drawerStore } from '@/store';
import { Vector3 } from 'three';
import { KitchenTemplateEntity, ProductEntity } from '@/types/model';
import { useKitchenStore } from '@/store/useKitchenStore';
import CloseIcon from '@mui/icons-material/Close';
import { useMappingStore } from '@/store/useMappingStore';
import { useMeshProductStore } from '@/store/useMeshProductStore';

const DimensionTemplate = () => {
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [loadingStep2, setLoadingStep2] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openCabinetWarning, setOpenCabinetWarning] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [hasUpdatedStep2, setHasUpdatedStep2] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { activeTemplate, setActiveTemplate } = useBrandStore();
  const { resetStore } = useMappingStore();
  const { reset: resetMeshProductStore } = useMeshProductStore();
  const {
    setBackwallDisabled,
    setKitchenDisabled,
    setGalleyislandDisabled,
    setKitchenWidth,
    setFloorDisabled,
    setFridgeCabinetWidth,
    setTallCabinetWidth,
    setKitchenCabinetWidth,
    fridgeCabinetWidth,
    tallCabinetWidth,
    kitchenCabinetWidth,
  } = useKitchenStore();
  const { toggleDrawer } = drawerStore();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { activeProduct } = productStore();
  const { updateListCart, resetColors } = productStore();
  // Khởi tạo savedCabinetValues từ store nếu có, nếu không thì dùng giá trị mặc định
  const [savedCabinetValues, setSavedCabinetValues] = useState({
    fridgeCabinet: fridgeCabinetWidth?.toString() || '600',
    tallCabinet: tallCabinetWidth?.toString() || '600',
    kitchen: kitchenCabinetWidth?.toString() || '1800'
  });

  // Thêm hàm làm tròn số
  const roundToInteger = (value: number) => {
    return Math.round(value);
  };

  // Thêm hàm xử lý input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Nếu giá trị là rỗng, đặt lại giá trị
    if (value === '') {
      formik.setFieldValue(name, ''); // Đặt lại giá trị thành rỗng
      return;
    }

    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      const roundedValue = roundToInteger(numericValue);
      formik.setFieldValue(name, roundedValue);
      if (name !== 'width') {
        setSavedCabinetValues(prev => ({
          ...prev,
          [name]: roundedValue.toString()
        }));
      }
    } else {
      // Nếu giá trị không phải là số, không làm gì cả
      formik.setFieldValue(name, value); // Đặt giá trị hiện tại
    }
  };

  const validationSchema = Yup.object().shape({
    width: Yup.number()
      .required('Width is required')
      .min(3000, 'Width must be at least 3000mm')
      .max(5700, 'Width cannot exceed 5700mm'),
    fridgeCabinet: Yup.number()
      .required('Fridge Cabinet width is required')
      .min(600, 'Width must be at least 600mm')
      .max(1200, 'Fridge Cabinet width cannot exceed 1200mm'),
    tallCabinet: Yup.number()
      .required('Tall Cabinet width is required')
      .min(600, 'Width must be at least 600mm')
      .max(1200, 'Tall Cabinet width cannot exceed 1200mm'),
    kitchen: Yup.number()
      .required('Kitchen width is required')
      .min(1800, 'Kitchen width must be at least 1800mm')
      .max(3300, 'Kitchen width cannot exceed 3300mm'),
  });

  const formik = useFormik({
    initialValues: {
      width: activeTemplate?.kitchenSize?.x || '',
      fridgeCabinet: fridgeCabinetWidth || 600,
      tallCabinet: tallCabinetWidth || 600, 
      kitchen: kitchenCabinetWidth || 1800,
    },
    validationSchema,
    onSubmit: () => {}, // Empty default handler
  });

  useEffect(() => {
    // Chỉ set giá trị width từ activeTemplate
    if (activeTemplate?.kitchenSize?.x) {
      const totalWidth = roundToInteger(activeTemplate.kitchenSize.x);
      setCurrentWidth(totalWidth);
      formik.setFieldValue('width', totalWidth);
    }

    // Set giá trị cabinet từ store nếu có
    if (fridgeCabinetWidth && tallCabinetWidth && kitchenCabinetWidth) {
      formik.setFieldValue('fridgeCabinet', fridgeCabinetWidth);
      formik.setFieldValue('tallCabinet', tallCabinetWidth);
      formik.setFieldValue('kitchen', kitchenCabinetWidth);

      setSavedCabinetValues({
        fridgeCabinet: fridgeCabinetWidth.toString(),
        tallCabinet: tallCabinetWidth.toString(),
        kitchen: kitchenCabinetWidth.toString()
      });
    }
  }, [activeTemplate, fridgeCabinetWidth, tallCabinetWidth, kitchenCabinetWidth]);

  const handleTotalWidthUpdate = () => {
    const width = roundToInteger(Number(formik.values.width));
    setCurrentWidth(width);
    setOpenWarning(true);
  };

  const handleConfirmUpdate = () => {
    setLoadingStep1(true);
    setBackwallDisabled(true);
    setKitchenDisabled(true);
    setGalleyislandDisabled(true);
    setFloorDisabled(true);
    setKitchenWidth(currentWidth);
    formik.setFieldValue('width', currentWidth);
    productStore.getState().resetColors();
    setHasUpdatedStep2(false);
    resetStore();
    resetMeshProductStore();

    // Tính toán kích thước cabinet khi update Step 1
    let kitchenWidth: number = 0;
    let fridgeCabinetWidth: number = 0;
    let tallCabinetWidth: number = 0;

    if (currentWidth >= 3000 && currentWidth <= 4000) {
      fridgeCabinetWidth = 600;
      tallCabinetWidth = 600;
      kitchenWidth = currentWidth - (fridgeCabinetWidth + tallCabinetWidth);
    } else if (currentWidth > 4000) {
      kitchenWidth = Math.min(3300, Math.round(currentWidth * 0.7));
      const remainingWidth = currentWidth - kitchenWidth;
      
      fridgeCabinetWidth = Math.round(remainingWidth * 0.5);
      tallCabinetWidth = remainingWidth - fridgeCabinetWidth;

      if (fridgeCabinetWidth < 600) {
        fridgeCabinetWidth = 600;
        tallCabinetWidth = remainingWidth - fridgeCabinetWidth;
      }
      if (tallCabinetWidth < 600) {
        tallCabinetWidth = 600;
        fridgeCabinetWidth = remainingWidth - tallCabinetWidth;
      }
      
      fridgeCabinetWidth = Math.min(Math.max(600, fridgeCabinetWidth), 1200);
      tallCabinetWidth = Math.min(Math.max(600, tallCabinetWidth), 1200);
    }

    // Update form values và store
    formik.setFieldValue('fridgeCabinet', fridgeCabinetWidth);
    formik.setFieldValue('tallCabinet', tallCabinetWidth);
    formik.setFieldValue('kitchen', kitchenWidth);

    setFridgeCabinetWidth(fridgeCabinetWidth);
    setTallCabinetWidth(tallCabinetWidth);
    setKitchenCabinetWidth(kitchenWidth);

    setSavedCabinetValues({
      fridgeCabinet: fridgeCabinetWidth.toString(),
      tallCabinet: tallCabinetWidth.toString(),
      kitchen: kitchenWidth.toString()
    });

    const isLargeKitchen = currentWidth >= 4000;
    const paths = {
      islandPath: isLargeKitchen
        ? 'Intero/GalleyTemplateB/Galley_Island'
        : 'Intero/GalleyTemplateA/Galley_Island',
      kitchenPath: isLargeKitchen
        ? 'Intero/GalleyTemplateB/Galley_Kitchen'
        : 'Intero/GalleyTemplateA/Galley_Kitchen',
      floorPath: isLargeKitchen
        ? 'Intero/GalleyTemplateA/Floor/Tiles_Chevron'
        : 'Intero/GalleyTemplateA/Floor/Tiles_Chevron',
    };

    const updatedTemplate: KitchenTemplateEntity = {
      id: activeTemplate?.id || '',
      tenantId: activeTemplate?.tenantId || '',
      name: activeTemplate?.name || '',
      description: activeTemplate?.description ?? null,
      thumbnail: activeTemplate?.thumbnail || '',
      kitchenPath: paths.kitchenPath,
      islandPath: paths.islandPath,
      floorPath: paths.floorPath,
      defaultSize: activeTemplate?.defaultSize || { d: 0, h: 0, w: 0 },
      kitchenSize: new Vector3(
        currentWidth,
        activeTemplate?.defaultSize?.h || 0,
        activeTemplate?.defaultSize?.d || 0
      ),
      products: activeTemplate?.products || [],
    };

    setActiveTemplate(updatedTemplate);
    const templateAsProduct: ProductEntity = {
      id: activeTemplate?.id ? Number(activeTemplate.id) : 0,
      code: activeTemplate?.id || '',
      name: activeTemplate?.name || '',
      brandName: null,
      path: paths.kitchenPath,
      defaultSize: activeTemplate?.defaultSize || { d: 0, h: 0, w: 0 },
      price: 0,
      thumbnail: activeTemplate?.thumbnail || '',
      categoryId: 'template',
      enable: true,
      serieIds: [],
      storeIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: null,
      deletedAt: null,
      description: activeTemplate?.description ?? null,
      position: '0',
      moduleType: 'template',
      availableSizes: [],
      note: null,
      type: 'kitchen',
    };
    updateListCart(templateAsProduct);
    setOpenWarning(false);

    setTimeout(() => {
      setLoadingStep1(false);
      toggleDrawer();
    }, 2000);
  };

  const handleCabinetUpdate = () => {
    setOpenCabinetWarning(true);
  };

  const handleConfirmCabinetUpdate = () => {
    setLoadingStep2(true);
    setBackwallDisabled(true);
    setKitchenDisabled(true);
    setGalleyislandDisabled(true);
    setFloorDisabled(true);
    productStore.getState().resetColors();
    setHasUpdatedStep2(true);
    resetStore();
    resetMeshProductStore();

    const fridgeCabinetWidth = roundToInteger(
      Number(formik.values.fridgeCabinet)
    );
    const tallCabinetWidth = roundToInteger(Number(formik.values.tallCabinet));
    const kitchenWidth = roundToInteger(Number(formik.values.kitchen));

    // Save cabinet dimensions to store and state
    setFridgeCabinetWidth(fridgeCabinetWidth);
    setTallCabinetWidth(tallCabinetWidth);
    setKitchenCabinetWidth(kitchenWidth);
    setSavedCabinetValues({
      fridgeCabinet: fridgeCabinetWidth.toString(),
      tallCabinet: tallCabinetWidth.toString(),
      kitchen: kitchenWidth.toString()
    });

    // Update rounded values back to form
    formik.setFieldValue('fridgeCabinet', fridgeCabinetWidth);
    formik.setFieldValue('tallCabinet', tallCabinetWidth);
    formik.setFieldValue('kitchen', kitchenWidth);

    const totalWidth = fridgeCabinetWidth + tallCabinetWidth + kitchenWidth;
    setKitchenWidth(totalWidth);

    // Update Total Kitchen Dimension field
    formik.setFieldValue('width', totalWidth);

    const isLargeKitchen = totalWidth >= 4000;
    const paths = {
      islandPath: isLargeKitchen
        ? 'Intero/GalleyTemplateB/Galley_Island'
        : 'Intero/GalleyTemplateA/Galley_Island',
      kitchenPath: isLargeKitchen
        ? 'Intero/GalleyTemplateB/Galley_Kitchen'
        : 'Intero/GalleyTemplateA/Galley_Kitchen',
      floorPath: isLargeKitchen
        ? 'Intero/GalleyTemplateA/Floor/Tiles_Chevron'
        : 'Intero/GalleyTemplateA/Floor/Tiles_Chevron',
    };

    const updatedTemplate: KitchenTemplateEntity = {
      id: activeTemplate?.id || '',
      tenantId: activeTemplate?.tenantId || '',
      name: activeTemplate?.name || '',
      description: activeTemplate?.description ?? null,
      thumbnail: activeTemplate?.thumbnail || '',
      kitchenPath: paths.kitchenPath,
      islandPath: paths.islandPath,
      floorPath: paths.floorPath,
      defaultSize: activeTemplate?.defaultSize || { d: 0, h: 0, w: 0 },
      kitchenSize: new Vector3(
        totalWidth,
        activeTemplate?.defaultSize?.h || 0,
        activeTemplate?.defaultSize?.d || 0
      ),
      products: activeTemplate?.products || [],
    };

    setActiveTemplate(updatedTemplate);
    setOpenCabinetWarning(false);

    setTimeout(() => {
      setLoadingStep2(false);
      toggleDrawer();
    }, 2000);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  const handleTooltipOpen = () => {
    if (formik.errors.width) {
      setShowTooltip(true);
    }
  };

  // Thêm hàm kiểm tra để disable input
  const isInputDisabled = () => {
    return false;
  };

  // Thêm hàm để lấy range text dựa vào total width
  const getCabinetRangeText = (type: 'fridge' | 'tall') => {
    return type === 'fridge' ? '600mm - 1200mm' : '600mm - 1200mm';
  };

  return (
    <Box sx={{ padding: isMobile ? '0px' : '20px' }}>
      <Box sx={{ padding: isMobile ? '4px 0px 40px' : '4px 32px 40px' }}>
        {/* Total Kitchen Dimension Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
          Step 1: Kitchen Dimension
          </Typography>
          <Grid container spacing={2} size={12}>
            <Grid
              size={{ mobile: 12, tablet: 4, desktop: 6 }}
              textAlign={isMobile ? 'start' : 'end'}
            >
              <Typography fontWeight="bold">Total Kitchen Dimension</Typography>
              <Typography fontSize="13px">millimetres (mm)</Typography>
            </Grid>

            <Grid
              size={{ mobile: 12, tablet: 4, desktop: 3 }}
              textAlign="start"
            >
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  open={showTooltip && Boolean(formik.errors.width)}
                  onClose={handleTooltipClose}
                  title={
                    <Box sx={{ position: 'relative', p: 1, minWidth: '200px' }}>
                      <Typography sx={{ fontSize: '14px' }}>
                        {formik.errors.width}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={handleTooltipClose}
                        sx={{
                          position: 'absolute',
                          right: -8,
                          top: 4,
                          color: '#fff',
                          '&:hover': {
                            color: '#fff',
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                  placement="bottom-start"
                  sx={{
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '& .MuiTooltip-tooltip': {
                      backgroundColor: '#fff',
                      color: '#666',
                      maxWidth: '300px',
                      p: 2,
                    },
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    name="width"
                    fullWidth
                    value={formik.values.width}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    onClick={handleTooltipOpen}
                    error={formik.touched.width && Boolean(formik.errors.width)}
                  />
                </Tooltip>
              </ClickAwayListener>
              <Typography
                fontSize="11px"
                sx={{
                  mt: 1,
                }}
              >
                3000mm - 5700mm
              </Typography>
            </Grid>

            <Grid size={{ mobile: 12, tablet: 4, desktop: 3 }}>
              <Button
                sx={{
                  minHeight: '32px',
                  backgroundColor: '#070707',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                }}
                variant="contained"
                fullWidth
                onClick={handleTotalWidthUpdate}
                color="primary"
                disabled={!formik.values.width || Boolean(formik.errors.width)}
              >
                {loadingStep1 ? (
                  <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                ) : (
                  'UPDATE'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Cabinet Dimensions Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
          Step 2: Custom Cabinet Dimensions
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: '4px',
            }}
            size={12}
          >
            {/* Left Column: Fridge Cabinet and Tall Cabinet */}
            <Grid size={{ mobile: 12, tablet: 6, desktop: 6 }}>
              {/* Fridge Cabinet */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 3,
                }}
              >
                <img
                  src={'/icons/dimension/fridge_abinet.svg'}
                  alt={'Fridge Cabinet'}
                  style={{ height: '120px' }}
                />
                <Box>
                  <Typography fontWeight="bold">Fridge Cabinet</Typography>
                  <TextField
                    variant="outlined"
                    sx={{ width: '140px', my: 1 }}
                    size="small"
                    name="fridgeCabinet"
                    value={formik.values.fridgeCabinet}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.fridgeCabinet &&
                      Boolean(formik.errors.fridgeCabinet)
                    }
                    helperText={
                      formik.touched.fridgeCabinet &&
                      formik.errors.fridgeCabinet
                    }
                    disabled={isInputDisabled()}
                  />
                  <Typography fontSize="11px">millimetres (mm)</Typography>
                  <Typography fontSize="11px" sx={{ mt: 0.5 }}>
                    {getCabinetRangeText('fridge')}
                  </Typography>
                </Box>
              </Box>

              {/* Tall Cabinet */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <img
                  src={'/icons/dimension/tall_cabinet.svg'}
                  alt={'Tall Cabinet'}
                  style={{ height: '120px' }}
                />
                <Box>
                  <Typography fontWeight="bold">Tall Cabinet</Typography>
                  <TextField
                    variant="outlined"
                    sx={{ width: '140px', my: 1 }}
                    size="small"
                    name="tallCabinet"
                    value={formik.values.tallCabinet}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.tallCabinet &&
                      Boolean(formik.errors.tallCabinet)
                    }
                    helperText={
                      formik.touched.tallCabinet && formik.errors.tallCabinet
                    }
                    disabled={isInputDisabled()}
                  />
                  <Typography fontSize="11px">millimetres (mm)</Typography>
                  <Typography fontSize="11px" sx={{ mt: 0.5 }}>
                    {getCabinetRangeText('tall')}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column: Kitchen */}
            <Grid size={{ mobile: 12, tablet: 6, desktop: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <img
                  src={'/icons/dimension/kitchen.svg'}
                  alt={'Kitchen'}
                  style={{ height: '120px' }}
                />
                <Box>
                  <Typography fontWeight="bold">Kitchen</Typography>
                  <TextField
                    variant="outlined"
                    sx={{ width: '140px', my: 1 }}
                    size="small"
                    name="kitchen"
                    value={formik.values.kitchen}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.kitchen && Boolean(formik.errors.kitchen)
                    }
                    helperText={formik.touched.kitchen && formik.errors.kitchen}
                  />
                  <Typography fontSize="11px">millimetres (mm)</Typography>
                  <Typography fontSize="11px" sx={{ mt: 0.5 }}>
                    1800mm - 3300mm
                  </Typography>
                </Box>
              </Box>
           
            </Grid>
            <Grid size={12} sx={{ mr: isMobile ? 0 : 0 , display: 'flex', justifyContent: 'center' }}>
                <Button
                  sx={{
                    minHeight: '38px',
                    backgroundColor: '#070707',
                    fontWeight: 'bold',
                    width: isMobile ? '47%' : '47%',
                    letterSpacing: '1px',
                    maxWidth: isMobile ? 'unset' : '124px',
                    fontSize: '0.875rem',
                    
                  }}
                  variant="contained"
                  onClick={handleCabinetUpdate}
                  color="primary"
                  disabled={
                    !formik.values.fridgeCabinet ||
                    !formik.values.tallCabinet ||
                    !formik.values.kitchen ||
                    Boolean(formik.errors.fridgeCabinet) ||
                    Boolean(formik.errors.tallCabinet) ||
                    Boolean(formik.errors.kitchen) || !!activeProduct
                  }
                >
                  {loadingStep2 ? (
                    <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                  ) : (
                    'UPDATE'
                  )}
                </Button>
              </Grid>
            <Box>
            <Typography variant="h6" sx={{ marginTop: '32px' }}>
            Step 3: Replace components & change colors/materials
          </Typography>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={openWarning}
        onClose={() => setOpenWarning(false)}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%',
          },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Warning
          </Typography>
          <Typography sx={{ mb: 3 }}>
            This action will:
            <br />• Reset all custom dimension of the Fridge Cabinet, Kitchen Cabinet and Tall Cabinet.
            <br />• Reset all component selection to default.
            <br />•{' '}
            {currentWidth >= 4000
              ? 'Change from double door to single door of Kitchen Cabinet'
              : 'Change from single door to double door of Kitchen Cabinet'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenWarning(false)}
              sx={{
                borderColor: '#070707',
                color: '#070707',
                '&:hover': {
                  borderColor: '#070707',
                  backgroundColor: 'rgba(7, 7, 7, 0.04)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmUpdate}
              sx={{
                backgroundColor: '#070707',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openCabinetWarning}
        onClose={() => setOpenCabinetWarning(false)}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%',
          },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Warning
          </Typography>
          <Typography sx={{ mb: 3 }}>
            This action will:
            <br />• Update the total kitchen dimension based on cabinet
            dimensions
            {kitchenCabinetWidth !== Number(formik.values.kitchen) && (
              <>
                <br />•{' '}
                {Number(formik.values.fridgeCabinet) +
                  Number(formik.values.tallCabinet) +
                  Number(formik.values.kitchen) >=
                4000
                  ? 'Change from double door to single door of Kitchen Cabinet'
                  : 'Change from single door to double door of Kitchen Cabinet'}
              </>
            )}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenCabinetWarning(false)}
              sx={{
                borderColor: '#070707',
                color: '#070707',
                '&:hover': {
                  borderColor: '#070707',
                  backgroundColor: 'rgba(7, 7, 7, 0.04)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmCabinetUpdate}
              sx={{
                backgroundColor: '#070707',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DimensionTemplate;
