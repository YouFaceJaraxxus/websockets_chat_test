import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IDropdownProps } from './option.model';

const TaskOverviewDropdown = (({
  open,
  anchorEl,
  setAnchorEl,
  options,
  additionalOnClose } : IDropdownProps) => {
  const handleClose = (e) => {
    e.stopPropagation();
    if (additionalOnClose) additionalOnClose();
    setAnchorEl(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.id}
          onClick={(e) => {
            e.stopPropagation();
            option.action();
            handleClose(e);
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
});

export default TaskOverviewDropdown;
