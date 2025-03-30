import React from 'react';
import { Box, Button, SelectChangeEvent, SxProps, Theme, Typography } from '@mui/material';

import SelectEdit from '../select/select';

interface PageSizeOption {
  value: string;
  label: string;
}

export interface CustomPaginationProps {
  page: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: PageSizeOption[];
  paginationStyles: {
    paginationContainer: SxProps<Theme>;
    pageButton: (isActive: boolean) => SxProps<Theme>;
    paginationNavButton: SxProps<Theme>;
  };
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  pageSize,
  rowCount,
  pageCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  paginationStyles,
}) => {
  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, rowCount);

  // Generate options for the page size select
  const generatePageSizeOptions = (): PageSizeOption[] => {
    return (
      pageSizeOptions || [
        { value: '1', label: '1 per page' },
        { value: '5', label: '5 per page' },
        { value: '10', label: '10 per page' },
        { value: '20', label: '20 per page' },
        { value: '50', label: '50 per page' },
        { value: '100', label: '100 per page' },
      ]
    );
  };

  // Generate page numbers
  const renderPageNumbers = () => {
    // Calculate total pages based on rowCount and pageSize
    const calculatedPageCount = Math.ceil(rowCount / pageSize);

    // Log the comparison between the calculated page count and the one from the selector
    console.log('Page calculation:', {
      calculatedPageCount,
      gridPageCount: pageCount,
      rowCount,
      pageSize,
    });

    const pageNumbers = [];

    // When there are many pages (e.g., 15 items with limit 1 = 15 pages)
    // Show first page, current page and surrounding pages, and last page

    if (calculatedPageCount <= 7) {
      // If 7 or fewer pages, show all pages
      for (let i = 0; i < calculatedPageCount; i++) {
        pageNumbers.push(
          <Button
            key={i}
            size="small"
            variant={page === i ? 'contained' : 'text'}
            onClick={() => onPageChange(i)}
            sx={paginationStyles.pageButton(page === i)}
          >
            {i + 1}
          </Button>
        );
      }
    } else {
      // For many pages, show pagination with ellipsis
      // Always show first page
      pageNumbers.push(
        <Button
          key={0}
          size="small"
          variant={page === 0 ? 'contained' : 'text'}
          onClick={() => onPageChange(0)}
          sx={paginationStyles.pageButton(page === 0)}
        >
          1
        </Button>
      );

      // Show ellipsis if current page is far from first page
      if (page > 3) {
        pageNumbers.push(
          <Typography key="ellipsis-start" variant="body2" sx={{ mx: 0.5 }}>
            ...
          </Typography>
        );
      }

      // Show pages around current page
      const startPage = Math.max(1, page - 1);
      const endPage = Math.min(calculatedPageCount - 2, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i <= 0 || i >= calculatedPageCount - 1) continue; // Skip first and last page as they're always shown
        pageNumbers.push(
          <Button
            key={i}
            size="small"
            variant={page === i ? 'contained' : 'text'}
            onClick={() => onPageChange(i)}
            sx={paginationStyles.pageButton(page === i)}
          >
            {i + 1}
          </Button>
        );
      }

      // Show ellipsis if current page is far from last page
      if (page < calculatedPageCount - 4) {
        pageNumbers.push(
          <Typography key="ellipsis-end" variant="body2" sx={{ mx: 0.5 }}>
            ...
          </Typography>
        );
      }

      // Always show last page
      pageNumbers.push(
        <Button
          key={calculatedPageCount - 1}
          size="small"
          variant={page === calculatedPageCount - 1 ? 'contained' : 'text'}
          onClick={() => onPageChange(calculatedPageCount - 1)}
          sx={paginationStyles.pageButton(page === calculatedPageCount - 1)}
        >
          {calculatedPageCount}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Box sx={paginationStyles.paginationContainer}>
      {/* Left side - Result count and page size select */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Viewing {from}-{to} of {rowCount} results
        </Typography>
        <SelectEdit
          options={generatePageSizeOptions()}
          value={pageSize.toString()}
          onChange={(event: SelectChangeEvent<unknown>) => {
            const newPageSize = Number(event.target.value);
            onPageSizeChange(newPageSize);
          }}
          size="small"
          sx={{ ml: 2, width: 150, height: 32 }}
        />
      </Box>

      {/* Middle - Page numbers */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{renderPageNumbers()}</Box>

      {/* Right side - Previous/Next buttons */}
      <Box>
        <Button
          size="small"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          sx={paginationStyles.paginationNavButton}
        >
          Previous
        </Button>
        <Button
          size="small"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
          sx={paginationStyles.paginationNavButton}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CustomPagination;
