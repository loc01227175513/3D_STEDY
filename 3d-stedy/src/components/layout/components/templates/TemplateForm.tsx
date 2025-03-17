import { useBrandStore, drawerStore } from '@/store';
import { productStore } from '@/store';
import { useKitchenStore } from '@/store/useKitchenStore';
import { useMappingStore } from '@/store/useMappingStore';
import { useMeshProductStore } from '@/store/useMeshProductStore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { KitchenTemplateEntity, ProductEntity } from '@/types/model';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Vector3 } from 'three';
import theme from '@/themes';

interface TemplateFormProps {
  template?: KitchenTemplateEntity;
  handleBack: (value: number) => void;
}

const TemplateForm = ({ template, handleBack }: TemplateFormProps) => {
  const { setShowTemplateModal, setActiveTemplate } = useBrandStore();
  const { toggleDrawer } = drawerStore();
  const { updateListCart, resetColors } = productStore();
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
  } = useKitchenStore();

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const validationSchema = Yup.object().shape({
    width: Yup.number()
      .required('Width is required')
      .min(3000, 'Width must be at least 3000mm')
      .max(5700, 'Width cannot exceed 5700mm'),
  });

  const formik = useFormik({
    initialValues: { width: '' },
    validationSchema,
    onSubmit: (values) => {
      // Reset state trước khi set template mới
      resetColors();
      resetStore();
      resetMeshProductStore();
      const width = Math.round(Number(values.width));
      setKitchenWidth(width);
      setActiveTemplate(null);
      setBackwallDisabled(true);
      setKitchenDisabled(true);
      setGalleyislandDisabled(true);
      setFloorDisabled(true);

      // Tính toán kích thước cabinet khi tạo template mới
      let kitchenWidth: number = 0;
      let fridgeCabinetWidth: number = 0;
      let tallCabinetWidth: number = 0;

      if (width >= 3000 && width <= 4000) {
        fridgeCabinetWidth = 600;
        tallCabinetWidth = 600;
        kitchenWidth = width - (fridgeCabinetWidth + tallCabinetWidth);
      } else if (width > 4000) {
        kitchenWidth = Math.min(3300, Math.round(width * 0.7));
        const remainingWidth = width - kitchenWidth;
        
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

      // Update store values
      setFridgeCabinetWidth(fridgeCabinetWidth);
      setTallCabinetWidth(tallCabinetWidth);
      setKitchenCabinetWidth(kitchenWidth);

      // Đợi một chút để state được reset
      setTimeout(() => {
        setShowTemplateModal(false);
        toggleDrawer();
        const isLargeKitchen = Number(values.width) >= 4000;
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
          id: template?.id || '',
          tenantId: template?.tenantId || '',
          name: template?.name || '',
          description: template?.description ?? null,
          thumbnail: template?.thumbnail || '',
          kitchenPath: paths.kitchenPath,
          islandPath: paths.islandPath,
          floorPath: paths.floorPath,
          defaultSize: template?.defaultSize || { d: 0, h: 0, w: 0 },
          kitchenSize: new Vector3(
            Number(values.width),
            template?.defaultSize?.h || 0,
            template?.defaultSize?.d || 0
          ),
          products: template?.products || [],
        };

        setActiveTemplate(updatedTemplate);

        // Convert template to product format
        const templateAsProduct: ProductEntity = {
          id: template?.id ? Number(template.id) : 0,
          code: template?.id || '',
          name: template?.name || '',
          brandName: null,
          path: paths.kitchenPath,
          defaultSize: template?.defaultSize || { d: 0, h: 0, w: 0 },
          price: 0,
          thumbnail: template?.thumbnail || '',
          categoryId: 'template',
          enable: true,
          serieIds: [],
          storeIds: [],
          createdAt: new Date().toISOString(),
          updatedAt: null,
          deletedAt: null,
          description: template?.description ?? null,
          position: '0',
          moduleType: 'template',
          availableSizes: [],
          note: null,
          type: 'kitchen',
        };

        updateListCart(templateAsProduct);
      }, 100);
    },
  });

  return (
    <Box
      sx={{
        padding: '6px',
        marginLeft: '14px',
        ...(isMobile
          ? {
              height: '500px',
            }
          : {}),
      }}
    >
      <Typography
        onClick={() => handleBack(0)}
        sx={{
          fontSize: '33px',
          textTransform: 'uppercase',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          cursor: 'pointer',
        }}
      >
        <ChevronLeftIcon sx={arrowIconStyles} />
        {template?.name}
      </Typography>

      <Box
        sx={{
          display: isMobile ? 'block' : 'flex',
          alignItems: 'flex-start',
          gap: '24px',
          marginTop: '50px',
          marginBottom: '112px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            ...(isMobile ? { textAlign: 'center' } : {}),
          }}
        >
          <img
            src={
              template?.thumbnail
                ? `/${template?.thumbnail}`
                : `/icons/${template?.id}.svg`
            }
            style={styleImageTemplate}
            width={isMobile ? '150px' : '190px'}
            alt={template?.name || 'Template Image'}
          />

          {/* <Typography
            fontWeight="400"
            fontSize="13px"
            color="#DB2727"
            textTransform="uppercase"
            position="absolute"
            bottom="10px"
            width="100%"
            textAlign="center"
          >
            width
          </Typography> */}
        </Box>

        <Box sx={{ marginTop: isMobile ? '20px' : 'unset' }}>
          <Typography fontWeight={700} fontSize={isMobile ? '12px' : '15px'}>
            Please enter your desired kitchen dimensions
          </Typography>
          <Typography
            fontWeight={400}
            sx={{
              color:
                formik.errors.width && formik.touched.width ? 'red' : 'black',
            }}
            fontSize="13px"
            marginBottom="18px"
          >
            (min 3000mm to max 5700mm)
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'unset',
              }}
            >
              WIDTH
              <Box>
                <TextField
                  id="width"
                  name="width"
                  size="small"
                  sx={customInputFieldsWidth}
                  autoComplete="off"
                  variant="outlined"
                  value={formik.values.width}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.width && Boolean(formik.errors.width)}
                  // helperText={formik.touched.width && formik.errors.width}
                />
              </Box>
              (mm)
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={customInputNext}
              size="small"
              style={{
                ...(isMobile
                  ? { position: 'unset', marginTop: '20px' }
                  : {
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)',
                    }),
              }}
              disabled={!formik.isValid}
            >
              Next
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateForm;

const customInputNext = {
  backgroundColor: '#070707',
  color: 'white',
  fontWeight: 700,
  fontSize: '21px',
  display: 'block',
  minWidth: '148px',
  margin: 'auto',
  bottom: '9px',
  boxShadow: 'unset',
  right: '-38px',
};

const customInputFieldsWidth = {
  '&.MuiTextField-root': {
    '& .MuiInputLabel-outlined': {
      color: '#222222',
    },
    '& .MuiInputBase-inputSizeSmall': {
      color: '#222222',
      backgroundColor: '#E6E6E6B5',
      borderRadius: '4px',
      width: '110px',
      textAlign: 'end',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      color: '#222222',
      borderColor: '#ffffff',
      borderWidth: '1px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
    '& .MuiFormHelperText-contained': {
      color: 'error.main',
      margin: 0,
    },
  },
};

const styleImageTemplate = {
  border: '1px solid white',
  borderRadius: '10px',
};

const arrowIconStyles = {
  background: 'black',
  width: '26px',
  height: '26px',
  borderRadius: '50px',
  color: 'white',
};
