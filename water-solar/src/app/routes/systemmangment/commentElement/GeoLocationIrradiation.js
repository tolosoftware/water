import React, { useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// start code for bar chart
import CardBox from 'components/CardBox';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
// end code for bar chart

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
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
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
      footerAcc: {
        backgroundColor: 'rgba(0 0 0 / 20%)',
        borderBottom: '1px solid rgba(0 0 0 / 30%)',
      },
      
    }));
  // Accordation code 
    
  // end Accordation code
export default function DialogWaterP(props){
  const [expanded, setExpanded] = useState('January');
  const handleChangePanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
    // start code of dialog modal for water pump
    const {openGeoIr, setOpenGeoIr} = props;
    
    const [inputFieldsIrr1, setInputFieldsIrr1] = useState([
      { id: uuidv4(), month: 'January', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr2, setInputFieldsIrr2] = useState([
      { id: uuidv4(), month: 'February', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr3, setInputFieldsIrr3] = useState([
      { id: uuidv4(), month: 'March', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr4, setInputFieldsIrr4] = useState([
      { id: uuidv4(), month: 'April', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr5, setInputFieldsIrr5] = useState([
      { id: uuidv4(), month: 'May', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr6, setInputFieldsIrr6] = useState([
      { id: uuidv4(), month: 'June', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr7, setInputFieldsIrr7] = useState([
      { id: uuidv4(), month: 'July', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr8, setInputFieldsIrr8] = useState([
      { id: uuidv4(), month: 'August', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr9, setInputFieldsIrr9] = useState([
      { id: uuidv4(), month: 'Sebtember', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr10, setInputFieldsIrr10] = useState([
      { id: uuidv4(), month: 'October', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr11, setInputFieldsIrr11] = useState([
      { id: uuidv4(), month: 'November', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr12, setInputFieldsIrr12] = useState([
      { id: uuidv4(), month: 'December', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const monthsInputFields=[
      'January','February','March','April','May','June','July','August','September','October', 'November', 'December'
    ];
    const timeLable = ['6:00-7:00 AM', '7:00-8:00 AM', '8:00-9:00 AM', '9:00-10:00 AM', '10:00-11:00 AM', '11:00-12:00 AM', '12:00-1:00 PM', '1:00-2:00 PM','2:00-3:00 PM','3:00-4:00 PM','4:00-5:00 PM','5:00-6:00 PM'];
    
    const timeName = ['time6_7', 'time7_8', 'time8_9', 'time9_10', 'time10_11', 'time11_12', 'time12_1', 'time1_2', 'time2_3', 'time3_4', 'time4_5', 'time5_6'];
    const data = [
      {name: '6-7', Irradiation: 4, amt: 2400},
      {name: '7-8', Irradiation: 3, amt: 2210},
      {name: '8-9', Irradiation: 2, amt: 2290},
      {name: '9-10', Irradiation: 2, amt: 2000},
      {name: '10-11', Irradiation: 1, amt: 2181},
      {name: '11-12', Irradiation: 2, amt: 2500},
      {name: '12-1', Irradiation: 30, amt: 2100},
      {name: '1-2', Irradiation: 90, amt: 2100},
      {name: '2-3', Irradiation: 40, amt: 2100},
      {name: '3-4', Irradiation: 49, amt: 2100},
      {name: '4-5', Irradiation: 9, amt: 2100},
      {name: '5-6', Irradiation: 10, amt: 2100},
    ];
    
   
    const handleClose = () => {
        setOpenGeoIr(false);
    };
    // end code of dialog modal for water pump
     
    const classes = useStyles();
   
    const handleSubmit = (e, InputFieldsIrr) => {
      e.preventDefault();
      console.log("IrradiationInputs", InputFieldsIrr);
    }
    

    const handleChangeInput = (month, event) => {

      if(month === "January"){
        const newInputFieldsIrr = inputFieldsIrr1.map(i => {
          i[event.target.name] = event.target.value
          return i;
          // console.log("tartget name: " + i[event.target.name] + "target value" + event.target.value);
        })
        setInputFieldsIrr1(newInputFieldsIrr);
        // console.log("month" + month + "event" + event );
      }
      if (month === "February"){
        const newInputFieldsIrr = inputFieldsIrr2.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr2(newInputFieldsIrr);
      }  
      if (month === "March"){
        const newInputFieldsIrr = inputFieldsIrr3.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr3(newInputFieldsIrr);
      }  
      if (month === "April"){
        const newInputFieldsIrr = inputFieldsIrr4.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr4(newInputFieldsIrr);
      }  
      if (month === "May"){
        const newInputFieldsIrr = inputFieldsIrr5.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr5(newInputFieldsIrr);
      }  
      if (month === "June"){
        const newInputFieldsIrr = inputFieldsIrr6.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr6(newInputFieldsIrr);
      }  
      if (month === "July"){
        const newInputFieldsIrr = inputFieldsIrr7.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr7(newInputFieldsIrr);
      }  
      if (month === "August"){
        const newInputFieldsIrr = inputFieldsIrr8.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr8(newInputFieldsIrr);
      }  
      if (month === "September"){
        const newInputFieldsIrr = inputFieldsIrr9.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr9(newInputFieldsIrr);
      }  
      if (month === "October"){
        const newInputFieldsIrr = inputFieldsIrr10.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr10(newInputFieldsIrr);
      }  
      if (month === "November"){
        const newInputFieldsIrr = inputFieldsIrr11.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr11(newInputFieldsIrr);
      }  
      if (month === "December"){
        const newInputFieldsIrr = inputFieldsIrr12.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr12(newInputFieldsIrr);
      }  
      
    }
     
    let myVar;
    const loadMyForm = (inputFieldsIrrs) => {
      // console.log("In it the value of inputFieldsIrr: "+inputFieldsIrr);
      
      return (

          <>
          {inputFieldsIrrs.map(inputFieldsIrr => (
          <form autoComplete="off" onSubmit={e => handleSubmit(e, inputFieldsIrr)} key={inputFieldsIrr.id}>
                    <Accordion defaultExpanded={inputFieldsIrr.month=== 'January'} expanded={expanded === inputFieldsIrr.month} onChange={handleChangePanel(inputFieldsIrr.month)}>
                        <AccordionSummary className={classes.rootAcc}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography >{inputFieldsIrr.month} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="row barCharGeo">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <div className="row " key={myVar = inputFieldsIrr.month}>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[0]} size="small" className="fullWidthInput" name={timeName[0]} label={timeLable[0]} value={inputFieldsIrr.time6_7} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[1]} size="small" className="fullWidthInput" name={timeName[1]} label={timeLable[1]} value={inputFieldsIrr.time7_8} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[2]} label={timeLable[2]} size="small" className="fullWidthInput" name={timeName[2]} label={timeLable[2]} value={inputFieldsIrr.time8_9} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[3]} size="small" className="fullWidthInput" name={timeName[3]} label={timeLable[3]} value={inputFieldsIrr.time9_10} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[4]} size="small" className="fullWidthInput" name={timeName[4]} label={timeLable[4]} value={inputFieldsIrr.time10_11} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[5]} label={timeLable[5]} size="small" className="fullWidthInput" name={timeName[5]} label={timeLable[5]} value={inputFieldsIrr.time11_12} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[6]} size="small" className="fullWidthInput" name={timeName[6]} label={timeLable[6]} value={inputFieldsIrr.time12_1} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[7]} size="small" className="fullWidthInput" name={timeName[7]} label={timeLable[7]} value={inputFieldsIrr.time1_2} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[8]} size="small" className="fullWidthInput" name={timeName[8]} label={timeLable[8]} value={inputFieldsIrr.time2_3} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[9]} size="small" className="fullWidthInput" name={timeName[9]} label={timeLable[9]} value={inputFieldsIrr.time3_4} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[10]} size="small" className="fullWidthInput" name={timeName[10]} label={timeLable[10]} value={inputFieldsIrr.time4_5} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputFieldsIrr.month+timeName[11]} size="small" className="fullWidthInput" name={timeName[11]} label={timeLable[11]} value={inputFieldsIrr.time5_6} onChange={(event) => handleChangeInput(inputFieldsIrr.month, event)} variant="outlined" />
                                        </div>
                                         
                                    </div>
                            </div>
                            <CardBox heading="" >
                              <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={data}
                                          margin={{top: 10, right: 0, left: -15, bottom: 0}}>
                                  <XAxis dataKey="name"/>
                                  <YAxis/>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <Tooltip/>
                                  <Legend/>
                                  <Bar dataKey="Irradiation" fill="#3367d6"/>
                                  {/* <Bar dataKey="uv" fill="#ffc658"/> */}
                                </BarChart>
                              </ResponsiveContainer>
                            </CardBox>
                        </div>
                        
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions className={classes.footerAcc}>
                        <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Save</Button>
                          {/* <Button size="small" color="primary" type="submit" >
                            Save
                          </Button> */}
                        </AccordionActions>
                    </Accordion>
                    </form>
                    ))}
          </>
      );
    }
    return (
        <Dialog onClose={handleClose}  aria-labelledby="customized-dialog-title" open={openGeoIr} maxWidth="md" fullWidth='md'>
            {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Set Irradiation For: kabul
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.Acc}>
                {/* { monthsInputFields.map(monthInputFields => ( */}
                  <>
                   
                  {monthsInputFields[0] === "January" && loadMyForm(inputFieldsIrr1)}
                  {monthsInputFields[1] === "February" && loadMyForm(inputFieldsIrr2)}
                  {monthsInputFields[2] === "March" && loadMyForm(inputFieldsIrr3)}
                  {monthsInputFields[3] === "April" && loadMyForm(inputFieldsIrr4)}
                  {monthsInputFields[4] === "May" && loadMyForm(inputFieldsIrr5)}
                  {monthsInputFields[5] === "June" && loadMyForm(inputFieldsIrr6)}
                  {monthsInputFields[6] === "July" && loadMyForm(inputFieldsIrr7)}
                  {monthsInputFields[7] === "August" && loadMyForm(inputFieldsIrr8)}
                  {monthsInputFields[8] === "September" && loadMyForm(inputFieldsIrr9)}
                  {monthsInputFields[9] === "October" && loadMyForm(inputFieldsIrr10)}
                  {monthsInputFields[10] === "November" && loadMyForm(inputFieldsIrr11)}
                  {monthsInputFields[11] === "December" && loadMyForm(inputFieldsIrr12)}
                    </>
                  {/* // )) } */}
                </div>
              
            </DialogContent>
            
            <DialogActions>
            {/* <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button> */}
            </DialogActions>
            {/* </form> */}
        </Dialog>
    );
}