import {
  Typography,
  Button,
  TextField,
  DialogTitle,
  styled as materialStyle,
  Tooltip,
  Tab,
  ListItem,
  Checkbox,
} from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';

export const FilterStyleTypography = styled(Typography)`
  font-family: Montserrat;
  padding-left: 0px;
  color: black;
`;

export const ProjectsTitleText = styled(Typography)`
  font-family: Montserrat;
  color: black;
  font-size: 1.75rem;
  margin-left: 0.7rem;
  font-weight: bolder;
`;

export const ProjectsDescriptionText = styled(Typography)`
  font-family: Montserrat;
  color: black;
  margin-left: 1rem;
  font-size: 1rem;
`;

export const BookmarkText = styled(Typography)`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 0.75rem;
  border: none;
  text-transform: none;
`;

export const BookmarkButton = materialStyle(({ isBookmarked, ...other }) => (
  <Button {...other} />
))({
  display: 'flex',
  color: (props) => (props.isBookmarked ? '#007AFE' : '#9E9E9E'),
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

export const CreateProjectTitle = styled(DialogTitle)`
  font-family: Montserrat;
  color: #007afe;
  font-size: 1.5rem;
  margin-left: 1.5rem;
  font-weight: bolder;
`;

export const UpVoteButton = materialStyle(({ isLiked, ...other }) => (
  <Button {...other} />
))({
  backgroundColor: (props) => (props.isLiked ? '#4DAF4E' : '#EEEEEE'),
  color: (props) => (props.isLiked ? 'white' : 'black'),
  '&:hover': {
    backgroundColor: (props) => (props.isLiked ? '#4AA54C' : '#E1E1E1'),
  },
});

export const ProjectTextField = styled(TextField)`
  margin: 0.5rem;
  width: 93.25%;
  & .MuiOutlinedInput-notchedOutline {
    border-color: #e0e3e3;
  }
  &:hover.MuiTextField-root .MuiOutlinedInput-notchedOutline {
    border-color: #99a3ad;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #007afe;
  }
`;

export const CreateButton = styled(Button)`
  background-color: white;
  text-transform: none;
  float: right;
  color: #007afe;
  font-weight: normal;
  font-size: 1rem;
  font-family: Montserrat;
  padding: 0.75rem;
  &:hover {
    color: white;
    background-color: #007afe;
  }
`;

export const SaveButton = styled(Button)`
  background-color: white;
  text-transform: none;
  color: #007afe;
  font-weight: normal;
  font-size: 1rem;
  font-family: Montserrat;
  &:hover {
    color: white;
    background-color: #007afe;
  }
`;

export const CancelButton = styled(Button)`
  background-color: white;
  text-transform: none;
  color: #ff1500;
  font-weight: normal;
  font-size: 1rem;
  font-family: Montserrat;
  &:hover {
    color: white;
    background-color: #ff1500;
  }
`;

export const CreateSelect = styled(TextField)`
  margin: 0.5rem;
  width: 45%;
  & .MuiOutlinedInput-notchedOutline {
    border-color: #e0e3e3;
  }
  &:hover.MuiTextField-root .MuiOutlinedInput-notchedOutline {
    border-color: #99a3ad;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #007afe;
  }
`;

export const TagToolTip = styled((props) => (
  <Tooltip
    classes={{ popper: props.className, tooltip: 'tooltip', arrow: 'arrow' }}
    {...props}
  />
))`
  & .tooltip {
    background-color: black;
    color: white;
    font-family: Montserrat;
    font-size: 0.8rem;
  }
  & .arrow {
    color: black;
  }
`;

export const UserTab = styled(Tab)`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 0.85rem;
  border-bottom: 2px solid #99a3ad;
`;

export const ListItemCheckbox = styled(ListItem)`
  padding-bottom: 1px;
  padding-top: 1px;
`;

export const FilterCheckbox = styled(Checkbox)`
  color: #b1d6ff;
  margin-left: 10px;
  padding: 2px;
  &.MuiCheckbox-colorPrimary.Mui-checked {
    color: #007afe;
  }
  .MuiCheckbox-colorPrimary.Mui-checked:hover {
    background-color: #007afe;
  }
  &&:hover {
    background-color: rgba(201, 224, 255, 0.3);
  }
`;

export const ShowMoreButton = styled(Button)`
  color: #007afe;
  font-family: Montserrat;
  font-size: 0.625rem;
  border: none;
  text-transform: none;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`;

export const PlatformsCreate = styled(Typography)`
  font-family: Montserrat;
  font-size: 1.25rem;
  color: black;
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const PlatformCreateCheckbox = styled(Checkbox)`
  color: #b1d6ff;
  margin: 0;
  padding: 2px;
  &.MuiCheckbox-colorPrimary.Mui-checked {
    color: #007afe;
  }
  .MuiCheckbox-colorPrimary.Mui-checked:hover {
    background-color: #007afe;
  }
  &&:hover {
    background-color: rgba(201, 224, 255, 0.3);
  }
`;

export const BuiltinTags = styled(Button)`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 0.7rem;
  color: #007afe;
  background-color: #eef4f9;
  border: none;
  text-transform: none;
  margin: 3px;
  width: auto;
  padding: 4px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: #007afe;
    background-color: #eef4f9;
  }
`;

export const Tag = styled(Button)`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 0.85rem;
  color: #64707d;
  text-transform: none;
  margin-right: 1rem;
  padding: 0;
  min-width: 0;
  i {
    color: #c6cbcf;
  }
  &:hover {
    color: black;
    background-color: transparent;
    cursor: default;
    i {
      color: #64707d;
    }
  }
  &:disabled {
    color: #64707d;
    i {
      color: #c6cbcf;
    }
  }
`;

export const PageCursor = styled(Button)`
  font-family: Montserrat;
  font-weight: bolder;
  font-size: 1rem;
  border-radius: 0.3rem;
  background-color: white;
  margin-right: 0.4rem;
  color: #383838;
`;
