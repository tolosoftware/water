
import React from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import Avatar from '@material-ui/core/Avatar';


import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
// start import for taps 
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// end import for taps



const tableList = [
  {
    id: 1,
    name: 'Lucy Francis',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '17 days ago',
    action: 'Pay'
  },
  {
    id: 2,
    name: 'Dean Holmes',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '10 days ago',
    action: 'Pay'
  },
  {
    id: 3,
    name: 'Terry Bridges',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '6 days ago',
    action: 'Pay'
  },
  {
    id: 4,
    name: 'Alice Collins',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '2 hrs. ago',
    action: 'Pay'
  }
];


// start taps functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));
// end taps functions

const SolarPanel = () => {
  return (
  <div className="row">
    <div className="col-xl-5 col-lg-5 col-md-12 col-12">

    <Widget styleName={`bg-grey darken-4 text-white`}>
      <div className="d-flex flex-row justify-content-center mb-3">
        <i className={`zmdi zmdi-view-web zmdi-hc-4x`}/>
      </div>
      <div className="text-center">
        <h3 className="jr-font-weight-medium mb-3">Refer and Get Reward</h3>
        <p className="mb-3">Reffer us to your friends and
          earn bonus when they join.</p>
        <Button size="large" className="bg-warning text-white mt-3 text-capitalize">Invite Friends</Button>
      </div>
    </Widget>
      </div>


      <div className="col-xl-7 col-lg-7 col-md-12 col-12">
         <Widget>
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Cities and Sunshine</h4>
        <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center">
                    <i className="zmdi zmdi-plus-circle-o mr-1"/>Add New Account</span>
      </div>
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {tableList.map((data, index) => {
            return <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  {data.image === '' ? null :
                    <Avatar className="user-avatar size-30" src={data.image}/>}
                  <div className="user-detail">
                    <h5 className="user-name">{data.name}</h5>
                  </div>
                </div>
              </td>
              <td>{data.lastTransfer}</td>
              <td>
                <div className="pointer text-primary">
                  <IconButton size="small" aria-label="delete"  color="secondary">
                    <DeleteIcon />
                </IconButton>
                <IconButton size="small" color="primary" aria-label="add an alarm">
                    <Add />
                </IconButton>
               
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      <span className="text-primary mt-2 pointer d-block d-sm-none">
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
              Add New Account</span>
        
        </Widget>
      </div>
      </div>
    

  );
};

export default SolarPanel;
