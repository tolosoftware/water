import React, { useState, useEffect } from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import Edit from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// start import for taps 
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import './style.css';
import {useDropzone} from "react-dropzone";
import DialogWaterP from './commentElement/DialogWaterP'
import DialogSettingWD from './commentElement/DialogSettingWD'
// end import for taps

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
// end import for dialog 
//form importas
import axios from 'axios';
import Swal from 'sweetalert2';
import IntlMessages from 'util/IntlMessages';
import Spinner from 'react-spinner-material';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import countries from './commentElement/countries';

// start of dialog modal for water pump
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


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
    // width: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));
// end taps functions

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
// start code for dropzone
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
// end code for dropzone
const WaterPump = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // start code of dialog modal for water pump
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [openD, setOpenD] = React.useState(false);
  const [openWSD, setOpenWSD] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  // end code of dialog modal for water pump
  // dropzone code
const [files, setFiles] = useState([]);
const {getRootProps, getInputProps} = useDropzone({
  accept: 'image/*',
  onDrop: acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }
});

const thumbs = files.map(file => (
  <div style={thumb} key={file.name}>
    <div style={thumbInner}>
      <img alt={file.name}
           src={file.preview}
           style={img}
      />
    </div>
  </div>
));

useEffect(() => () => {
  // Make sure to revoke the data uris to avoid memory leaks
  files.forEach(file => URL.revokeObjectURL(file.preview));
}, [files]);
// end dropzone code
   
// start form sumbit
const [brand, setBrand] = React.useState("");
const [country, setCountry] = React.useState("");
const [description, setDescription] = React.useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  let data = {
    brand, description
  }
    data['country']=country.label;
    var image = '';
    let file = files[0];
    let reader = new FileReader();
    reader.onloadend = (file) => {
      image = reader.result;
      data['image'] = image;
      axios.post('api/pumpbrand', data)
        .then(res => {
        
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            }
        ).catch(err =>{
               NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            }
        )
    }
    reader.readAsDataURL(file); 
}
// end form sumbit

  // start popove code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open1 = Boolean(anchorEl);
  // end popover code

  return (
  <div className="row">
    <div className="col-xl-4 col-lg-4 col-md-12 col-12">
      <div className={classes.root}>
        <Widget styleName={`text-white waterPumpPanelBackGrad`}>
          <div className="d-flex flex-row justify-content-center mb-3">
            {/* <i className={`zmdi zmdi-view-web zmdi-hc-4x`}/> */}
            <LocalDrinkIcon className="lDrinkIcon"/>
          </div>
          <div className="text-center">
            <h3 className="jr-font-weight-medium mb-3">Water Pump Brands</h3>
            <p className="mb-3">List of Current Water Pump Brands</p>
            <Button size="large" className="bg-warning text-white mt-3 text-capitalize" onClick={handleClickOpen}>Manage</Button>
          </div>
        </Widget>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            
            <form autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle id="customized-dialog-title" className='customizedDialog1' onClose={handleClose}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Add Brand" {...a11yProps(0)} />
                    <Tab label="List of Brand" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                
                </DialogTitle>
                <DialogContent dividers>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                <TabPanel value={value} index={0} dir={theme.direction} className="waterPumpPanel">
                
                  <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </Typography>
                <div className="row ">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <TextField id="outlined-basic" value={brand} onChange={e => setBrand(e.target.value)} name='brand' label="Brand Name" variant="outlined" />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">  
                    <Autocomplete
                      id="country-select-demo" onChange={(event, newValue) => {setCountry(newValue);}}
                      style={{ width: 300 }}
                      options={countries}
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(option) => (
                        <React.Fragment>
                          {/* <span>{countryToFlag(option.code)}</span> */}
                          {/* {option.label} ({option.code}) +{option.phone} */}
                          {option.label}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a country"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    /> 
                  </div>
                </div>
                <div className="row paddingTopForm">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <TextareaAutosize value={description} onChange={e => setDescription(e.target.value)} name='description' id='description' aria-label="minimum height" rowsMin={3} className="minWidth form-control" placeholder="Short Description" />
                  </div>
                </div>
                <div className="row paddingTopForm">
                  
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 accessory_file waterPumFile">
                      <div className="dropzone-card">
                        <div className="dropzone">
                            <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                <input {...getInputProps()} />
                                <p>Upload image</p>
                            </div>
                        </div>
                        <div className="dropzone-content" style={thumbsContainer}>
                            {thumbs}
                        </div>
                      </div>
                  </div>
                   
                </div>
                
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <div className="table-responsive-material">
                        <Table className="default-table table-unbordered table table-sm table-hover">
                          <thead className="table-head-sm th-border-b">
                            <tr>
                              <th>Brand</th>
                              <th>Coutry</th>
                              <th>logo</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {tableList.map((data, index) => {
                            return <tr key={index}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="user-detail">
                                    
                                    <h5 className="user-name">
                                    <Typography
                                      aria-owns={open1 ? 'mouse-over-popover' : undefined}
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      {data.name}
                                    </Typography>
                                    </h5>
                                    <Popover
                                      id="mouse-over-popover"
                                      className={classes.popover}
                                      classes={{
                                        paper: classes.paper,
                                      }}
                                      open={open1}
                                      anchorEl={anchorEl}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                      }}
                                      onClose={handlePopoverClose}
                                      disableRestoreFocus
                                    >
                                      <Typography>{data.name}.</Typography>
                                    </Popover>
                                  </div>
                                </div>
                              </td>
                              
                              <td>{data.lastTransfer}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {data.image === '' ? null :
                                    <Avatar className="user-avatar size-30" src={data.image}/>}
                                </div>
                              </td>
                              <td>
                                <div className="pointer text-primary">
                                  <IconButton size="small" aria-label="delete"  color="secondary">
                                    <DeleteIcon />
                                  </IconButton>
                                <IconButton size="small" color="primary" aria-label="edit an alarm">
                                    <Edit />
                                </IconButton>
                               
                              
                                </div>
                              </td>
                            </tr>
                          })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                </SwipeableViews>
                </DialogContent>
                <DialogActions>
                {(value===0)? (<Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>): null}
                </DialogActions>
                </form>
              </Dialog>
      </div>
      
    </div>

    <div className="col-xl-8 col-lg-8 col-md-12 col-12 wp-second-col">
      {/* imported dialog form another file */}
      <DialogWaterP 
        openD={openD}
        setOpenD={setOpenD}
      />
      <DialogSettingWD 
        openWSD={openWSD}
        setOpenWSD={setOpenWSD}
      />

      <Widget>
        <div className="d-flex flex-row mb-3">
          <h4 className="mb-0"> List of Water Pumps</h4>
          <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center" onClick={()=>setOpenD(true)}>
            <i className="zmdi zmdi-plus-circle-o mr-1"/>Register New Device</span>
        </div>
        <div className="table-responsive-material">
          <Table className="default-table table-unbordered table table-sm table-hover">
            <thead className="table-head-sm th-border-b">
              <tr>
                <th>ID</th>
                <th>Name/Model</th>
                <th>Power (KW)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {tableList.map((data, index) => {
              return <tr key={index}>
                <td>{data.id}</td>
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
                  <IconButton size="small" color="primary" aria-label="edit an alarm">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="primary" aria-label="setting an alarm" onClick={()=>setOpenWSD(true)}>
                    <SettingsIcon />
                  </IconButton>
                  </div>
                </td>
              </tr>
            })}
            </tbody>
          </Table>
        </div>
        <span className="text-primary mt-2 pointer d-block d-sm-none" onClick={()=>setOpenD(true)}>
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
        Register New Device</span>
      </Widget>
      </div>
      <NotificationContainer />  
  </div>
  );
};
export default WaterPump;
