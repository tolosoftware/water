import React, {useEffect, useState} from "react";
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
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
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
  const [expanded, setExpanded] = useState(1);
  const geoLocationId = props.geoLocationId;
  const geoLocationCity = props.geoLocationCity;
  const handleChangePanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
    // start code of dialog modal for water pump
    const {openGeoIr, setOpenGeoIr} =props;
    useEffect(() => {
      // getIrradiations(geoLocationId);
      // console.log('inside modal:', props)
    },[])
    const [inputFieldsIrr1, setInputFieldsIrr1] = useState([
      { id: uuidv4(), geolocation_id: '' ,month_id: 1, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr2, setInputFieldsIrr2] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 2, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr3, setInputFieldsIrr3] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 3, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr4, setInputFieldsIrr4] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 4, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr5, setInputFieldsIrr5] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 5, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr6, setInputFieldsIrr6] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 6, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr7, setInputFieldsIrr7] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 7, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr8, setInputFieldsIrr8] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 8, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr9, setInputFieldsIrr9] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 9, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr10, setInputFieldsIrr10] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 10, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr11, setInputFieldsIrr11] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 11, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const [inputFieldsIrr12, setInputFieldsIrr12] = useState([
      { id: uuidv4(), geolocation_id: '', month_id: 12, time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,]);

    const monthsInputFields=[
      'January','February', 'March','April','May','June','July','August','September','October', 'November', 'December'
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
    
    const getIrradiations = (geoLocationId) =>{
      // alert(geoLocationId);
      axios.get('api/irradiation/'+geoLocationId)
          .then(res => {  
              // setVisibility(false)
              console.log(res);
              alert(res);
            }
        ).catch(err => {
              // setVisibility(false)
               NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                  id="notification.titleHere"/>);
              }
          )
    }
    const handleSubmit = (e, InputFieldsIrr) => {
      e.preventDefault();
      console.log("IrradiationInputs", InputFieldsIrr);
      
      axios.post('api/irradiation', InputFieldsIrr)
        .then(
            res => {
              console.log(res);
              // getIrradiations(geoLocationId);
              NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
              handleClose();
            }
        ).catch(
            err =>{
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
                console.log(err);
            } 
        )
    }

    const handleChangeInput = (month_id, event) => {

      if(month_id === 1){
        const newInputFieldsIrr = inputFieldsIrr1.map(i => {
          i[event.target.name] = event.target.value
          return i;
          // console.log("tartget name: " + i[event.target.name] + "target value" + event.target.value);
        })
        setInputFieldsIrr1(newInputFieldsIrr);
        // console.log("month_id" + month_id + "event" + event );
      }
      else if (month_id === 2){
        const newInputFieldsIrr = inputFieldsIrr2.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr2(newInputFieldsIrr);
      }  
      else if (month_id === 3){
        const newInputFieldsIrr = inputFieldsIrr3.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr3(newInputFieldsIrr);
      }  
      else if (month_id === 4){
        const newInputFieldsIrr = inputFieldsIrr4.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr4(newInputFieldsIrr);
      }  
      else if (month_id === 5){
        const newInputFieldsIrr = inputFieldsIrr5.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr5(newInputFieldsIrr);
      }  
      else if (month_id === 6){
        const newInputFieldsIrr = inputFieldsIrr6.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr6(newInputFieldsIrr);
      }  
      else if (month_id === 7){
        const newInputFieldsIrr = inputFieldsIrr7.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr7(newInputFieldsIrr);
      }  
      else if (month_id === 8){
        const newInputFieldsIrr = inputFieldsIrr8.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr8(newInputFieldsIrr);
      }  
      else if (month_id === 9){
        const newInputFieldsIrr = inputFieldsIrr9.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr9(newInputFieldsIrr);
      }  
      else if (month_id === 10){
        const newInputFieldsIrr = inputFieldsIrr10.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr10(newInputFieldsIrr);
      }  
      else if (month_id === 11){
        const newInputFieldsIrr = inputFieldsIrr11.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr11(newInputFieldsIrr);
      }  
      else if (month_id === 12){
        const newInputFieldsIrr = inputFieldsIrr12.map(i => {
          i[event.target.name] = event.target.value
          return i;
        })
        setInputFieldsIrr12(newInputFieldsIrr);
      }  
    }
     
    const loadMyForm = (inputFieldsIrrs) => {
      return (
          <>
          {inputFieldsIrrs.map(inputFieldsIrr => (
          <form autoComplete="off" onSubmit={e => handleSubmit(e, inputFieldsIrr)} key={inputFieldsIrr.id} key1={inputFieldsIrr.geolocation_id=geoLocationId}>
                    <Accordion defaultExpanded={inputFieldsIrr.month_id===1} expanded={expanded === inputFieldsIrr.month_id} onChange={handleChangePanel(inputFieldsIrr.month_id)}>
                        <AccordionSummary className={classes.rootAcc}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography >{monthsInputFields[inputFieldsIrr.month_id-1]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="row barCharGeo">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <div className="row row-paddding-top">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[0]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[0]} label={timeLable[0]} value={inputFieldsIrr.time6_7} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[1]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[1]} label={timeLable[1]} value={inputFieldsIrr.time7_8} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[2]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[2]} label={timeLable[2]} value={inputFieldsIrr.time8_9} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[3]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[3]} label={timeLable[3]} value={inputFieldsIrr.time9_10} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[4]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[4]} label={timeLable[4]} value={inputFieldsIrr.time10_11} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[5]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[5]} label={timeLable[5]} value={inputFieldsIrr.time11_12} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[6]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[6]} label={timeLable[6]} value={inputFieldsIrr.time12_1} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[7]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[7]} label={timeLable[7]} value={inputFieldsIrr.time1_2} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[8]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[8]} label={timeLable[8]} value={inputFieldsIrr.time2_3} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[9]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[9]} label={timeLable[9]} value={inputFieldsIrr.time3_4} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[10]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[10]} label={timeLable[10]} value={inputFieldsIrr.time4_5} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={timeName[11]+inputFieldsIrr.month_id} size="small" className="fullWidthInput" name={timeName[11]} label={timeLable[11]} value={inputFieldsIrr.time5_6} onChange={(event) => handleChangeInput(inputFieldsIrr.month_id, event)} variant="outlined" />
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
              Set Irradiation For: {geoLocationCity}
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.Acc} onLoad={()=>getIrradiations(geoLocationId)}>
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