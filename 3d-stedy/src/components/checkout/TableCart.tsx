import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid2,
} from '@mui/material';
import { productStore, useBrandStore, useStyleStore } from '@/store';
import { formatInputCurrency } from '@/utils/currency';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import { getCurrentDate } from '@/utils/helper';
import { StyleEntity } from '@/types/model';
import Logo from '/stores/logo.png';
import { NewLayoutCart } from './NewLayoutCart';
import { OldLayoutCart } from './OldLayoutCart';
import { useLocation } from 'react-router-dom';

interface TableCartProps {
  title: string;
}

export default function TableCart({ title }: TableCartProps): JSX.Element {
  const { listCart, cabinetColor, benchtopColor } = productStore();
  const { captureBase64String, captureBase64StringIsland } =
    use3DCaptureStore();
  const { activeStore } = useBrandStore();
  const { dataStyle } = useStyleStore();
  const { activeSeries } = useBrandStore();
  const location = useLocation();

  // Check if URL contains 'intero'
  const isInteroLayout = location.pathname.includes('intero');

  return isInteroLayout ? (
    <NewLayoutCart
      captureBase64String={captureBase64String}
      captureBase64StringIsland={captureBase64StringIsland}
      listCart={listCart}
      cabinetColor={cabinetColor}
      benchtopColor={benchtopColor}
      activeStore={activeStore}
      dataStyle={dataStyle ?? []}
      activeSeries={activeSeries}
    />
  ) : (
    <OldLayoutCart
      title={title}
      captureBase64String={captureBase64String}
      listCart={listCart}
      cabinetColor={cabinetColor}
      benchtopColor={benchtopColor}
      activeStore={activeStore}
      dataStyle={dataStyle ?? []}
      activeSeries={activeSeries}
    />
  );
}

export function ListCard({ title }: TableCartProps): JSX.Element {
  const { listCart } = productStore();
  const { activeStore } = useBrandStore();
  const { captureBase64String: base64String, captureBase64StringIsland } =
    use3DCaptureStore();
  return (
    <Box sx={{ padding: '8px 16px', height: '100%', boxSizing: 'border-box' }}>
      <Box>
        <img
          src={activeStore?.tenant.thumbnail ?? Logo}
          alt={activeStore?.tenant.name}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            width: '140px',
          }}
        />
        {(activeStore?.tenant.description ?? '')
          .replace(/\\n/g, '\n')
          .split('\n')
          .map((str) => (
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '600',
                whiteSpace: 'pre-line',
              }}
            >
              {str}
            </Typography>
          ))}
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <img
          src={base64String}
          style={{
            width: '100%',
            height: 'auto',
            margin: 'auto !important',
            marginTop: 'auto !important',
          }}
        />
        {captureBase64StringIsland && captureBase64StringIsland != '' && (
          <>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '600',
                whiteSpace: 'pre-line',
              }}
            >
              ISLAND
            </Typography>
            <img
              src={captureBase64StringIsland}
              style={{
                width: '100%',
                height: 'auto',
                margin: 'auto !important',
                marginTop: 'auto !important',
              }}
            />
          </>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography
          sx={{
            color: 'black',
            fontSize: '24px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'black',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Date: {getCurrentDate()}
        </Typography>
      </Box>
      {listCart.map((row, index) => (
        <Box
          key={index}
          sx={{
            p: {
              color: 'black',
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '10px',
            },
            marginTop: '30px !important',
            marginBottom: '10px !important',
          }}
        >
          <Typography
            sx={{
              color: 'black',
              fontWeight: '600',
            }}
          >
            {row.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '5px',
              alignItems: 'end',
            }}
          >
            <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              Product Code
            </Typography>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              {row.code}
            </Typography>
          </Box>
          {activeStore != null &&
            activeStore.tenant.settings.showPrice == true && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '5px',
                  alignItems: 'end',
                }}
              >
                <Typography
                  sx={{
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Price
                </Typography>
                <Typography
                  sx={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {formatInputCurrency(
                    (row.price ?? '0').toString(),
                    '$',
                    false
                  )}
                </Typography>
              </Box>
            )}
        </Box>
      ))}
    </Box>
  );
}
