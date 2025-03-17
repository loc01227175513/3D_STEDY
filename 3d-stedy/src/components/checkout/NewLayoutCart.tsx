import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { productStore, useBrandStore, useStyleStore } from '@/store';
import { formatInputCurrency } from '@/utils/currency';
import { getCurrentDate } from '@/utils/helper';
import { StyleEntity } from '@/types/model';
import Logo from '/stores/logo.png';
import { emitter, THREE_EVENTS } from '@/utils/events';

interface NewLayoutCartProps {
  captureBase64String: string | null;
  captureBase64StringIsland: string | null;
  listCart: any[];
  cabinetColor: any;
  benchtopColor: any;
  activeStore: any;
  dataStyle: StyleEntity[];
  activeSeries: any;
}

export const NewLayoutCart = ({
  captureBase64String,
  captureBase64StringIsland,
  listCart,
  cabinetColor,
  benchtopColor,
  activeStore,
  dataStyle,
  activeSeries,
}: NewLayoutCartProps): JSX.Element => {
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

  const renderTable = (items: any[], image: string | null,title: string ) => {
    const filteredItems = items.filter(item => {
      const path = item.path?.toLowerCase() || '';
      if (title.includes('ISLAND')) {
        emitter.emit(THREE_EVENTS.updateDimensions, {});
        return path.includes('/island/');
      } else {
        emitter.emit(THREE_EVENTS.updateDimensions, {});
        return path.includes('/kitchen/');
      }
    });
    
    return (
      <Box sx={{
    marginBottom: '34px',
      }}>
        <Box  sx={{ width: '100%'  , height: 'auto' }}>
         
          {image && (
            // <Box sx={{ width: '100%'   }}>
              <img 
                src={image} 
                alt={title}
                style={{
                  width: '100%',
                  height: '600px',
                  margin: '20px',
                  
                  top: '0',
                  objectFit: 'cover',
              
                }}
              />
            // </Box>
          )}
           <Typography sx={{ 
            fontSize: '16px',
            fontWeight: 500,
            marginBottom: '10px',
            color: '#333'
          }}>
            {title}
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
                    fontSize: '14px',
                    fontWeight: '500',
                    background: '#DDDDDD',
                    padding: '12px 16px',
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
              {filteredItems.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    td: {
                      fontSize: '14px',
                      padding: '12px 16px',
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

  return (
    <Box
      sx={{
        padding: '20px',
        height: 'calc(100vh - 55px)',
        boxSizing: 'border-box',
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Company Info */}
      <Box sx={{ marginBottom: '30px' }}>
        <img
          src={activeStore?.tenant.thumbnail ?? Logo}
          alt={activeStore?.tenant.name}
          style={{ height: '40px', marginBottom: '10px' }}
        />
        {activeStore?.tenant.description?.split('\\n').map((line: string, index: number) => (
          <Typography
            key={index}
            sx={{
              fontSize: '14px',
              color: '#666',
              marginTop: index > 0 ? '5px' : 0
            }}
          >
            {line}
          </Typography>
        ))}
      </Box>

      {/* Date */}
      <Box sx={{ 
        textAlign: 'right',
        marginBottom: '20px'
      }}>
        <Typography sx={{ 
          fontSize: '14px',
          color: '#666'
        }}>
          Date: {getCurrentDate()}
        </Typography>
      </Box>

      {/* Kitchen Section */}
      {renderTable(
        listCart,
      
        captureBase64String,
        'YOUR ITEMS\n KITCHEN',
      )}

      {/* Island Section */}
      {renderTable(
        listCart,
      
        captureBase64StringIsland,
        'YOUR ITEMS\n ISLAND'
      )}
    </Box>
  );
}; 