import React, { useState, useEffect } from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import Edit from '@material-ui/icons/Edit';
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
import DialogInvertor from './commentElement/DialogInvertor'

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
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Swal from 'sweetalert2';
import Spinner from 'react-spinner-material';
import Country from './commentElement/Country';

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
const Invertor = () => {
  const [visibility,setVisibility]= useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [invertorBrands, setInvertorBrands] = useState([]);
  const [invertorLists, setInvertorLists] = useState([])
  const [brand, setBrand] = React.useState("");
  const [country, setCountry] = React.useState(Country[0]);
  const [inputValue, setInputValue] = React.useState(Country[0]);
  const [description, setDescription] = React.useState("");
  const [invertorBrandID, setInvertorBrandID] = useState('0'); 
  const [invertorBrOldImage, setInvertorBrOldImage] = useState("");
  useEffect(() => {
    getInvertors();
  },[])
  
  const handleChange = (event, newValue) => {
    setBrand("");
    setDescription("");
    setInvertorBrandID('0');
    setInvertorBrOldImage("");
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
  const editInvertorBrand = (invertorDataObject) => {
    setValue(0);
    setBrand(invertorDataObject.name);
    setCountry(invertorDataObject.country);
    setDescription(invertorDataObject.discription);
    setInvertorBrandID(invertorDataObject.id);
    setInvertorBrOldImage(invertorDataObject.image);
    console.log("invertorDataObject : ", invertorDataObject)
  }
  // start code of dialog modal for water pump
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [openIn, setOpenIn] = React.useState(false);
  useEffect(() => {
    getInvertorLists();
  },[openIn])
  const handleClose = () => {
    setBrand("");
    setDescription("");
    setInvertorBrandID('0');
    setInvertorBrOldImage("");
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


// Start code of water Pumps List Setting 
 
// End code of water pumps list setting 

// start delete function Water Device list
const deleteInvertorList = (id) =>{
  setVisibility(true);
  // console.log("it is id of that water pump brand: ", id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result.isConfirmed) {
      axios.delete('api/pumpList/'+id)
        .then(res => {
          setVisibility(false);
              // setSolarLists(res.data)
              setInvertorLists(invertorLists.filter((value) => value.id !==id));
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
            id="notification.titleHere" />);
          }
        ).catch( err =>{
          setVisibility(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
             
            })
        })  
    }
  })
}
const [invertorListObject, setInvertorListObject] =React.useState([]);
const editInvertorList = (invertorListObject) =>{
  //  console.log(solarListObject);
  setInvertorListObject(invertorListObject);
  setOpenIn(true)
}
// End delete Water Device lists
// start get WaterPump panal list

const getInvertorLists = async() =>{
  setVisibility(true);
  axios.get('api/invertorList')
  .then(res => {  
    setVisibility(false);
      // console.log(res);
      setInvertorLists(res.data);
    }
).catch(err => {
  setVisibility(false);
       NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
          id="notification.titleHere"/>);
      }
  )
}  

// end get solar pabal list

const deleteInvertorBrand = (id) =>{
  setVisibility(true);
  console.log("it is id of that Invertor brand: ", id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result.isConfirmed) {
      axios.delete('api/invertorbrand/'+id)
        .then(res => {
          setVisibility(false);
              // setInvertorBrands(res.data)
            setInvertorBrands(invertorBrands.filter((value) => value.id !==id));
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
            id="notification.titleHere" />);
          }
        ).catch( err =>{
          setVisibility(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
             
            })
        })  
    }
  })
}
const getInvertors = async() =>{
  setVisibility(true);
  axios.get('api/invertorbrand')
  .then(res => {  
      setVisibility(false)
      // console.log(res);
      setInvertorBrands(res.data);
    }
).catch(err => {
      setVisibility(false)
       NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
          id="notification.titleHere"/>);
      }
  )
}
const handleSubmit = (e) => {
  e.preventDefault();
  setVisibility(true);
  let data = {
    invertorBrandID, country, brand, description
  }
  // console.log(data);
  if(files.length!==0){
    if(data.invertorBrandID===undefined){
      data.invertorBrandID = 0;
    } 
    var image = '';
    let file = files[0];
    let reader = new FileReader();
    reader.onloadend = (file) => {
      image = reader.result;
      data['image'] = image;
      axios.post('api/invertorbrand', data)
        .then(res => {
          setVisibility(false);
          // console.log(res);
              getInvertors();
              getInvertorLists();
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            }
        ).catch(err =>{
          setVisibility(false);
               NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            }
        )
    }
    reader.readAsDataURL(file); 
  }
  else{
    data['image'] = 'oldImage';
    axios.post('api/invertorbrand', data)
        .then(res => {
          setVisibility(false);
              getInvertors();
              getInvertorLists();
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            }
        ).catch(err =>{
          setVisibility(false);
               NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            }
        )
  }
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
            <h3 className="jr-font-weight-medium mb-3">Invertor Brands</h3>
            <p className="mb-3">List of Current Invertor Brands</p>
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
                
                  <Typography gutterBottom className={`p-Padding-bottom`}>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </Typography>
                <div className="row ">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <TextField id="outlined-basic" value={brand} onChange={e => setBrand(e.target.value)} name='brand' label="Brand Name" variant="outlined" />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">  
                  <Autocomplete 
                      value={country} onChange={(event, newValue) => {setCountry(newValue);}}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={Country}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
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
                            {(files.length === 0 )? ((invertorBrOldImage!=="" && invertorBrOldImage!==undefined)? (<spam>
                                  <span className={`sp_right_padding`}>Cuurent Image </span>
                                  <span><img src={`http://localhost:8000/brand/invertor/${invertorBrOldImage}`} class="img-thumbnail rounded acc_img_width"  alt="Responsive"></img></span>
                                </spam>): ''): ''}
                        </div>
                      </div>
                  </div>
                   
                </div>
                
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <span className="row justify-content-center">
                        <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
                      </span>
                      <div className="table-responsive-material">
                        <Table className="default-table table-unbordered table table-sm table-hover">
                          <thead className="table-head-sm th-border-b">
                            <tr>
                              <th>ID</th>
                              <th>Brand</th>
                              <th>Coutry</th>
                              <th>logo</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {invertorBrands.map((data, index) => {
                            return <tr key={index}>
                              <td>{index+1}</td>
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
                                      <Typography>{data.discription}</Typography>
                                    </Popover>
                                  </div>
                                </div>
                              </td>
                              
                              <td>{data.country}</td>
                              
                              <td>
                              <div className="d-flex align-items-center">
                                  <img src={`http://localhost:8000/brand/invertor/${data.image}`}  class="img-thumbnail rounded acc_img_width"  alt="Responsive" />
                                </div>
                              </td>
                              <td>
                                <div className="pointer text-primary">
                                  <IconButton size="small" aria-label="delete"  color="secondary" onClick={() => deleteInvertorBrand(data.id)} >
                                    <DeleteIcon />
                                  </IconButton>
                                <IconButton size="small" color="primary" aria-label="edit an alarm" onClick={() => editInvertorBrand(data)}>
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

      <DialogInvertor 
        openIn={openIn}
        setOpenIn={setOpenIn}
        invertorBrands={invertorBrands}
        invertorListObject={invertorListObject}
        setInvertorListObject={setInvertorListObject}
      />
       

      <Widget>
        <div className="d-flex flex-row mb-3">
          <h4 className="mb-0"> List of Invertor</h4>
          <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center" onClick={()=>setOpenIn(true)}>
            <i className="zmdi zmdi-plus-circle-o mr-1"/>Register New Device</span>
        </div>
        <span className="row justify-content-center">
          <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
        </span>
        <div className="table-responsive-material">
          <Table className="default-table table-unbordered table table-sm table-hover">
            <thead className="table-head-sm th-border-b">
              <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Power (KW)</th>
                <th>Voltage (AC)</th>
                <th>Voltage (DC)</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {invertorLists.map((invertor, index) => {
              return <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="user-detail">
                      <h5 className="user-name">{invertor.model}</h5>
                    </div>
                  </div>
                </td>
                <td>{invertor.power}</td>
                <td>{invertor.voltage_ac}</td>
                <td>{invertor.voltage_dc_min} - {invertor.voltage_dc_max}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={`http://localhost:8000/brand/invertor/invertor_list/${invertor.image}`}  class="img-thumbnail rounded acc_img_width"  alt="Responsive" />
                  </div>
                </td>
                 
                <td>
                  <div className="pointer text-primary">
                    <IconButton size="small" aria-label="delete"  color="secondary" onClick={() => deleteInvertorList(invertor.id)}>
                      <DeleteIcon />
                    </IconButton>
                  <IconButton size="small" color="primary" aria-label="edit an alarm"  onClick={() => editInvertorList(invertor)}>
                    <Edit />
                  </IconButton>
                   
                  </div>
                </td>
              </tr>
            })}
            </tbody>
          </Table>
        </div>
        <span className="text-primary mt-2 pointer d-block d-sm-none" onClick={()=>setOpenIn(true)}>
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
        Register New Device</span>
      </Widget>
      </div>
      <NotificationContainer />  
  </div>
  );
};
export default Invertor;
