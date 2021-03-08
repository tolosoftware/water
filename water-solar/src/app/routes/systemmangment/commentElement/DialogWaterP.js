import React, { useState, useEffect} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
// import clsx from 'clsx';
import  './CommentEleStyle.css';
// code for small steps
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import IntlMessages from 'util/IntlMessages';
import {NotificationManager} from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import WaterPumpDeviceForm from './WaterPumpDeviceForm';
// end import for dialog 
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
  // end of dialog modal for water pump
  function valuetext(value) {
    return `${value}KW`;
  }
   
  const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(0),
        minWidth: "100%",
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      option: {
          fontSize: 15,
          '& > span': {
              marginRight: 10,
              fontSize: 18,
          },
      },
      root: {
          width: 300,
        },
        
    }));
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
  const marksKW = [
    {
      value: 0.75,
      label: '0.75KW',
    },
    {
      value: 1.1,
      // label: '1.1KW',
    },
    {
      value: 1.5,
      // label: '1.5KW',
    },
    {
      value: 2.2,
      // label: '2.2KW',
    },
    {
      value: 3,
      // label: '3KW',
    },
    {
      value: 4,
      // label: '4KW',
    },
    {
      value: 5.5,
      // label: '5.5KW',
    },
    {
      value: 7.5,
      label: '7.5KW',
    },
    {
      value: 11,
      label: '11KW',
    },
    {
      value: 15,
      label: '15KW',
    },
    {
      value: 18.5,
      label: '18.5KW',
    },
    {
      value: 22,
      label: '22KW',
    },
    {
      value: 30,
      label: '30KW',
    },
  ];
export default function DialogWaterP(props){
    // start code of dialog modal for water pump
    const {openD, setOpenD} = props;
    // const handleClickOpen = () => {
    //     setOpenD(true);
    // };
    const handleClose = () => {
        setOpenD(false);
        emptyForm();
    };
    // end code of dialog modal for water pump
    const [brand, setBrand] = useState("");
    const waterPumpBrands=props.waterPumpBrands;
    const {waterListObject, setWaterListObject} = props;
    const handleChange1 = (event) => {
      setBrand(event.target.value);
    };
    
    const [name, setName] = useState("");
    const [powerKW, setPowerKW] = useState("");
    const [outlet, setOutlet] = useState("");
    const [current, setCurrent] = useState("");
    const [diameter, setDiameter] = useState("");
    const [description, setDescription] = useState("");
    const [waterListID, setWaterListID] = useState('0'); 
    const [oldImage, setOldImage] = useState("");
    const [files, setFiles] = useState([]);

    const emptyForm = () =>{
      setWaterListID('0');
      setWaterListObject([]);
      setBrand('');
      setName('');
      setPowerKW('');
      setOutlet('');
      setCurrent('');
      setDiameter('');
      setDescription("");
      setOldImage('');
      setFiles([]);
    }

    useEffect(() => {
      setEditFieldValuse();
    },[props.waterListObject])
    
    const setEditFieldValuse = () => {
      setWaterListID(waterListObject.id);
      setBrand(waterListObject.pump_brand_id);
      setName(waterListObject.model);
      setOutlet(waterListObject.outlet);
      setCurrent(waterListObject.ampeier);
      setDiameter(waterListObject.diameter);
      var n = waterListObject.power;
      n = parseFloat(n);
      setPowerKW(n);
      setDescription(waterListObject.discription);
      setOldImage(waterListObject.image);
    } 
  
    const classes = useStyles();
    
  // dropzone code
    
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

    const handleSubmit = (e) => {
      e.preventDefault();
      let dataWaterList = {
        waterListID, brand, name, outlet, current, diameter, powerKW, description,
      }
      console.log(dataWaterList);
      if(files.length!==0){
        if(dataWaterList.waterListID===undefined){
          dataWaterList.waterListID=0;
        }
        var image = '';
        let file = files[0];
        let reader = new FileReader();
        reader.onloadend = (file) => {
          image = reader.result;
          dataWaterList['image'] = image;
          dataWaterList['serial_no'] = uuidv4();
          axios.post('api/pumpList', dataWaterList)
            .then(res => {
              setOpenD(false);
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                  id="notification.titleHere" />);
            }).catch(err =>{
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
              }
            )
        }
        reader.readAsDataURL(file); 
      }else{
        dataWaterList['image'] = 'oldImage';
        axios.post('api/pumpList', dataWaterList)
        .then(res => {
          setOpenD(false);
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
        }).catch(err =>{
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
        )
      }
    }
    return (
        <Dialog onClose={handleClose}  aria-labelledby="customized-dialog-title" open={openD}>
            <form autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Add Water Pump Device
            </DialogTitle>
            <DialogContent dividers>
                {/* <WaterPumpDeviceForm /> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP">
                                <TextField size="small"
                                    id="outlined-read-only-input"
                                    label="ID"
                                    defaultValue={1}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP">
                              <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={brand}
                                onChange={handleChange1}
                                label="Brand"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {waterPumpBrands.map(wbrand => 
                                  <MenuItem value={wbrand.id}>{wbrand.name}</MenuItem>
                                  )}
                              
                                </Select>
                              </FormControl>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP">
                                <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Name/Model" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                              <FormControl fullWidth >  
                                <TextField size="small" id="outlined-basic" label="Outlet" variant="outlined"
                                  name="outlet"  
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={outlet} onChange={(e) => setOutlet(e.target.value)}/>
                              </FormControl>
                                
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                                <FormControl fullWidth >  
                                  <TextField size="small" id="outlined-basic" label="Current" variant="outlined"
                                    name="current"  
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end">A</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={current} onChange={(e) => setCurrent(e.target.value)}/>
                                </FormControl>
                                
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                                <FormControl fullWidth >  
                                  <TextField size="small" id="outlined-basic" label="Diameter" variant="outlined"
                                    name="diameter"  
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={diameter} onChange={(e) => setDiameter(e.target.value)}/>
                                </FormControl>
                                
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 insideFormBP powerKW-PR inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                Power to KW
                                </Typography>
                                <Slider onChange={(event, value) => setPowerKW(value)}
                                    defaultValue={(powerKW) ? powerKW : 15}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={null}
                                    marks={marksKW}
                                    min={0.75}
                                    max={30}
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div class="form-group">
                                    <textarea class="form-control form-control-lg"  value={description} onChange={(e) => setDescription(e.target.value)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-12 accessory_file waterPumFile">
                                <div className="dropzone-card">
                                    <div className="dropzone">
                                        <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                            <input {...getInputProps()} />
                                            <p>Upload image</p>
                                        </div>
                                    </div>
                                    <div className="dropzone-content" style={thumbsContainer}>
                                        {thumbs}
                                        {(files.length === 0 )? ((oldImage!=="" && oldImage!==undefined)? (<spam>
                                        <span className={`sp_right_padding`}>Cuurent Image </span>
                                        <span><img src={`http://localhost:8000/brand/pumpbrand/pump_list/${oldImage}`} class="img-thumbnail rounded acc_img_width"  alt="Responsive"></img></span>
                                      </spam>): ''): ''}
                                    </div>
                                </div>
                            </div>
                          </div>
                  </div>
              </div>
            </DialogContent>
            
            <DialogActions>
            <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>
            </DialogActions>
            </form>
        </Dialog>
    );
}