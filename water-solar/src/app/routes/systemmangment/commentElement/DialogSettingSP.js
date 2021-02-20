import React, { useState, useEffect } from "react";
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
// code for small steps
import Slider from '@material-ui/core/Slider';
// import WaterPumpDeviceSettingForm from './WaterPumpDeviceSettingForm';
// end import for dialog 
// start of dialog modal for Solar Panal 
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
  // end of dialog modal for Solar Panal 


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
  const marksP = [
    {
      value: 0,
      label: '0W',
    },
    {
      value: 240,
      label: '240W',
    },
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
export default function DialogSettingWD(props){
    // start code of dialog modal for Solar Panal 
    const {openSPD, setOpenSPD} = props;
    const handleClose = () => {
      setOpenSPD(false);
    };
    // end code of dialog modal for Solar Panal 

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
    const [power, setPower] = useState([20, 37]);
    const [quantity, setQuantity] = useState("");
    const [panal, setPanal] = useState("");
    const [base, setBase] = useState("");

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            power, base, quantity, panal, files
        }
        console.log(data);
    }
    return (
        <Dialog onClose={handleClose} className="dialogWD"  aria-labelledby="customized-dialog-title" open={openSPD}>
           <form autoComplete="off" onSubmit={handleSubmit}>  
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Setup
            </DialogTitle>
            <DialogContent dividers>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <div className="row insideSPDS">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                           <Typography id="range-slider" gutterBottom>
                                Power
                            </Typography>
                            <Slider onChange={(event, value) => setPower(value)}
                                value={power}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={valuetext}
                                min={0}
                                max={240}
                                marks={marksP}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked onChange={(e) => setBase(e.target.value)}/>
                                <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onChange={(e) => setBase(e.target.value)} />
                                <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPS3 inputAdornmentWrap">
                            <TextField size="small" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                id="outlined-number"
                                label="Quantity"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 insideFormPaddingWPS ">
                            <TextField size="small" value={panal} onChange={(e) => setPanal(e.target.value)}
                                id="outlined-number"
                                label="Panal"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-12 accessory_file waterPumFile">
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