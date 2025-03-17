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
import { formatInputCurrency } from '@/utils/currency';
import { getCurrentDate } from '@/utils/helper';
import { StyleEntity } from '@/types/model';
import Logo from '/stores/logo.png';

interface OldLayoutCartProps {
  title: string;
  captureBase64String: string | null;
  listCart: any[];
  cabinetColor: any;
  benchtopColor: any;
  activeStore: any;
  dataStyle: StyleEntity[];
  activeSeries: any;
}

export const OldLayoutCart = ({
  title,
  captureBase64String,
  listCart,
  cabinetColor,
  benchtopColor,
  activeStore,
  dataStyle,
  activeSeries,
}: OldLayoutCartProps): JSX.Element => {
  const filteredDataStyles = activeSeries?.id
    ? dataStyle?.filter((p) => p.serieIds?.includes(activeSeries.id))
    : dataStyle;

  const _cabinetColor = () => {
    let color = cabinetColor?.name;
    if (!color) {
      filteredDataStyles?.forEach((style: StyleEntity) => {
        if (style.type?.toLowerCase() === 'cabinet' && style.default) {
          color = style.name;
        }
      });
    }
    return color;
  };

  const _benchtopColor = () => {
    let color = benchtopColor?.name;
    if (!color) {
      filteredDataStyles?.forEach((style: StyleEntity) => {
        if (style.type?.toLowerCase() === 'benchtop' && style.default) {
          color = style.name;
        }
      });
    }
    return color;
  };

  return (
    <Box
      sx={{
        padding: '0px 20px',
        height: 'calc(100vh - 55px)',
        boxSizing: 'border-box',
        overflow: 'scroll',
        paddingBottom: '70px',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Grid2 container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid2 size={4}>
          <Box>
            <img
              src={activeStore?.tenant.thumbnail ?? Logo}
              alt={activeStore?.tenant.name}
              style={{
                marginTop: '0px',
                marginBottom: '20px',
                width: '140px',
              }}
            />
            {(activeStore?.tenant.description ?? '')
              .replace(/\\n/g, '\n')
              .split('\n')
              .map((str: string) => (
                <Typography
                  key={str}
                  sx={{
                    color: 'black',
                    fontSize: '0.83rem',
                    fontWeight: '600',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {str}
                </Typography>
              ))}
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <img
            src={captureBase64String || undefined}
            style={{
              width: '100%',
              height: 'auto',
              margin: 'auto',
              left: '0',
              right: '0',
              top: '0',
              objectFit: 'contain',
              bottom: '0%',
            }}
          />
        </Grid2>
      </Grid2>
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
            fontSize: '1.5rem',
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

      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            td: { borderBottom: '1px solid #BABABA !important' },
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow
              sx={{
                th: {
                  fontSize: '18px',
                  fontWeight: '500',
                  background: '#DDDDDD',
                },
              }}
            >
              <TableCell sx={{ width: '300px' }}>Name</TableCell>
              <TableCell align="left">Product Code</TableCell>
              <TableCell align="left">SKU</TableCell>
              <TableCell align="left">Cabinet Color</TableCell>
              <TableCell align="left">Benchtop Color</TableCell>
              {activeStore?.tenant.settings.showPrice && (
                <TableCell align="right">Price</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {listCart.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  td: {
                    fontSize: '16px',
                    fontWeight: '600',
                    padding: '20px 16px !important',
                  },
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align="left">{row.code ?? ''}</TableCell>
                <TableCell align="left">{row.SKU ?? ''}</TableCell>
                <TableCell align="left">{_cabinetColor()}</TableCell>
                <TableCell align="left">{_benchtopColor()}</TableCell>
                {activeStore?.tenant.settings.showPrice && (
                  <TableCell align="right" sx={{ fontWeight: '600' }}>
                    {formatInputCurrency((row.price ?? '0').toString(), '$', false)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 