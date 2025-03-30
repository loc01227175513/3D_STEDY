import { SxProps } from '@mui/material';

/**
 * Common styles for handling text overflow in grid cells
 * - Truncates text with ellipsis
 * - Prevents text from overflowing to other rows
 */
export const cellTextStyle: SxProps = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'block',
  width: '100%',
};

/**
 * Style for multiline cell content with limited height
 * - Allows text to wrap to multiple lines
 * - Limits maximum height and adds ellipsis
 */
export const multilineCellStyle: SxProps = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2, // Limit to 2 lines
  lineHeight: 1.4,
};
