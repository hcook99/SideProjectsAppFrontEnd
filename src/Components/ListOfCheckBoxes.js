import React from 'react';
import { ListItem, FormControlLabel, Collapse } from '@material-ui/core';
import CheckBoxOutlineBlankSharp from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';
import {
  ListItemCheckbox,
  FilterStyleTypography,
  FilterCheckbox,
  ShowMoreButton,
} from './Styles';

function ListOfCheckBoxes(props) {
  const [showMore, setshowMore] = React.useState(false);

  const handleShowMore = () => {
    setshowMore((prev) => !prev);
  };

  const handleFilterClick = (event) => {
    props.changeSelection(event.target.name, props.categoryTitle);
  };

  let listOfCheckBoxTemp = [];
  let i = 0;

  for (const [key, value] of Object.entries(props.listOfCheckBoxLabel)) {
    listOfCheckBoxTemp.push(
      <ListItemCheckbox key={i}>
        <FormControlLabel
          control={
            <FilterCheckbox
              name={key}
              checked={value}
              size='small'
              color='primary'
              disableRipple={true}
              icon={<CheckBoxOutlineBlankSharp />}
              checkedIcon={<CheckBoxSharp />}
              onClick={handleFilterClick}
            />
          }
          label={
            <FilterStyleTypography style={{ fontSize: '0.8em' }}>
              {key}
            </FilterStyleTypography>
          }
        />
      </ListItemCheckbox>
    );
    i++;
  }

  return (
    <div>
      <ListItem>
        <FilterStyleTypography
          style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
          {props.categoryTitle}
        </FilterStyleTypography>
      </ListItem>
      {window.isMobile ? listOfCheckBoxTemp : 
        (listOfCheckBoxTemp.slice(0, 3),
        listOfCheckBoxTemp.length < 4 ? null : (
          <div>
            <Collapse in={showMore}>{listOfCheckBoxTemp.slice(3)}</Collapse>
            <ShowMoreButton onClick={handleShowMore} disableRipple={true}>
              Show {showMore ? 'less' : 'more'}...
            </ShowMoreButton>
          </div>
        ))
      }
    </div>
  );
}

export default ListOfCheckBoxes;
