import React,{useEffect,useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Widget from "components/Widget/index";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';

//country flag
import Flags from 'country-flag-icons/react/3x2'

//form import
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';

//slider
import CardBox from 'components/CardBox';
import Sliderr from "react-slick";

//dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
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


//slider 
  const options = {
    // dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow:3,
    marginRight: 5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false
        }
      }, {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['One', 'Two', 'Three'];
}


//dialog
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

//end dialog

function getFlag(countryname) {
  switch (countryname) {
    case 'Afghanistan':
      return <Flags.AF title="United States" className="customflag"/> ;
    case 'Italy':
      return <Flags.IT title="United States" className="customflag"/> ;
    case 'China':
      return <Flags.CH title="United States" className="customflag" />;
     case 'Iran':
     return <Flags.IR title="United States" className="customflag"/> ;
    default:
      return '';
  }
}
export default function Project() {

  //solar and pump
  const solarbrand=(id,index) => {
    setSolarstate(index);
    setSolarvalue(id);
  }

  const pumpbrand=(id,index) => {
    setPumpstate(index);
    setPumpvalue(id);
  }

  function toggelactivestyle(index) {
    if(solarstate===index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }

    function toggelactivestylepump(index) {
    if(pumpstate===index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }
//end solar and brand  
//Dialog
 const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
//start steeper
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    };
//end stepper 

//database data 
const [location,setLocation]=useState([]);
const [solar,setSolar]=useState([]);
const [pump,setPump]=useState([]);
const [accessories,setAccessories]=useState([]);
const [uom,setUom]=useState([]);
//pump and solar
const [solarstate,setSolarstate]=useState('');
const [pumpstate,setPumpstate]=useState('');
const [solarvalue,setSolarvalue]=useState('');
const [pumpvalue,setPumpvalue]=useState('');
//end pump and solar  
    
//start form value    
const [projectname,setProjectname]=React.useState("");
const [country,setCountry]=React.useState({});
const [city,setCity]=React.useState({});   
const [daynomichead,setDaynomichead]=useState(""); 
const [motorcable,setMotorcable]=React.useState("");
const [piplenght,setPiplenght]=React.useState("");    
const [dirtloss,setDirtloss]=React.useState("");
const [discharge,setDischarge]=React.useState("");   

//start dynomic form
 const handlseelctitem=(event,value,id) => {  
     inputFields[id].item=value.id;
  }

  const handlselectuom=(event,value,index) => {
   inputFields[index].uomid=value.id;
  }

  const handlchangquantity=(value, index) => {
     inputFields[index].quantity=value;
  }

const [inputFields, setInputFields] = useState([
        {id: '',item: '',uomid: '',quantity: ''},
        {id: '',item: '',uomid: '',quantity: ''},
        { id: '',item: '',uomid: '', quantity: ''},
]);
  
const handleAddFields = () => {
    setInputFields([...inputFields, { id: '', item: '', uomid: '', quantity: ''}])
}
  
const handleRemoveFields = () => {
    const values  = [...inputFields];
    values.splice(values.length-1, 1);
    setInputFields(values);
  }

    useEffect(() => {
        getProjectdata();
  },[])

  const getProjectdata=async () => {
    axios.get('api/gitprojectdata')
      .then(res => {  
        setLocation(res.data.geolocation);
        setSolar(res.data.solarbrand);
        setPump(res.data.pumpbrand);
        setAccessories(res.data.accessories);
        setUom(res.data.uom);
      
      }
        
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
  };


  const [imagepath,setImagepath]=useState('/images/General layout.png');
  const [myImage,setMyImage]=useState('img-thumbnail rounded mx-auto d-block');
  const [foucus,setFoucus]=useState(false);

  const dirtlossMouseOver=(wichInput,wichfunction) => {
    if(wichInput==="dirt" &&wichfunction==="focus") {
       setFoucus(true)
       setMyImage('img-thumbnail rounded mx-auto d-block')
       setImagepath('/images/System layout.png')
    }

    if(wichInput==="dirt"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/System layout.png')
      }
     
     }

    if(wichInput==="motor"&&wichfunction==="focus") {
      setFoucus(true)
      setMyImage('img-thumbnail rounded mx-auto d-block')
      setImagepath('/images/Motor Cable layout.png')
    }

    if(wichInput==="motor"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Motor Cable layout.png')
      }  
    }

    if(wichInput==="head"&&wichfunction==="focus") {
        setFoucus(true)
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Hight layout.png')
    }

    if(wichInput==="head"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Hight layout.png')
      }
    }

    if(wichInput==="temp"&&wichfunction==="focus") {
         setFoucus(true)
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/System details layout.png')
    }
    if(wichInput==="temp"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/System details layout.png')
      } 
    }

    if(wichInput==="pip"&&wichfunction==="focus") {
         setFoucus(true)
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Pipe layout.png')
    }
    if(wichInput==="pip"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Pipe layout.png')
      } 
    }
  }
  const dirtlossMouseLeave=(wichfunction) => {
    if(wichfunction==="fout") {
         setFoucus(false)
     setMyImage(' img-thumbnail rounded mx-auto d-block')
     setImagepath('/images/General layout.png')
    }

     if(!foucus) {
       setMyImage(' img-thumbnail rounded mx-auto d-block')
       setImagepath('/images/General layout.png')
    }
    
  }

  const [evaluation,setEvaluation]=useState(false);
              
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
          <Paper elevation={0} className="mb-3 p-4">
              
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
         
                                      
    {
    activeStep===0? (
    <div className="row">
        <div className="col-md-4">
                                          
            {/* <div className="col-md-12 p-0 customWidgetHover" onClick={handleClickOpen}>  
             <Widget styleName={`bg-success  text-white`}>
              <div className="text-center">
                <h3 className="jr-font-weight-medium">select brand</h3>
              </div>
              </Widget>
                      </div> */}
             <Button size="large" color="secondary" variant="outlined" className="form-control" onClick={handleClickOpen}>Select Brand</Button>           
                      {/* start dialog */}
                   <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth="sm">
                      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Brand Managment
                      </DialogTitle>
                        <DialogContent dividers>
                          <b>Solar Brands</b> 
                    
                          <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center">
                           
                            <Sliderr className="slick-app-frame" {...options}>
                           
                          {solar.map((data,index) => {  
                            return <span key={index} onClick={()=> solarbrand(data.id,index)} >        
                            <div   className="slick-slide-item">
                              <div className={toggelactivestyle(index)}>
                                  <div>
                                  <img src={`http://localhost:8000/brand/solar/${data.image}`}  className="img-thumbnail rounded mx-auto d-block imagebrandhieght" alt="Responsive" />
                                </div>
                                  <span> {data.country} {getFlag(data.country)}  </span>
                              
                             
                              </div>
                                </div>
                              </span>         
                            })} 
                                    
                          </Sliderr>        
                          </CardBox>
                          <b>Water pump brands</b> 
                        <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center">
                            <Sliderr className="slick-app-frame " {...options}>
                                        {pump.map((data,index) => {  
                                          return <span key={index} onClick={() => pumpbrand(data.id,index)}>        
                                <div class="slick-slide-item">
                                  <div  className={toggelactivestylepump(index)}>
                                      <div>
                                      <img src={`http://localhost:8000/brand/pumpbrand/${data.image}`}  className="img-thumbnail rounded mx-auto d-block imagebrandhieght" alt="Responsive" />
                                                </div>
                                       <span> {data.country} {getFlag(data.country)}  </span>          
                                  </div>
                                        </div>
                                  </span>         
                                })} 
                              </Sliderr>        
                          </CardBox>     
                      </DialogContent>
                      <DialogActions>
                        <Button  onClick={handleClose} color="primary" variant="contained" >
                          Done
                        </Button>
                      </DialogActions>
                      </Dialog>

                      {/* end dialog */}


                      <Divider className="mb-3 mt-3" />
                      
            <div className="col-md-12 p-0">  
                <TextField className="form-control" id="outlined-basic" label="Poject Name" variant="outlined"
                placeholder="Project name !"
                margin="normal"
                size="small"                                  
                name="project_name" 
                value={projectname}    
                onChange={(event)=> setProjectname(event.target.value)}    
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>  

        <div className="row">
           <div className="col-md-6">  
          <Autocomplete  size="small"
            id="country-select-demo" value={country}  onChange={(event, newValue) => {setCountry(newValue);}}
            style={{ width: 300 }}
            options={location}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.country}
            renderOption={(option) => (
            <React.Fragment>
                {option.country}
            </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    size="small" 
                {...params}
                label="Select Country"
                variant="outlined"    
                placeholder="pick the country !"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', 
                }}
              />
                    )}
                /> 
            </div> 

            <div className="col-md-6">  
            <Autocomplete  size="small"
            id="country-select-demo" value={city} onChange={(event, newValue) => {setCity(newValue);}}
            style={{ width: 300 }}
            options={location}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.city}
            renderOption={(option) => (
            <React.Fragment>
                {option.city}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Select the City"
                variant="outlined"
                placeholder="pick the City !"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
                }}
               />
                )}
              />
                 </div> 
             </div>  

            <Divider className="mb-3 mt-3"/>  

            <div className="col-md-12 p-0">
             <TextField id="outlined-basic" className="form-control" label="Head" variant="outlined"
                placeholder="Head !"
                margin="normal"
                name="head" 
                type="number" 
                size="small"     
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
                InputLabelProps={{
                  shrink: true,
                      }}
                  value={daynomichead}   
                   onChange={(event) => setDaynomichead(event.target.value)} 
                    onMouseOver={()=> dirtlossMouseOver('head','hover')}
                    onMouseLeave={()=> dirtlossMouseLeave('xy')}
                    onFocus={() => dirtlossMouseOver('head','focus')}
                    onBlur={()=> dirtlossMouseLeave('fout')}       
                 />
            </div>  
                                                
            <div className="row">
                <div className="col-md-6">
                <TextField id="outlined-basic" label="Motor Cable" variant="outlined"
                placeholder="Motor cable!"
                margin="normal"
                name="motor_cable" 
                type="number"
                size="small"                                      
                InputLabelProps={{
                shrink: true,
                    }}
                  InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
                      }} 
                  value={motorcable}   
                  onChange={(event) => setMotorcable(event.target.value)}  
                      onMouseOver={()=> dirtlossMouseOver('motor','hover')}
                     onMouseLeave={()=> dirtlossMouseLeave('xy')}
                     onFocus={() => dirtlossMouseOver('motor','focus')}
                    onBlur={()=> dirtlossMouseLeave('fout')}  
             />
                </div>
                    <div className="col-md-6">
                <TextField id="outlined-basic" label="Pipe-lenght" variant="outlined"
                placeholder="Pipe lenght!"
                margin="normal"
                name="motor_cable" 
                type="number"
                size="small"                                      
                InputLabelProps={{
                shrink: true,
                    }}
                  InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
                      }} 
                  value={piplenght}   
                     onChange={(event) => setPiplenght(event.target.value)}
                     onMouseOver={()=> dirtlossMouseOver('pip','hover')}
                     onMouseLeave={()=> dirtlossMouseLeave('xy')}
                     onFocus={() => dirtlossMouseOver('pip','focus')}
                     onBlur={()=> dirtlossMouseLeave('fout')}           
                    
             />
                    </div>
            </div> 
             <div className="row">
            <div className="col-md-6">
              <TextField id="outlined-basic" label="Discharge" variant="outlined"
                placeholder="Discharge !"
                margin="normal"
                name="discharge" 
                size="small"                                      
                type="number"      
                InputProps={{
                  endAdornment: <InputAdornment position="end">m<sup>3</sup></InputAdornment>,
                }}
                InputLabelProps={{
                  shrink: true,
                      }}
                  value={discharge}   
                   onChange={(event) => setDischarge(event.target.value)} 
                     onMouseOver={()=> dirtlossMouseOver('dirt','hover')}
                     onMouseLeave={()=> dirtlossMouseLeave('xy')}
                     onFocus={() => dirtlossMouseOver('dirt','focus')}
                    onBlur={()=> dirtlossMouseLeave('fout')}     
              />                   
            </div>

            <div className="col-md-6">
              <TextField id="outlined-basic" label="Dirt loss" variant="outlined" size="small"
                placeholder="Dirt loss !"
                margin="normal"
                name="dist_loss" 
                type="number"      
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                InputLabelProps={{
                  shrink: true,
                      }}
                  value={dirtloss}   
                   onChange={(event) => setDirtloss(event.target.value)} 
                     onMouseOver={()=> dirtlossMouseOver('dirt','hover')}
                     onMouseLeave={()=> dirtlossMouseLeave('xy')}
                     onFocus={() => dirtlossMouseOver('dirt','focus')}
                    onBlur={()=> dirtlossMouseLeave('fout')}     
              />                   
             </div>                                 
                
                      </div> 

         <Divider className="mb-3 mt-3"/>                

          <Button size="large" color="primary" variant="contained" className="form-control mb-3" onClick={()=> setEvaluation(true)}>Evaluation</Button>          
                                                                     
        </div>
       
        
          <div className="col-md-8">
          {
                        evaluation===true? (
            <>              
                          <div className="row m-3">
                            <div className="col-md-4"><strong>Project Name:</strong> {projectname} </div>
                            <div className="col-md-4"><strong>Country Name:</strong> {country.country}</div>
                            <div className="col-md-4"><strong>City Name:</strong> {city.city}</div>
                          </div>

                           <div className="row m-3">
                            <div className="col-md-4"><strong>Head :</strong> {daynomichead} m</div>
                            <div className="col-md-4"><strong>Motor Cable:</strong> {motorcable} m</div>
                            <div className="col-md-4"><strong>Pip Lenght:</strong> {piplenght} m</div>
                            </div>

                            <div className="row m-3">
                            <div className="col-md-4"><strong>Discharge:</strong> {discharge} m<sup>3</sup></div>  
                            <div className="col-md-4"><strong>Dirt loss :</strong> {dirtloss} %</div>
                            <div className="col-md-4"><strong>Pip Lenght:</strong> {piplenght} m</div>
                            </div>

                          </>  

                        ): (
               <img src={imagepath} className={myImage} alt="Responsive" />               
            )}                
                                         
        </div>                                  
                                      
    </div>
      ):""}

              

    {
    activeStep===1? (
        <div className="row">
        <div className="col-md-4">

        <h3>Project Accessories</h3>                                  
        {inputFields.map((inputField,index) => (      
              
              <div className="row">  
              <div className="col-md-6">
                    
            <FormControl fullWidth >  
              <Autocomplete  
            id="country-select-demo"  onChange={(event, newValue) => handlseelctitem(event,newValue,index)}
            style={{ width: 300 }}
            options={accessories}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
            <React.Fragment>
                {option.name}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Item"
                variant="outlined"
                placeholder="pick item !"
                margin="normal"
                name="item"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
               />
                )}
              />  
              </FormControl>
                </div>  

         <div className="col-md-3">
            <FormControl fullWidth >  
              <Autocomplete  
            id="country-select-demo"   onChange={(event, newValue) => handlselectuom(event,newValue,index)}
            style={{ width: 300 }}
            options={uom}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.acronym}
            renderOption={(option) => (
            <React.Fragment>
                {option.acronym}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="UoM"
                variant="outlined"
                placeholder="pick UoM!"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                />
                )}
              />  
              </FormControl>
                </div>
                  <div className="col-md-3">
                    
              <FormControl fullWidth >  
              <TextField id="outlined-basic" label='Quantity'
              variant="outlined"
                placeholder="Quantity"
                margin="normal"
                name="Quantity" 
                onChange= {(event)=> handlchangquantity(event.target.value, index)}     
                 //value={inputFields.quantity}      
                InputLabelProps={{
                shrink: true,
                      }}
                
              size="small"    
             />
                </FormControl>   
                </div>
              </div>             
            ))}  

            
               <IconButton color="primary" aria-label="upload picture" component="span"  onClick={handleAddFields}>
                 <span class="material-icons">
                          add_circle_outline
                          </span>
              </IconButton>

              <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleRemoveFields} disabled={inputFields.length<=1}>
                 <span class="material-icons">
                          remove_circle_outline
                          </span>
              </IconButton>
        </div>
        <div className="col-md-8">
            <img src="/images/General layout.png" className=" img-thumbnail rounded mx-auto d-block" alt="Responsive" />                          
        </div>
        </div>
    ):""}

        {
          activeStep===2? (
                  <div className="row">
                    <div className="col-md-3">
                       <TextField id="outlined-basic" className="form-control" label="Head" variant="outlined"
                          placeholder="Head !"
                          margin="normal"
                          name="head" 
                          type="number" 
                          size="small"     
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m</InputAdornment>,
                          }}
                          InputLabelProps={{
                            shrink: true,
                                }}
                              
                      />
                      
                       <TextField id="outlined-basic" className="form-control" label="Head" variant="outlined"
                          placeholder="Head !"
                          margin="normal"
                          name="head" 
                          type="number" 
                          size="small"     
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m</InputAdornment>,
                          }}
                          InputLabelProps={{
                            shrink: true,
                                }}
                              
                      />
                      

                       <TextField id="outlined-basic" className="form-control" label="Head" variant="outlined"
                          placeholder="Head !"
                          margin="normal"
                          name="head" 
                          type="number" 
                          size="small"     
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m</InputAdornment>,
                          }}
                          InputLabelProps={{
                            shrink: true,
                                }}
                              
                      />
                      
                    </div>
                    <div className="col-md-9">
                      <div className="row justify-content-center ">
                          <Alert severity="success" color="info">
                          <h1 color="success">Congratulations Project Successfully Inserted !</h1>  
                            
                          </Alert>

                          <p className="mt-3 p-4">

                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
                          </p>

                          <Button variant="contained" color="success" className="mt-5 p-3" size="large">
                        
                            View project summary
                          </Button>

                        </div> 
                    </div>
                  </div> 
        ): ""  }           
                                   
                       
            <div>
                <Button
                variant="contained" color="secondary"               
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
                  )}


      </Paper>
      <NotificationContainer/>
    </div>
  );
}
