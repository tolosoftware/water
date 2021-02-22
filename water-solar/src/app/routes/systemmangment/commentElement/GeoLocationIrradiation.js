import React, { useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// end import for dialog 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
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
      rootAcc: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
      },
      headingAccAcc: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },  
    }));
  
export default function DialogWaterP(props){
    // start code of dialog modal for water pump
    const {openGeoIr, setOpenGeoIr} = props;
    const {time6_7, setTime6_7} = useState('');
    const [inputFieldsIrr, setInputFieldsIrr] = useState([
        { id: uuidv4(), month: '', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
      ]);
    const timeLable = ['(6:00-7:00)AM', '(7:00-8:00)AM', '(8:00-9:00)AM', '(9:00-10:00)AM', '(10:00-11:00)AM', '(11:00-12:00)AM', '(12:00-1:00)PM', '(1:00-2:00)PM','(2:00-3:00)PM','(3:00-4:00)PM','(4:00-5:00)PM','(5:00-6:00)PM'];
    const timeName = ['time6_7', 'time7_8', 'time8_9', 'time9_10', 'time10_11', 'time11_12', 'time12_1', 'time1_2', 'time2_3', 'time3_4', 'time4_5', 'time5_6'];
    const handleClose = () => {
        setOpenGeoIr(false);
    };
    // end code of dialog modal for water pump
     
    const classes = useStyles();
   
    const handleSubmit = (e) => {
      e.preventDefault();
        console.log("IrradiationInputs", inputFieldsIrr);
    }
    const handleChangeInput = (id, event) => {
        const newInputFieldsIrr = inputFieldsIrr.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setInputFieldsIrr(newInputFieldsIrr);
      }
    return (
        <Dialog onClose={handleClose}  aria-labelledby="customized-dialog-title" open={openGeoIr} maxWidth="xl" fullWidth='xl'>
            <form autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Set Irradiation For: kabul
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.Acc}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography className={classes.headingAcc}>January</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                                
                                { inputFieldsIrr.map(inputField => (
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[0]} label={timeLable[0]} value={inputField.time6_7} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[1]} label={timeLable[1]} value={inputField.time7_8} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[2]} label={timeLable[2]} value={inputField.time8_9} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[3]} label={timeLable[3]} value={inputField.time9_10} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[4]} label={timeLable[4]} value={inputField.time10_11} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[5]} label={timeLable[5]} value={inputField.time11_12} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[6]} label={timeLable[6]} value={inputField.time12_1} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[7]} label={timeLable[7]} value={inputField.time1_2} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[8]} label={timeLable[8]} value={inputField.time2_3} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[9]} label={timeLable[9]} value={inputField.time3_4} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[10]} label={timeLable[10]} value={inputField.time4_5} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 myFormControl">
                                            <TextField id="outlined-basic" size="small" className="fullWidthInput" name={timeName[11]} label={timeLable[11]} value={inputField.time5_6} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                         
                                    </div>
                                )) }
                               
                            </div>
                            
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12">

                            </div>
                        </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography className={classes.headingAcc}>February</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
              
            </DialogContent>
            
            <DialogActions>
            <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>
            </DialogActions>
            </form>
        </Dialog>
    );
}