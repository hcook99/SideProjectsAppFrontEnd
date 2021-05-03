import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

function Loading(props) {
  return (
    <div
      style={{
        display: 'grid',
        height: '60vh',
        margin: 0,
        placeItems: 'center center',
      }}>
      <CircularProgress size={40} style={{ color: '#007AFE' }} />
    </div>
  );
}

export default withRouter(Loading);
