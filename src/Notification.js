import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * The snackbar notification system
 * 
 * @param {boolean} open [required] - Controls opening and closing of snackbar
 * 
 * @returns JSX of Material-UI Snackbar with Alert styling
 */
const CustomizedSnackbars = ({open}) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert
      severity="info" // error, warning, info, success
    >
      Loading...
    </Alert>
  </Snackbar>
);
export default CustomizedSnackbars;