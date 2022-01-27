import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FormHelperText } from '@mui/material';
import { useStyles } from '../ui/SaveTaskModalStyle';

const SaveTaskSelect = ({
  label,
  value,
  options,
  onChange,
  hasError,
  errorMessage,
  name }) => {
  const classes = useStyles();
  return (
    <FormControl
      fullWidth
      sx={{ '& > label': { color: value && value !== '' ? '#000000' : '#A5AFB0' } }}
    >
      <InputLabel id={`${label}_demo-simple-select-autowidth-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}_demo-simple-select-autowidth-label`}
        id={`${label}_demo-simple-select-autowidth-label`}
        value={value || ''}
        onChange={onChange}
        fullWidth
        label={label}
        IconComponent={KeyboardArrowDown}
        error={hasError}
        MenuProps={{ classes: { paper: classes.select } }}
        name={name}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{ maxWidth: 350, whiteSpace: 'break-spaces' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && (
      <FormHelperText className={classes.errorText}>
        {errorMessage}
      </FormHelperText>
      )}
    </FormControl>
  );
};
export default SaveTaskSelect;
