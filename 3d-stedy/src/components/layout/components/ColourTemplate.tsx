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
import { drawerStore, useBrandStore, useStyleStore } from '@/store';
import { BpCheckbox } from './Style';
import ColorItem from './CorlorItemIndo';
import theme from '@/themes';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { DraggableColorPalette } from './ColorPalette';

interface ColourTemplateProps {
  onCloseDrawer?: () => void;
}

const ColourTemplate = ({ onCloseDrawer }: ColourTemplateProps) => {
  const [category, setCategory] = useState<string>('product');
  const [islandActiveStyle, setIslandActiveStyle] = useState<string>('');
  const [kitchenActiveStyle, setKitchenActiveStyle] = useState<string>('');
  const { activeTypeStyle, changeTypeStyle } = drawerStore();
  const { activeTemplate } = useBrandStore();
  const { dataStyle } = useStyleStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  useEffect(() => {
    const firstStyle = 'CABINET';
    if (category === 'product') {
      setIslandActiveStyle(firstStyle);
    } else if (category === 'floortiles') {
      setKitchenActiveStyle('FLOORTILES');
      changeTypeStyle('FLOORTILES');
    } else if (category === 'backwall2') {
      setKitchenActiveStyle('CABINET');
      changeTypeStyle('CABINET');
    } else {
      setKitchenActiveStyle('CABINET&CUPBOARD');
      changeTypeStyle('CABINET&CUPBOARD');
    }
    if (category !== 'backwall2') {
      changeTypeStyle(firstStyle);
    }
  }, [category]);

  useEffect(() => {
    const handleModelTypeClick = (type: string) => {
      if (type === 'island') {
        setCategory('product');
      } else {
        setCategory('style');
      }
    };

    emitter.on(THREE_EVENTS.modelTypeClick, handleModelTypeClick);

    return () => {
      emitter.off(THREE_EVENTS.modelTypeClick, handleModelTypeClick);
    };
  }, []);

  useEffect(() => {
    const handleSwitchToColorTab = () => {
      setCategory('backwall2');
    };

    emitter.on(THREE_EVENTS.SWITCH_TO_COLOR_TAB, handleSwitchToColorTab);

    return () => {
      emitter.off(THREE_EVENTS.SWITCH_TO_COLOR_TAB, handleSwitchToColorTab);
    };
  }, []);

  useEffect(() => {
    const handleSwitchToBackwallTab = () => {
      setCategory('backwall2');
    };

    emitter.on(THREE_EVENTS.SWITCH_TO_BACKWALL_TAB, handleSwitchToBackwallTab);

    return () => {
      emitter.off(
        THREE_EVENTS.SWITCH_TO_BACKWALL_TAB,
        handleSwitchToBackwallTab
      );
    };
  }, []);
  useEffect(() => {
    const handleSwitchToBackFlashTab = async () => {
      setCategory('style'),
        await new Promise((resolve) => setTimeout(resolve, 100));
      // changeTypeStyle('BACKSPLASH');
      setKitchenActiveStyle('BACKSPLASH');
    };
    emitter.on(
      THREE_EVENTS.SWITCH_TO_BACK_FLASH_TAB,
      handleSwitchToBackFlashTab
    );

    return () => {
      emitter.off(
        THREE_EVENTS.SWITCH_TO_BACK_FLASH_TAB,
        handleSwitchToBackFlashTab
      );
    };
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  const onChangeTypeStyle = (child: string) => {
    if (category === 'product') {
      setIslandActiveStyle(child);
    } else {
      setKitchenActiveStyle(child);
    }
    changeTypeStyle(child);
  };

  const filteredDataStyles = activeTemplate?.tenantId
    ? dataStyle?.filter((p) => p.tenantIds?.includes(activeTemplate.tenantId))
    : dataStyle;

  return (
    <Box sx={{ padding: isMobile ? '0 0 20px 0' : '20px' }}>
      {/* <Typography component="h3" fontWeight="bold" fontSize="16px" mb={2}>
        COLOUR
      </Typography> */}

      <Box>
        <Tabs
          className="__tabMenuContainer"
          value={category}
          onChange={handleChange}
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
            value="product"
            label="Kitchen Island"
          />
          <Tab disableRipple={true} value="style" label="Kitchen Cabinet" />
          {/* <Tab
            className="__tabMenu"
            disableRipple={true}
            value="backwall"
            label="Back Wall"
          /> */}
          <Tab
            className="__tabMenu"
            disableRipple={true}
            value="backwall2"
            label="Backwall"
          />
          {/* <Tab
            className="__tabMenu"
            disableRipple={true}
            value="floortiles"
            label="Floor Tiles"
          /> */}
        </Tabs>
      </Box>

      {/* <TabPanel initialValue="backwall" value={category}>
        {category === "backwall" && (
          <Box sx={{ mb: 2 }}>
            <DraggableColorPalette />
          </Box>
        )}
      </TabPanel> */}

      <TabPanel initialValue="backwall2" value={category}>
        {category === 'backwall2' && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
                padding: isMobile ? '10px 0' : '10px',
              }}
            >
              {[
                'Backwall',
                // 'Color Picker',
              ]?.map((child, index) => {
                return (
                  <Grid2
                    key={index}
                    sx={{
                      width: 'max-content',
                      borderRadius: '4px',
                      border: '1px solid rgb(193, 191, 191)',
                      padding: '4px 12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      ':hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        img: {
                          filter: 'drop-shadow(0px 100px 0 #ffffff)',
                          transform: 'translateY(-100px)',
                        },
                      },
                      minWidth: '150px',
                      backgroundColor:
                        (child === 'Backwall' && kitchenActiveStyle === 'CABINET') ||
                        (child === kitchenActiveStyle) ? 'black' : 'white',
                      color: (child === 'Backwall' && kitchenActiveStyle === 'CABINET') ||
                        (child === kitchenActiveStyle) ? 'white' : 'black',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflow: 'hidden',
                    }}
                    onClick={() => onChangeTypeStyle(child === 'Backwall' ? 'CABINET' : child)}
                  >
                    <BpCheckbox
                      checked={child === (kitchenActiveStyle === 'CABINET' ? 'Backwall' : kitchenActiveStyle)}
                      value={child}
                      label={child}
                      onChange={() => {
                        onChangeTypeStyle(child === 'Backwall' ? 'CABINET' : child);
                      }}
                    />
                  </Grid2>
                );
              })}
            </Box>

            {kitchenActiveStyle === 'Color Picker' ? (
              <Box sx={{ mb: 2 }}>
                <DraggableColorPalette islandType="backwall2" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns:isMobile? 'repeat(3, 1fr)': 'repeat(4, 1fr)',
                  gap: 2,
                }}
              >
                {(filteredDataStyles || [])
                  .filter((s) =>
                    kitchenActiveStyle === 'CABINET&CUPBOARD'
                      ? s.type === 'CABINET'
                      : s.type === kitchenActiveStyle
                  )
                  .map((item, index) => (
                    <ColorItem
                      key={index}
                      item={item}
                      onCloseDrawer={() => {
                        onCloseDrawer && onCloseDrawer();
                      }}
                      islandType="backwall2"
                    />
                  ))}
              </Box>
            )}
          </>
        )}
      </TabPanel>

      <TabPanel initialValue="product" value={category}>
        {category === 'product' && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
                padding: isMobile ? '10px 0' : '10px',
              }}
            >
              {['CABINET', 'BENCHTOP','KICKER']?.map((child, index) => {
                return (
                  <Grid2
                    key={index}
                    sx={{
                      width: 'max-content',
                      borderRadius: '4px',
                      border: '1px solid rgb(193, 191, 191)',
                      padding: '4px 12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      ':hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        img: {
                          filter: 'drop-shadow(0px 100px 0 #ffffff)',
                          transform: 'translateY(-100px)',
                        },
                      },
                      minWidth: '150px',
                      backgroundColor:
                        child === islandActiveStyle ? 'black' : 'white',
                      color: child === islandActiveStyle ? 'white' : 'black',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflow: 'hidden',
                    }}
                    onClick={() => onChangeTypeStyle(child)}
                  >
                    <BpCheckbox
                      checked={child === islandActiveStyle}
                      value={child}
                      label={child}
                      onChange={() => {
                        onChangeTypeStyle(child);
                      }}
                    />
                  </Grid2>
                );
              })}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns:isMobile? 'repeat(3, 1fr)': 'repeat(4, 1fr)',
                gap: 2,
              }}
            >
              {(filteredDataStyles || [])
                .filter((s) => s.type === islandActiveStyle)
                .map((item, index) => (
                  <ColorItem
                    key={index}
                    item={item}
                    onCloseDrawer={() => {
                      onCloseDrawer && onCloseDrawer();
                    }}
                    islandType="island"
                  />
                ))}
            </Box>
          </>
        )}
      </TabPanel>

      <TabPanel initialValue="style" value={category}>
        {category === 'style' && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
                padding: isMobile ? '10px 0' : '10px',
              }}
            >
              {['CABINET&CUPBOARD', 'BENCHTOP', 'BACKSPLASH','KICKER']?.map(
                (child, index) => {
                  return (
                    <Grid2
                      key={index}
                      sx={{
                        width: 'max-content',
                        borderRadius: '4px',
                        border: '1px solid rgb(193, 191, 191)',
                        padding: '4px 12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        ':hover': {
                          backgroundColor: 'black',
                          color: 'white',
                          img: {
                            filter: 'drop-shadow(0px 100px 0 #ffffff)',
                            transform: 'translateY(-100px)',
                          },
                        },
                        minWidth: '150px',
                        backgroundColor:
                          child === kitchenActiveStyle ? 'black' : 'white',
                        color: child === kitchenActiveStyle ? 'white' : 'black',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                      }}
                      onClick={() => onChangeTypeStyle(child)}
                    >
                      <BpCheckbox
                        checked={child === kitchenActiveStyle}
                        value={child}
                        label={child}
                        onChange={() => {
                          onChangeTypeStyle(child);
                        }}
                      />
                    </Grid2>
                  );
                }
              )}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns:isMobile? 'repeat(3, 1fr)': 'repeat(4, 1fr)',
                gap: 2,
              }}
            >
              {(filteredDataStyles || [])
                .filter((s) =>
                  kitchenActiveStyle === 'CABINET&CUPBOARD'
                    ? s.type === 'CABINET'
                    : s.type === kitchenActiveStyle
                )
                .map((item, index) => (
                  <ColorItem
                    key={index}
                    item={item}
                    onCloseDrawer={() => {
                      onCloseDrawer && onCloseDrawer();
                    }}
                    islandType="kitchen"
                  />
                ))}
            </Box>
          </>
        )}
      </TabPanel>


      <TabPanel initialValue="floortiles" value={category}>
        {category === 'floortiles' && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
                padding: isMobile ? '10px 0' : '10px',
              }}
            >
              {['FLOORTILES']?.map((child, index) => {
                return (
                  <Grid2
                    key={index}
                    sx={{
                      width: 'max-content',
                      borderRadius: '4px',
                      border: '1px solid rgb(193, 191, 191)',
                      padding: '4px 12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      ':hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        img: {
                          filter: 'drop-shadow(0px 100px 0 #ffffff)',
                          transform: 'translateY(-100px)',
                        },
                      },
                      minWidth: '150px',
                      backgroundColor:
                        child === kitchenActiveStyle ? 'black' : 'white',
                      color: child === kitchenActiveStyle ? 'white' : 'black',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflow: 'hidden',
                    }}
                    onClick={() => onChangeTypeStyle(child)}
                  >
                    <BpCheckbox
                      checked={child === kitchenActiveStyle}
                      value={child}
                      label={child}
                      onChange={() => {
                        onChangeTypeStyle(child);
                      }}
                    />
                  </Grid2>
                );
              })}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns:isMobile? 'repeat(3, 1fr)': 'repeat(4, 1fr)',
                gap: 2,
              }}
            >

              {(filteredDataStyles || [])
                .filter((s) => s.type === 'FLOORTILES')
                .map((item, index) => (

                  <ColorItem
                    key={index}
                    item={item}
                    onCloseDrawer={() => {
                      onCloseDrawer && onCloseDrawer();
                    }}
                    islandType="floor"
                  />
                ))}
            </Box>
          </>
        )}
      </TabPanel>
    </Box>
  );
};

export default ColourTemplate;

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
