import React from 'react';
import {
  ListItem,
  FormControlLabel,
  Typography,
  Checkbox,
  withStyles,
  Collapse,
  Button,
} from '@material-ui/core';
import CheckBoxOutlineBlankSharp from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';

const ListItemCheckbox = withStyles({
  root: {
    paddingTop: '1px',
    paddingBottom: '1px',
  },
})(ListItem);

const FilterStyleTypography = withStyles({
  root: {
    fontFamily: 'Montserrat',
    paddingLeft: '0px',
    color: 'black',
  },
})(Typography);

const FilterCheckbox = withStyles({
  root: {
    color: '#B1D6FF',
    margin: '0px',
    padding: '2px',
    '&$checked': {
      color: '#007AFE',
    },
  },
  checked: {},
})(Checkbox);

const ShowMoreButton = withStyles({
  root: {
    color: '#007AFE',
    fontFamily: 'Montserrat',
    fontSize: '0.625rem',
    border: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
})(Button);

function ListOfCheckBoxes(props) {
  const [showMore, setshowMore] = React.useState(false);

  const handleShowMore = () => {
    setshowMore((prev) => !prev);
  };

  const handleFilterClick = (event) => {
    props.changeSelection(
      event.target.name,
      event.target.checked,
      props.categoryTitle
    );
  };

  let listOfCheckBoxTemp = [];
  for (const [i, checkBoxValue] of props.listOfCheckBoxLabel.entries()) {
    listOfCheckBoxTemp.push(
      <ListItemCheckbox key={i}>
        <FormControlLabel
          control={
            <FilterCheckbox
              name={checkBoxValue}
              size='small'
              disableRipple={true}
              icon={<CheckBoxOutlineBlankSharp />}
              checkedIcon={<CheckBoxSharp />}
              onClick={handleFilterClick}
            />
          }
          label={
            <FilterStyleTypography style={{ fontSize: '0.8em' }}>
              {checkBoxValue}
            </FilterStyleTypography>
          }
        />
      </ListItemCheckbox>
    );
  }

  return (
    <div>
      <ListItem>
        <FilterStyleTypography
          style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
          {props.categoryTitle}
        </FilterStyleTypography>
      </ListItem>
      {listOfCheckBoxTemp.slice(0, 3)}
      {listOfCheckBoxTemp.length < 4 ? null : (
        <div>
          <Collapse in={showMore}>{listOfCheckBoxTemp.slice(3)}</Collapse>
          <ShowMoreButton onClick={handleShowMore} disableRipple={true}>
            Show {showMore ? 'less' : 'more'}...
          </ShowMoreButton>
        </div>
      )}
    </div>
  );
}

export default ListOfCheckBoxes;
