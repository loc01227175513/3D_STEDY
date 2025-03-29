import React, { useState } from 'react';
import { Crop, Fullscreen, Undo, ZoomIn, ZoomOut } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Switch, Tooltip } from '@mui/material';

import { ButtonGroup, RoofControl, ToolbarContainer } from './style';

interface FloatingToolbarProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onUndo?: () => void;
  onFullscreen?: () => void;
  onRoofToggle?: (checked: boolean) => void;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onUndo,
  onFullscreen,
  onRoofToggle,
}) => {
  const [roofVisible, setRoofVisible] = useState(true);

  const handleRoofToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoofVisible(event.target.checked);
    onRoofToggle?.(event.target.checked);
  };

  return (
    <ToolbarContainer>
      <ButtonGroup>
        <Tooltip title="Phóng to">
          <IconButton size="small" onClick={onZoomIn}>
            <ZoomIn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Thu nhỏ">
          <IconButton size="small" onClick={onZoomOut}>
            <ZoomOut />
          </IconButton>
        </Tooltip>
        <Tooltip title="Khôi phục góc nhìn">
          <IconButton size="small" onClick={onReset}>
            <Crop />
          </IconButton>
        </Tooltip>
        <Tooltip title="Hoàn tác">
          <IconButton size="small" onClick={onUndo}>
            <Undo />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toàn màn hình">
          <IconButton size="small" onClick={onFullscreen}>
            <Fullscreen />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <RoofControl>
        <div className="roof-label">
          <HomeIcon fontSize="small" />
          <span style={{ fontSize: '14px' }}>Roof</span>
        </div>
        <Switch size="small" checked={roofVisible} onChange={handleRoofToggle} color="primary" />
      </RoofControl>
    </ToolbarContainer>
  );
};

export default FloatingToolbar;
