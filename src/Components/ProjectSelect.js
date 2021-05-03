import React from 'react';
import { CreateSelect } from './Styles';
import { MenuItem } from '@material-ui/core';

function ProjectSelect(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleChange(props.label, event.target.value);
  };

  return (
    <CreateSelect
      variant='outlined'
      label={props.label}
      value={value}
      onChange={handleChange}
      style={{ width: window.isMobile ? '80%':'45%'}}
      SelectProps={{
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: window.isMobile ? '25%' : '13.5%',
            },
          },
        },
      }}
      select>
      {props.listOfValues.map((menuValue, i) => {
        return (
          <MenuItem key={i} value={menuValue}>
            {menuValue}
          </MenuItem>
        );
      })}
    </CreateSelect>
  );
}

export default ProjectSelect;
