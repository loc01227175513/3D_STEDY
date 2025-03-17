import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid2,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { boxShadowAccordion, buttonNoneForcus } from './DrawerTemplate';
import { drawerStore, productStore, useBrandStore, useStyleStore } from '@/store';
import { BpCheckbox } from './Style';
import ColorItem from './CorlorItemIndo';
import theme from '@/themes';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { DraggableColorPalette } from './ColorPalette';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { Vector3 } from 'three';
import { KitchenTemplateEntity, ProductEntity } from '@/types/model';

interface ColourTemplateProps {
  onCloseDrawer?: () => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  initialValue: string;
  value: string;
  sx?: object;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, initialValue, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== initialValue}
      {...other}
      style={{ padding: '0px !important' }}
    >
      {value === initialValue && <Box sx={{ ...sx }}>{children}</Box>}
    </div>
  );
}

const SkinTemplate = ({ onCloseDrawer }: ColourTemplateProps) => {
  const [category, setCategory] = useState<string>('basic');
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<KitchenTemplateEntity | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<KitchenTemplateEntity | null>(null);
  const { activeTemplate, setActiveTemplate } = useBrandStore();

  useEffect(() => {
    if (activeTemplate?.kitchenSize?.x) {
      const totalWidth = Math.round(activeTemplate.kitchenSize.x);
      setCurrentWidth(totalWidth);
    } else {
      console.error('Active template is not loaded');
    }
  }, [activeTemplate]);

  const handleTemplateUpdate = (type: string) => {
    const pathsBasic = {
      islandPath:
        'Intero/GalleyTemplateA/Galley_Island',
      kitchenPath:
        'Intero/GalleyTemplateA/Galley_Kitchen',
      floorPath:
        'Intero/GalleyTemplateA/Floor/Tiles_Chevron',
    };
    const pathsLuxury = {
      islandPath:
        'Intero/GalleyTemplateA/Island_Luxury',
      kitchenPath:
        'Intero/GalleyTemplateA/Kitchen_Luxury4',
      floorPath:
        'Intero/GalleyTemplateA/Floor/Tiles_Wood',
    };

    // Update the active template without calculating dimensions
    const selectedPaths = category === 'basic' ? pathsBasic : pathsLuxury;
    const updatedTemplate: KitchenTemplateEntity = {
      id: activeTemplate?.id || '',
      tenantId: activeTemplate?.tenantId || '',
      name: activeTemplate?.name || '',
      description: activeTemplate?.description ?? null,
      thumbnail: activeTemplate?.thumbnail || '',
      kitchenPath: type === 'basic' ? pathsBasic.kitchenPath : pathsLuxury.kitchenPath,
      islandPath: type === 'basic' ? pathsBasic.islandPath : pathsLuxury.islandPath,
      floorPath: type === 'basic' ? pathsBasic.floorPath : pathsLuxury.floorPath,
      defaultSize: activeTemplate?.defaultSize || { d: 0, h: 0, w: 0 },
      kitchenSize: new Vector3(
        currentWidth,
        activeTemplate?.defaultSize?.h || 0,
        activeTemplate?.defaultSize?.d || 0
      ),
      products: activeTemplate?.products || [],
    };

    setActiveTemplate(updatedTemplate);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  return (
    <Box sx={{ padding: isMobile ? '0 0 20px 0' : '20px' }}>
      <Box>
        <Tabs
          className="__tabMenuContainer"
          value={category}
          onChange={handleTabChange}
          sx={
            isMobile
              ? {
                width: '100%',
                maxWidth: '100%',
                overflowX: 'scroll',
                overflowY: 'hidden',
                minHeight: 'unset !important',
                height: 'max-content',
                justifyContent: 'start',
                borderBottom: '1px solid #ccc',
                zIndex: '-1',
                '.MuiTabs-indicator': {
                  backgroundColor: '#fafafa',
                  bottom: '-2px',
                },
                '.Mui-selected': {
                  color: 'white !important',
                  background: '#000!important',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                  overflow: 'visible',
                },
                '.MuiTabs-scroller': {
                  overflow: 'visible !important',
                },
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                button: {
                  overflow: 'visible',
                  minHeight: 'unset',
                  padding: '8px 12px',
                  minWidth: '160px',
                  border: 'none',
                  fontSize: '15px',
                  outline: 'none',
                  position: 'relative',
                },
              }
              : {
                minHeight: '34px',
                height: 'max-content',
                justifyContent: 'start',
                borderBottom: '1px solid #ccc',
                zIndex: '-1',
                overflow: 'visible',
                '.MuiTabs-indicator': {
                  backgroundColor: '#fafafa',
                  bottom: '-2px',
                },
                '.Mui-selected': {
                  color: '#222222',
                  border: '1px solid #B4B4B4',
                  borderWidth: '1px 1px 0px 1px',
                  overflow: 'visible',
                },
                '.MuiTabs-scroller': {
                  overflow: 'visible !important',
                },
                button: {
                  overflow: 'visible',
                  minHeight: 'unset',
                  padding: '8px 12px',
                  minWidth: '160px',
                  border: 'none',
                  fontSize: '15px',
                  outline: 'none',
                  position: 'relative',
                },
              }}
        >
          <Tab
            className="__tabMenu"
            disableRipple={true}
            value="basic"
            label="Signature Scheme"
          />
          <Tab disableRipple={true} value="luxury" label="Luxury Scheme" />
        </Tabs>
      </Box>

      <TabPanel initialValue="basic" value={category}>
        {category === 'basic' && (
          <Box sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6" fontWeight="medium" mb={2}>Choose a Signature Scheme</Typography>
            <Grid2 container spacing={2}>
              <Grid2>
                <Box
                  onClick={(event) => {
                    handleTemplateUpdate('basic');
                  }}
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    border: 'none',
                    textAlign: 'center',
                    overflow: 'hidden',
                    width: '100%',
                    transition: 'transform 0.2s',
                  }}
                >
                  <img src='/stores/Kitchen_basic.svg' alt='Template 1' style={{ width: '50%', height: 'auto', objectFit: 'cover' }} />
                  <Box sx={{ backgroundColor: 'black', padding: '4px', borderRadius: '4px', maxWidth: '100px', margin: '0 auto' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: '0 auto' }}>Select</Typography>
                  </Box>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </TabPanel>

      <TabPanel initialValue="luxury" value={category}>
        {category === 'luxury' && (
          <Box sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6" fontWeight="medium" mb={2}>Choose a Luxury Scheme</Typography>
            <Grid2 container spacing={2}>
              <Grid2>
                <Box
                  onClick={() => {
                    handleTemplateUpdate('luxury');
                  }}
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    border: 'none',
                    textAlign: 'center',
                    overflow: 'hidden',
                    width: '100%',
                    transition: 'transform 0.2s',
                  }}
                >
                  <img src='/stores/Kitchen_luxury.svg' alt='Luxury Template' style={{ width: '50%', height: 'auto', objectFit: 'cover' }} />
                  <Box sx={{ backgroundColor: 'black', padding: '4px', borderRadius: '4px', maxWidth: '100px', margin: '0 auto' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: '0 auto' }}>Select</Typography>
                  </Box>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </TabPanel>

    </Box>
  );
};

export default SkinTemplate;