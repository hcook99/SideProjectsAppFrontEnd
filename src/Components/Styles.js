import {
  Typography,
  Button,
  TextField,
  DialogTitle,
  styled as materialStyle,
  Tooltip,
  Tab
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
  font-size: 1.5rem;
  margin-left: 1rem;
  font-weight: bolder;
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
  marginLeft: '0.2rem',
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
