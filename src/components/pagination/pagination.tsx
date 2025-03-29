import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { default as MuiUsePagination } from '@mui/material/usePagination';

// Import styled components from index.ts
import {
  NavButton,
  PaginationButton,
  PaginationInfo,
  PaginationList,
  PaginationRoot,
  RowsPerPageContainer,
  RowsPerPageLabel,
  RowsPerPageSelect,
} from './index';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  color?: 'primary' | 'secondary' | 'standard';
  size?: 'small' | 'medium' | 'large';
  shape?: 'circular' | 'rounded';
  variant?: 'text' | 'outlined';
  showFirstButton?: boolean;
  showLastButton?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showPageInfo?: boolean;
  totalItems?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (value: number) => void;
}

export const usePagination = <T,>(items: T[], initialItemsPerPage: number = 8) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Calculate pagination
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Use MUI's usePagination hook
  const { items: paginationItems } = MuiUsePagination({
    count: pageCount,
    page,
    onChange: (_, value) => {
      setPage(value);
      window.scrollTo(0, 0);
    },
    showFirstButton: false,
    showLastButton: false,
    boundaryCount: 1,
    siblingCount: 1,
  });

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
    window.scrollTo(0, 0);
  };

  return {
    page,
    setPage,
    currentItems,
    pageCount,
    handlePageChange,
    paginationItems,
    totalItems: items.length,
    startIndex: indexOfFirstItem + 1,
    endIndex: Math.min(indexOfLastItem, items.length),
    itemsPerPage,
    handleItemsPerPageChange,
  };
};

const CustomPagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
  showFirstButton = false,
  showLastButton = false,
  hidePrevButton = false,
  hideNextButton = false,
  showPageInfo = true,
  totalItems,
  rowsPerPage = 8,
  rowsPerPageOptions = [4, 8, 12, 16],
  onRowsPerPageChange,
}) => {
  if (count <= 1 && rowsPerPageOptions.length <= 1) {
    return null;
  }

  // Use MUI's usePagination hook directly
  const { items } = MuiUsePagination({
    count,
    page,
    onChange,
    showFirstButton,
    showLastButton,
    hidePrevButton,
    hideNextButton,
    boundaryCount: 1,
    siblingCount: 1,
  });

  // Calculate start and end item indexes
  const itemsPerPage = totalItems ? Math.ceil(totalItems / count) : rowsPerPage;
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems || page * itemsPerPage);

  const handleRowsPerPageChange = (event: SelectChangeEvent) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(Number(event.target.value));
    }
  };

  return (
    <PaginationRoot>
      {showPageInfo && totalItems && (
        <PaginationInfo>
          Viewing {startItem}-{endItem} of {totalItems} items
        </PaginationInfo>
      )}
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          switch (type) {
            case 'start-ellipsis':
            case 'end-ellipsis':
              children = (
                <PaginationButton variant="text" disabled>
                  …
                </PaginationButton>
              );
              break;
            case 'page':
              children = (
                <PaginationButton variant="outlined" isSelected={selected} {...item} aria-label={`Go to page ${page}`}>
                  {page}
                </PaginationButton>
              );
              break;
            case 'previous':
              children = (
                <NavButton variant="outlined" {...item} aria-label="Go to previous page">
                  <ChevronLeftIcon />
                </NavButton>
              );
              break;
            case 'next':
              children = (
                <NavButton variant="outlined" {...item} aria-label="Go to next page">
                  <ChevronRightIcon />
                </NavButton>
              );
              break;
            case 'first':
              children = (
                <NavButton variant="outlined" {...item} aria-label="Go to first page">
                  <FirstPageIcon />
                </NavButton>
              );
              break;
            case 'last':
              children = (
                <NavButton variant="outlined" {...item} aria-label="Go to last page">
                  <LastPageIcon />
                </NavButton>
              );
              break;
            default:
              children = (
                <PaginationButton variant="text" {...item}>
                  {type}
                </PaginationButton>
              );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>

      {rowsPerPageOptions.length > 1 && (
        <RowsPerPageContainer>
          <RowsPerPageLabel>Standard:</RowsPerPageLabel>
          <RowsPerPageSelect size="small">
            <Select value={rowsPerPage.toString()} onChange={handleRowsPerPageChange} size="small" variant="outlined">
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </RowsPerPageSelect>
        </RowsPerPageContainer>
      )}
    </PaginationRoot>
  );
};

export default CustomPagination;
