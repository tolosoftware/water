import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from 'reactstrap';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import CardBox from 'components/CardBox';
import IntlMessages from 'util/IntlMessages';
import './custome.css';
//slider
import Slider from '@material-ui/core/Slider';
import Sliderr from "react-slick";

import ProductItem from "./ProductItem";
import {products} from './data'
//circal slider
import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";


//slider data and style 


function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

const dirtloss = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 37,
    label: '37%',
  },
  {
    value: 100,
    label: '100%',
  },
];



const countries = [
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },

];




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles=makeStyles((theme) => ({
    rootslider: {
      height: 200,
      marginLeft:40,
      
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
   option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  
   cardstyle:{
    padding: '0px',
    boxShadow: 'none',
} 
  

}));


const imagehieght = {
  height: '420px',
  width: '420px',
}
const panalwidth = {
    width: '1000px',
};




export default function VerticalTabs() {

//slider

  const options = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    marginRight: 10,
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

  // autocomplate
   const [country, setCountry] = React.useState({});
  //end autocomplate
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange=(event,newValue) => {
    console.log('this',event);
    
    setValue(newValue);
  };

  const navigate=(id) => {
     setValue(id);
  }

  const navigateback=(id) => {
     setValue(id);
  }

  
  const {register,handleSubmit,errors}=useForm(); // initialize the hook
  
  const onSubmit = (data) => {
      axios.post('http://localhost:8000/api/user', data)
        .then(
            res => {
                console.log(res);
            }
        ).catch(
            err =>{
                console.log(err);
            } 
        )
  };


  //circal slider


  const [valueCircalslider,setValueCircalslider]=React.useState(0);
 

  const handleChangeCircalslider = valueCircalslider => {
        //console.log(`Changed value ${value}`);
    console.log(valueCircalslider);
    
        setValueCircalslider({ valueCircalslider });
    };
 
  const handleChangeRange=event => {
    
    console.log(event);
    
        setValueCircalslider({
            valueCircalslider: event.target.valueAsNumber,
        });
  };
  


  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Step One" {...a11yProps(0)} />
        <Tab label="Step Two" {...a11yProps(1)} />
        <Tab label="Step Three" {...a11yProps(2)} />
        <Tab label="Step Four" {...a11yProps(3)} />
         <Tab label="Step Five" {...a11yProps(4)} />
   
      </Tabs>
 
 <form  onSubmit={handleSubmit(onSubmit)}>     
      <TabPanel value={value} index={0} style={{width: 1100}}>
        
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step one</h1> 
                <h3>In this step you should slect the complate name of project  !</h3>
              </div>
            </div> 

        <div className="row"> 
          <div className="col-md-6 p-2">
             <FormControl fullWidth>  

            <Autocomplete  
            id="country-select-demo" value={country['country']} onChange={(event, newValue) => {setCountry(newValue);}}
            style={{ width: 300 }}
            options={countries}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
            <React.Fragment>
                {option.label}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Select Country"
                variant="outlined"
                  helperText="Full width!"
                placeholder="pick the country !"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                    inputRef={register}/>
                    )}
                />  
            </FormControl> 
            </div>    

           <div className="col-md-6 p-2">
             <FormControl fullWidth >  
              <Autocomplete  
            id="country-select-demo" value={country['country']} onChange={(event, newValue) => {setCountry(newValue);}}
            style={{ width: 300 }}
            options={countries}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
            <React.Fragment>
                {option.label}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Select the City"
                variant="outlined"
                helperText="Full width!"
                placeholder="pick the City !"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                inputRef={register}/>
                )}
              />  
              </FormControl> 
            </div> 

             <FormControl fullWidth className="p-2">  
              <TextField id="outlined-basic" label="Poject Name" variant="outlined"
                helperText="Full width!"
                placeholder="complate Project name !"
                    margin="normal"
                name="project_name"    
                InputLabelProps={{
                  shrink: true,
                }}
              inputRef={register}/>
                </FormControl>  

              <FormControl fullWidth className="p-2">  
              <TextField id="outlined-basic" label="Discription" variant="outlined"
                helperText="Full width!"
                placeholder="Discription About Project  !"
                    margin="normal"
                name="project_name"    
                InputLabelProps={{
                  shrink: true,
                }}
              inputRef={register}/>
                </FormControl>  
                
              <Button onClick={() => navigate(1)} color="primary" variant="contained">Next</Button>              
            </div>  

          
          </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/1.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" style={imagehieght}/>
            </div> 
            
          </div>  
          
      </TabPanel>
        <TabPanel value={value} index={1} style={{width:1100}}>
        <div className="row">
           
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step Tow</h1> 
                <h3>In this step you should insert the project details  !</h3>
              </div>
            </div> 

      <div className="row"> 
        <div className="col-md-6">        
          <FormControl fullWidth >  
              <TextField id="outlined-basic" label="Dist loss" variant="outlined"
                helperText="Full width!"
                placeholder="Dist loss !"
                margin="normal"
                name="dist_loss"  
            
               
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
                InputLabelProps={{
                  shrink: true,
                }}
              inputRef={register}/>
              </FormControl> 

             <FormControl fullWidth>  
            
              <TextField id="outlined-basic" label="Motor Cable" variant="outlined"
                helperText="Full width!"
                placeholder="Motor cable!"
                    margin="normal"
                name="motor_cable"    
                InputLabelProps={{
                  shrink: true,
                      }}
                   InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}      
              inputRef={register}/>
                  </FormControl> 

                </div>
                <div className="col-md-6 row">
                  
                  <div className={classes.rootslider} styleName={`ml-4`}>
                      <Typography id="vertical-slider" gutterBottom>
                      Dirt Loss
                    </Typography>
                      <Slider
                        orientation="vertical"
                        getAriaValueText={valuetext}
                        defaultValue={30}
                        aria-labelledby="vertical-slider"
                      marks={dirtloss}
                      step={1}
                      getAriaValueText={valuetext}
                       valueLabelDisplay="on"
                      />
                   
                      
                  </div>
                  
                   <div className={classes.rootslider}>
                    
                   <Typography id="vertical-slider" gutterBottom>
                     Water Temp
                    </Typography>
                  
                      <Slider
                        orientation="vertical"
                        defaultValue={[20, 37]}
                        aria-labelledby="vertical-slider"
                        getAriaValueText={valuetext}
                      marks={marks}
                      step={1}
                      getAriaValueText={valuetext}
                       valueLabelDisplay="on"
                    />
               
                    </div>
               
                </div>  
               <Button onClick={() => navigate(2)} color="primary" variant="contained" className="mt-2">Next</Button>
              <Button  onClick={() => navigateback(0)} variant="contained" color="secondary"className="mt-2">Previous</Button>
              </div>  

          </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/2.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" style={imagehieght}/>
            </div> 
            
          </div>  
        </TabPanel>
        
      <TabPanel value={value} index={2} style={{width:1100}}>
          <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step three</h1> 
                <h3>In this step you should insert the project information  !</h3>
              </div>
            </div> 

              <div className="row ml-5 mb-5">    
               <CircleSlider
                  value={valueCircalslider}
                  size={200}
                  onChange={handleChangeCircalslider}
                  knobRadius={15}
                  progressWidth={10}
                  circleWidth={25}
                  showTooltip={true}
                  tooltipSize={26}
                  />

              </div>  

              <Button onClick={() => navigate(3)} color="primary" variant="contained">Next</Button>
              <Button  onClick={() => navigateback(1)} variant="contained" color="secondary">Previous</Button>   
          </div>
          
            
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/3.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" style={imagehieght}/>
            </div> 
            
          </div> 
      </TabPanel>
      <TabPanel value={value} index={3} style={{width:1100}}>
           <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step Four</h1> 
                <h3>In this step you should insert the project information  !</h3>
              </div>
            </div> 

              <div className="row ">  

                <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center"
                  heading="Solar Brand" className={classes.cardstyle}>
       
         <Sliderr className="slick-app-frame" {...options}>
            <div class="slick-slide-item">
               <div className="brand-logo">
                  <div className="brand-logo-inner">
                 <img src="/images/4.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" />
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
                  <div className="brand-logo">
                  <div className="brand-logo-inner">
                  
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
             <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item three</h2>
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
            <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item four</h2>
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
             <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item five</h2>
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
           <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item sex</h2>
                  </div>
               </div>
            </div>
          </Sliderr>        

                </CardBox>  

      
                <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center"
                  heading="Water pump Brand">
       
         <Sliderr className="slick-app-frame" {...options}>
            <div class="slick-slide-item">
               <div className="brand-logo">
                  <div className="brand-logo-inner">
                 <img src="/images/4.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" />
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
                  <div className="brand-logo">
                  <div className="brand-logo-inner">
                  
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
             <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item three</h2>
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
            <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item four</h2>
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
             <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item five</h2>
                  </div>
               </div>
            </div>
            <div class="slick-slide-item">
           <div className="brand-logo">
                  <div className="brand-logo-inner">
                    <h2>item sex</h2>
                  </div>
               </div>
            </div>
          </Sliderr>        

      </CardBox>          
                
         
            
              </div>  
              <Button  color="primary" variant="contained">Submit</Button>
              <Button  onClick={() => navigateback(2)} variant="contained" color="secondary">Previous</Button>    
          </div>
          
            
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/4.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" style={imagehieght}/>
            </div> 
            
          </div> 
        </TabPanel>

          <TabPanel value={value} index={4} style={{width:1100}}>
           <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step Five</h1> 
                <h3>In this step you should insert the project information  !</h3>
              </div>
            </div> 

              <div className="row">  
              <div className="col-md-12">
              <FormControl fullWidth className="col-md-12">  
              <TextField id="outlined-basic" label="Poject Name" variant="outlined"
              
                placeholder="complate Project name !"
                    margin="normal"
                name="project_name"    
                InputLabelProps={{
                  shrink: true,
                    }}
                size="small"    
              inputRef={register}/>
                  </FormControl>  
                </div>  

                <div className="col-md-6">
                   <FormControl fullWidth >  
              <TextField id="outlined-basic" label="Poject Name" variant="outlined"
              
                placeholder="complate Project name !"
                    margin="normal"
                name="project_name"    
                InputLabelProps={{
                  shrink: true,
                      }}
                  size="small"          
              inputRef={register}/>
                </FormControl> 
                </div>
                <div className="col-md-6">

              <FormControl fullWidth >  
              <TextField id="outlined-basic" label="Poject Name" variant="outlined"
               
                placeholder="complate Project name !"
                margin="normal"
                name="project_name"    
                InputLabelProps={{
                  shrink: true,
                      }}
                
              size="small"    
              inputRef={register}/>
                </FormControl>   
                </div>

              </div>  
          

               <IconButton color="primary" aria-label="upload picture" component="span">
                 <span class="material-icons">
                          add_circle_outline
                          </span>
              </IconButton>

               <IconButton color="primary" aria-label="upload picture" component="span">
                 <span class="material-icons">
                          remove_circle_outline
                          </span>
              </IconButton>

        

                
          </div>
          
            
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/4.jpg" class="img-thumbnail rounded mx-auto d-block" alt="Responsive image" style={imagehieght}/>
            </div> 
            
          </div> 
        </TabPanel>
      </form>  
  
    </div>
  );
}
