import React, { useEffect, useState } from "react";
// import {NavLink} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuidv4 } from "uuid";
import Spinner from "react-spinner-material";
import {useForm} from 'react-hook-form';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Snackbar} from '@material-ui/core';

//css
import "./custome.css";
//validation
import * as type from "yup";
import { checkValidation, runValidation } from "./utils";
//backdrop
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
//country flag
import Flags from "country-flag-icons/react/3x2";
//form import
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
//slider
import CardBox from "components/CardBox";
import Sliderr from "react-slick";
//dialog
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
//analize project
import Map from "./Map";
import Analyze from "./Analyze";
import Preview from "./Preview";
import PropTypes from "prop-types";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import FlashAutoIcon from "@material-ui/icons/FlashAuto";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";
// end code of brand stepper selection

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});




//slider
const options = {
  // dots: true,
  arrows: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  marginRight: 5,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  popover: {
    pointerEvents: "none",
    textAlign: "justify",
  },
  paper: {
    maxWidth: '480px',
    padding: theme.spacing(1),
  },
  rootCh: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

function getSteps() {
  return ["", "", ""];
}

//dialog
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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
    case "Afghanistan":
      return <Flags.AF title="Afghanistan" className="customflag" />;
    case "Italy":
      return <Flags.IT title="Italy" className="customflag" />;
    case "China":
      return <Flags.CH title="China" className="customflag" />;
    case "Iran":
      return <Flags.IR title="Iran" className="customflag" />;
    case "Turkey":
      return <Flags.TR title="Turkey" className="customflag" />;
    case "Germany":
      return <Flags.DE title="Germany" className="customflag" />;
    default:
      return "";
  }
}

//validation
const initialState = {
  formData: {
    projectname: "",
    city: {},
    head: "",
    solarCable: "",
    motorCable: "",
    piplenght: "",
    discharge: "",
  },
  error: {},
  touched: {},
  isValid: false,
};

const setState = "SET_STATE";

function reducer(state, action) {
  switch (action.type) {
    case setState:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
const schema = type.object().shape({
  // country: type.object().required("Required"),
  projectname: type.string().required("Required"),
  city: type.object().required("Required"),
  head: type.string().required("Required"),
  solarCable: type.string().required("Required"),
  motorCable: type.string().required("Required"),
  piplenght: type.string().required("Required"),
  discharge: type.string().required("Required"),
});
//end validation
// start code of brand stepper
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocalDrinkIcon />,
    2: <WbSunnyIcon />,
    3: <FlashAutoIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});
function getStepsBrand() {
  return [
    "Select Water Pump Brand",
    "Select Solar Brand",
    "Select Inverter Brand",
  ];
}

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

// end code of brand stepper
export default function Project() {
  const {handleSubmit }=useForm();
  const [{ formData, error, touched, isValid }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const [stateNote, setStateNote] = React.useState(false);
  const handleClickNote = (text) => {
    setTextContent(text);
    setStateNote(true);
  };
  const handleCloseNote = () => {
    setStateNote(false);
  };

  const handlchangfild = async ({ target: { name, value } }) => {
    if (name === "projectname") {
      setProjectname(value);
    }

    const schemaErrors = await runValidation(schema, {
      ...formData,
      [name]: value,
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors),
      },
    });
  };

  const handgleCountry = async (event, value) => {
    setCountry(value);
  };

  const handcahngeCity = async (event, value) => {
    setCity(value);
    
    const schemaErrors = await runValidation(schema, {
      ...formData,
      ['city']: value,
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, ['city']: value },
        touched: { ...touched, ['city']: true },
        isValid: checkValidation(schemaErrors),
      },
    });
  };
  
  const handcahngeInputNumber = async (name, value) => {
    if (name === "head") {
      setDaynomichead(value);
    }
    else if (name === "solarCable") {
      setSolarCable(value);
    }
    else if (name === "motorCable") {
      setMotorcable(value);
    }
    else if (name === "piplenght") {
      setPiplenght(value);
    }
    else if (name === "discharge") {
      if(waterDeLable=='m³/h'){
        setDischargeChanged(value);
        setDischarge(value);
      }else if(waterDeLable=='L/s'){
        // 1L/s=(3600/1000)m³/h
        var changedValue = Number(value)*(3.6);
        setDischargeChanged(value);
        setDischarge(changedValue);
      }else{
        // m³/d=(1/6)m³/h
        var changedValue = Number(value)*(0.1667);
        setDischargeChanged(value);
        setDischarge(changedValue);
      }
    }
    
    const schemaErrors = await runValidation(schema, {
      ...formData,
      [name]: value,
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors),
      },
    });
  };
  // start brand stepper state code
  const [activeStepBrand, setActiveStepBrand] = React.useState(1);
  const stepsBrand = getStepsBrand();
  const handleNextBrand = () => {
    setActiveStepBrand((prevActiveStepBrand) => prevActiveStepBrand + 1);
  };

  const handleBackBrand = () => {
    setActiveStepBrand((prevActiveStepBrand) => prevActiveStepBrand - 1);
  };

  const handleResetBrand = () => {
    setActiveStepBrand(0);
  };
  // end brand stepper State code
  // const [solarbrandname, setSolarbrandname] = useState();
  const solarbrand = (id, name, index) => {
    setSolarstate(index);
    setSolarvalue(id);
    // setSolarbrandname(name);
  };
  // const [pumpbrandname, setPumpbrandname] = useState();
  const pumpbrand = (id, name, index) => {
    setPumpstate(index);
    setPumpvalue(id);
    // setPumpbrandname(name);
  };

  // const [invertorbrandname, setInvertorbrandname] = useState();
  const invertorbrand = (id, name, index) => {
    setInvertorstate(index);
    setInvertorvalue(id);
    // setInvertorbrandname(name);
  };

  function toggelactivestyle(index, id) {
    if (solarstate === index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }
  const getSolarWatts = (id) => {
    axios
      .get("api/getSolarWatt/" + id)
      .then((res) => {
        setSolarWatt(res.data);
        setSolarSelectWatt(res.data[0].id);
      })
      .catch((err) => {
        NotificationManager.error(
          <IntlMessages id="notification.errorMessageSolarList" />,
          <IntlMessages id="notification.titleHereSolarList" />
        );
      });
  };

  function toggelactivestylepump(index) {
    if (pumpstate === index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }

  function toggelactivestyleinvertor(index) {
    if (invertorstate === index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }
  //end solar and brand
  //Dialog
  const [open, setOpen] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);

  const handleClickOpenMap = () => {
    setOpenMap(true);
  };
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
  const textData = [
    'Write the name of the Projects which you want to do the calculation for that.',
    'Vertical height from the dynamic water level to the highest point of delivery', 
    'Enter the length of the electrical cable between the solar panels and pump controller/inverter',
    'The electrical cable between controller/inverter and submersible pump',
    'Pipe line from the submersible pump outlet to the delivery point.',
    'Enter your water requirement in average method.',
    'Select your solar panels mounting type. Note: Manual is more efficient than fix/ground mounting structures.',
    'Please Enter your Latitude if you do not know you can pick up from google map',
    'Please Enter your Longtitude if you do not know you can pick up from google map',
    'Please Enter your Pipe Friction Losses',
  ];
  // start code for mouse poppur
  const [textContent, setTextContent] = useState('');
  
  // end mouse poppur

  //database data
  const [location, setLocation] = useState([]);
  const [solar, setSolar] = useState([]);
  const [solarWatts, setSolarWatt] = useState([]);
  const [solarSelectWatt, setSolarSelectWatt] = useState("");
  const [pump, setPump] = useState([]);
  const [invertor, setInvertor] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [accessoriesCopy, setAccessoriesCopy] = useState([]);
  const [dbcity, setDbcity] = useState([]);
  //pump and solar
  const [solarstate, setSolarstate] = useState("");
  const [solarvalue, setSolarvalue] = useState();
  const [pumpstate, setPumpstate] = useState("");
  const [pumpvalue, setPumpvalue] = useState();
  const [invertorstate, setInvertorstate] = useState("");
  const [invertorvalue, setInvertorvalue] = useState();
  //end pump and solar

  //start form value
  const [projectname, setProjectname] = React.useState("");
  const [filled, setFilled] = useState(false);
  const handNexTrue = () =>{
    setFilled(true);
    // console.log('project data error in project page ', filled);
  };
  const [bas, setBas] = React.useState("Manual Tracker");
  const [country, setCountry] = React.useState({});
  const [city, setCity] = React.useState([]);
  const [gps, setGps] = useState(
    { lati: '', long: ''}
  );
  const [daynomichead, setDaynomichead] = useState();
  const [motorcable, setMotorcable] = React.useState();
  const [solarCable, setSolarCable] = React.useState();
  const [piplenght, setPiplenght] = React.useState();
  const [dirtloss, setDirtloss] = React.useState(5);
  const [discharge, setDischarge] = React.useState();
  const [dischargeChanged, setDischargeChanged] = React.useState();
  const [estimatedCost,setEstimatedCost]= useState(true);
  
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), item: "", quantity: "", uomAc: "" },
  ]);
  const [itemChange, setItemChange] = useState(
    { item: '', flag: false}
  );


// start code of water demand
const [anchorElM, setAnchorElM] = React.useState(null);
  const handleClickCA = (event) => {
    setAnchorElM(event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorElM(null);
  };
  const [waterDemandLable,setWaterDemandLable]= useState([
    {id: 1, checked:true, name: 'm³/h'},
    {id: 2, checked:false, name: 'L/s'},
    {id: 3, checked:false, name: 'm³/d'},
  ]);
  const [waterDeLable,setWaterDeLable]= useState('m³/h');
  

  const handleChangeWaterDeLab = (id, value) => {
    // console.log('pumpBrand', value);
    const newValue = waterDemandLable.map(i => {
      if(i.id === id){
        if(value){
          i['checked'] = value;
          if(i.name=='L/s'){
              // 1L/s=(3600/1000)m³/h
              var changedValue = Number(dischargeChanged)*(3.6);
              setDischargeChanged(dischargeChanged);
              setDischarge(changedValue);
          }
          if(i.name=='m³/d'){
              // m³/d=(1/6)m³/h
            var changedValue = Number(dischargeChanged)*(0.1667);
            setDischargeChanged(dischargeChanged);
            setDischarge(changedValue);
          }
          if(i.name=='m³/h'){
          setDischargeChanged(dischargeChanged);
          setDischarge(dischargeChanged);
          }
           
          setWaterDeLable(i.name);
        }
      }else{
        i['checked'] = false
      }
      return i;
    })
    setWaterDemandLable(newValue);
    handleClickAway();
  };

// end code of water demand
  useEffect(()=>{
    if(itemChange.flag){
      setAccessories([...accessories, itemChange.item]);
      setItemChange({flag: false, item: ''})
    }
  },[itemChange.flag]);

  const handlseelctitem = (event, value, id, index) => {
    
    if(inputFields[index].item){
      setItemChange({flag: true, item: inputFields[index].item})
    }
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i['item'] = value;
        i['uomAc'] = value? value.uom?.acronym :'m';
        setLoadImg(true);
        setAccImgPath(value?.image);
        setLoadImg(false);
      }
      return i;
    });
    setInputFields(newInputFields);
    setAccessories(accessories.filter((itemV) => value?.id !== itemV.id));
  };

  const handlchangquantity = (value, id, item) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i["quantity"] = (Number(value) >= Number(item?.min_quantity) && Number(value) <= Number(item?.max_quantity))?value:'';
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), item: "", uomid: "", quantity: "", uomAc: "" },
    ]);
  };

  const handleRemoveFields = () => {
    const values = [...inputFields];
    setAccessories([...accessories, values[values.length - 1]["item"]]);
    values.splice(values.length - 1, 1);
    setInputFields(values);
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  const getProjectdata = async () => {
    setOpenbackdrop(true);
    handleResetBrand();
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    var system = JSON.parse(localStorage.getItem("UserData")).system;
    var data = [id, system];
    axios
      .post("api/gitprojectdata", data)
      .then((res) => {
        // console.log(res.data);
        if(res.data.auth=='unauthenticated'){
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        }else{
        setOpenbackdrop(false);
        setLocation(res.data.countrylist);
        setDbcity(res.data.city);
        setSolar(res.data.solarbrand);
        setPump(res.data.pumpbrand);
        setInvertor(res.data.invertorbrand);
        setAccessories(res.data.accessories);
        setAccessoriesCopy(res.data.accessories);
        var esCoValue = (res.data.estimatedCost)=='true'?true:false;
        setEstimatedCost(esCoValue);
        setOpen(true);
      }
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  const [openbackdrop, setOpenbackdrop] = React.useState(false);
  const getcitylist = (country) => {
    setOpenbackdrop(true);
    axios
      .get("api/getcity/" + country)
      .then((res) => {
        setOpenbackdrop(false);
        setDbcity(res.data);
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  const [citylocation, setCitylocation] = useState("");
  const getIrredation = (city) => {
    setCitylocation(city?.id);
  };

  const [imagepath, setImagepath] = useState("/Layouts/1-system layout.jpg");
  const [myImage, setMyImage] = useState(
    "img-thumbnail rounded d-block"
  );
  const [foucus, setFoucus] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [accImgPath, setAccImgPath] = useState();
  const accessoryMouseOver = (image, wichfunction) => {
    // console.log('input value', image);
    // setEvaluation(false);
    if (wichfunction === "focus") {
      setFoucus(true);
      setLoadImg(true);
      setAccImgPath(image);
      setLoadImg(false);
    }

    if (wichfunction === "hover") {
      if (!foucus) {
        // console.log('input value', image);
        setLoadImg(true);
        setAccImgPath(image);
        setLoadImg(false);
      }
    }
   
  };
  // const accessoryMouseLeave = (wichfunction) => {
  //   if (wichfunction === "fout") {
  //     setFoucus(false);
  //     setLoadImg(true);
  //     setAccImgPath();
  //     setLoadImg(false);
  //   }

  //   if (!foucus) {
  //     setLoadImg(true);
  //     setAccImgPath();
  //     setLoadImg(false);
  //   }
  // };

  const dirtlossMouseOver = (wichInput, wichfunction) => {
    // setEvaluation(false);
    if (wichInput === "MT" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/structure.jpg");
    }

    if (wichInput === "MT" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/structure.jpg");
      }
    }
    if (wichInput === "GS" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/ground1.jpg");
    }

    if (wichInput === "GS" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/ground1.jpg");
      }
    }
    if (wichInput === "dirt" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/7-pipe friction layout.jpg");
    }

    if (wichInput === "dirt" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/7-pipe friction layout.jpg");
      }
    }

    if (wichInput === "waterDeman" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/6-water demand layout.jpg");
    }

    if (wichInput === "waterDeman" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/6-water demand layout.jpg");
      }
    }

    if (wichInput === "motor" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/4-motor cable layout.jpg");
    }

    if (wichInput === "motor" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/4-motor cable layout.jpg");
      }
    }

    if (wichInput === "head" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/2-Head layout.jpg");
    }

    if (wichInput === "head" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/2-Head layout.jpg");
      }
    }

    if (wichInput === "solarCable" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/3-Solar cable layout.jpg");
    }

    if (wichInput === "solarCable" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/3-Solar cable layout.jpg");
      }
    }

    if (wichInput === "temp" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/system layout with details.jpg");
    }
    if (wichInput === "temp" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/system layout with details.jpg");
      }
    }

    if (wichInput === "pip" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/5-Pipe lenght layout.jpg");
    }
    if (wichInput === "pip" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/Layouts/5-Pipe lenght layout.jpg");
      }
    }
  };
  const dirtlossMouseLeave = (wichfunction) => {
    // setEvaluation(true);
    if (wichfunction === "fout") {
      setFoucus(false);
      setMyImage(" img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/1-system layout.jpg");
    }

    if (!foucus) {
      setMyImage(" img-thumbnail rounded mx-auto d-block");
      setImagepath("/Layouts/1-system layout.jpg");
    }
  };

  const [projectID, setProjectID] = useState(0);
  const [deviceCost, setDeviceCost] = useState(0);
  const [accessoryCost, setAccessoryCost] = useState(0);
  // useEffect(() => {
  //  }, [deviceCost, accessoryCost]);
  const calculateDeviceCost = ()=>{
    var inputCost = 0;
    inputFields.forEach(input => {
      inputCost = Number(inputCost) + Number(input?.item?.price)*Number(input?.quantity);
      // console.log('input cost', inputCost);
    });
    setAccessoryCost(inputCost);
  };

  const [evaluation, setEvaluation] = useState(false);
  const [submited, setSubmited] = useState(false);
  const onSubmit = (data) => {
    setOpenbackdrop(true);

    let alldata = {
      projectname,
      country,
      city,
      daynomichead,
      solarCable,
      motorcable,
      piplenght,
      discharge,
      dirtloss,
      bas,
      inputFields,
      pumpvalue,
      solarvalue,
      solarSelectWatt,
      invertorvalue, gps, dischargeChanged, waterDeLable,
    };

    alldata["user_id"] = JSON.parse(localStorage.getItem("UserData")).id;
    // console.log('all Data ', alldata);
    axios
      .post("api/project", alldata)
      .then((res) => {
        setOpenbackdrop(false);
        // setProjectID(res.data);
        // handleNext();
        setSubmited(true);
        NotificationManager.success(
          <IntlMessages id="notification.successMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };
  const refreshPage = ()=> {
    window.location.reload(false);
  };
   

  const [evaluationdata, setEvaluationdata] = React.useState("");
  const evaluationfunction = () => {
    let dynamicHead =
      (Number(daynomichead) + Math.ceil(Number((dirtloss * piplenght) / 100)));

    let evalData = {
      projectname,
      pumpvalue,
      solarvalue,
      solarSelectWatt,
      invertorvalue,
      citylocation,
      dynamicHead,
      solarCable,
      motorcable,
      piplenght,
      discharge,
      dirtloss,
      bas,
    };
    
    // console.log('dynamicHead', dynamicHead);
    // console.log('evalData', evalData);
    setEvaluation(true);
    setEvaluationdata(evalData);
  };

  const [openPre, setOpenPre] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const handlePreview = () => {
    setOpenbackdrop(true);
    let alldata = {projectname,country,city,daynomichead,solarCable,
      motorcable,piplenght,discharge,dirtloss,bas,inputFields,pumpvalue,solarvalue,
      solarSelectWatt,invertorvalue,gps, dischargeChanged, waterDeLable,
    };
    alldata["user_id"] = JSON.parse(localStorage.getItem("UserData")).id;
    // console.log('all Data ', alldata);
    axios
      .post("api/project", alldata)
      .then((res) => {
        setOpenbackdrop(false);
        setProjectID(res.data);
        const dataM = { params: { id: res.data } };
        setPreviewData(dataM);
      })
      .catch((err) => {
        setOpenbackdrop(false);
      });
  };
  useEffect(() => {
    // console.log('preview data', previewData);
    if (previewData && projectID) {
      if (projectID !== 0) {
        setOpenPre(true);
      }
    }
  }, [previewData, projectID]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={`${label}${index}`} className={`main-sptem${index}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper elevation={0} className="mb-3 p-4">
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 ? (
                  <div className="row">
                    <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
                      <Button
                        size="large"
                        color="primary"
                        variant="outlined"
                        className="form-control p-4"
                        onClick={handleClickOpen}
                      >
                        Select Brand
                      </Button>
                      {/* start dialog */}
                      <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        maxWidth="sm"
                        fullWidth="sm"
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose}
                        >
                          Brand Managment
                        </DialogTitle>
                        <DialogContent dividers>
                          <div className={classes.root}>
                            <Stepper
                              style={{
                                paddingLeft: "0px",
                                paddingRight: "0px",
                              }}
                              alternativeLabel
                              activeStep={activeStepBrand}
                              connector={<ColorlibConnector />}
                            >
                              {stepsBrand.map((label, index) => (
                                <Step key={`${label}${index}`}>
                                  <StepLabel
                                    StepIconComponent={ColorlibStepIcon}
                                  >
                                    {label}
                                  </StepLabel>
                                </Step>
                              ))}
                            </Stepper>

                            <div>
                              {activeStepBrand === stepsBrand.length ? (
                                <CardBox
                                  styleName="col-lg-12 customeCard"
                                  cardStyle="text-center"
                                >
                                  <Sliderr
                                    className="slick-app-frame "
                                    {...options}
                                  >
                                    {invertor.map((data, index) => {
                                      return (
                                        <span
                                          key={index}
                                          onClick={() =>
                                            invertorbrand(
                                              data.id,
                                              data.name,
                                              index
                                            )
                                          }
                                        >
                                          <div class="slick-slide-item">
                                            <div
                                              className={toggelactivestyleinvertor(
                                                index
                                              )}
                                            >
                                              <div>
                                                <img
                                                  src={`${axios.defaults.baseURL}brand/invertor/${data.image}`}
                                                  className="img-thumbnail rounded mx-auto d-block imagebrandhieght"
                                                  alt="Responsive"
                                                />
                                              </div>
                                              <span>
                                                {" "}
                                                {data.country}{" "}
                                                {getFlag(data.country)}{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </span>
                                      );
                                    })}
                                  </Sliderr>
                                </CardBox>
                              ) : (
                                <div>
                                  <Typography className={classes.instructions}>
                                    {activeStepBrand === 0 ? (
                                      <CardBox
                                        styleName="col-lg-12 customeCard"
                                        cardStyle="text-center"
                                      >
                                        <Sliderr
                                          className="slick-app-frame "
                                          {...options}
                                        >
                                          {pump.map((data, index) => {
                                            return (
                                              <span
                                                key={index}
                                                onClick={() =>
                                                  pumpbrand(
                                                    data.id,
                                                    data.name,
                                                    index
                                                  )
                                                }
                                              >
                                                <div class="slick-slide-item">
                                                  <div
                                                    className={toggelactivestylepump(
                                                      index
                                                    )}
                                                  >
                                                    <div>
                                                      <img
                                                        src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`}
                                                        className="img-thumbnail rounded mx-auto d-block imagebrandhieght"
                                                        alt="Responsive"
                                                      />
                                                    </div>
                                                    <span>
                                                      {" "}
                                                      {data.country}{" "}
                                                      {getFlag(data.country)}{" "}
                                                    </span>
                                                  </div>
                                                </div>
                                              </span>
                                            );
                                          })}
                                        </Sliderr>
                                      </CardBox>
                                    ) : activeStepBrand === 1 ? (
                                      <div className="row">
                                        <CardBox
                                          styleName="col-xl-9 col-lg-9 col-md-9 col-12 customeCard"
                                          cardStyle="text-center"
                                        >
                                          <Sliderr
                                            className="slick-app-frame"
                                            {...options}
                                          >
                                            {solar.map((data, index) => {
                                              return (
                                                <span
                                                  key={index}
                                                  onClick={() => {
                                                    solarbrand(
                                                      data.id,
                                                      data.name,
                                                      index
                                                    );
                                                    getSolarWatts(data.id);
                                                  }}
                                                >
                                                  <div className="slick-slide-item solar">
                                                    <div
                                                      className={toggelactivestyle(
                                                        index,
                                                        data.id
                                                      )}
                                                    >
                                                      <div>
                                                        <img
                                                          src={`${axios.defaults.baseURL}brand/solar/${data.image}`}
                                                          className="img-thumbnail rounded mx-auto d-block imagebrandhieght img_solar_brand_hieght"
                                                          alt="Responsive"
                                                        />
                                                      </div>
                                                      <span>
                                                        {" "}
                                                        {data.country}{" "}
                                                        {getFlag(data.country)}{" "}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </span>
                                              );
                                            })}
                                          </Sliderr>
                                        </CardBox>
                                        {solarWatts ? (
                                          <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormBPCable">
                                            <FormControl
                                              variant="outlined"
                                              size="small"
                                              className="form-control"
                                            >
                                              <InputLabel
                                                id="demo-simple-select-outlined-label"
                                                error={
                                                  solarWatts.length === 0 &&
                                                  true
                                                }
                                              >
                                                Solar Watt
                                              </InputLabel>
                                              <Select
                                                name="solarwatt"
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined-solarwatt"
                                                value={solarSelectWatt}
                                                onChange={(e) =>
                                                  setSolarSelectWatt(
                                                    e.target.value
                                                  )
                                                }
                                                label="Solar Watt"
                                                error={
                                                  solarWatts.length === 0 &&
                                                  true
                                                }
                                              >
                                                <MenuItem value="">
                                                  <em></em>
                                                </MenuItem>
                                                {solarWatts?.map((watt) => (
                                                  <MenuItem value={watt.id}>
                                                    {watt.power}W
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    ) : activeStepBrand === 2 ? (
                                      <CardBox
                                        styleName="col-lg-12 customeCard"
                                        cardStyle="text-center"
                                      >
                                        <Sliderr
                                          className="slick-app-frame "
                                          {...options}
                                        >
                                          {invertor.map((data, index) => {
                                            return (
                                              <span
                                                key={index}
                                                onClick={() =>
                                                  invertorbrand(
                                                    data.id,
                                                    data.name,
                                                    index
                                                  )
                                                }
                                              >
                                                <div class="slick-slide-item">
                                                  <div
                                                    className={toggelactivestyleinvertor(
                                                      index
                                                    )}
                                                  >
                                                    <div>
                                                      <img
                                                        src={`${axios.defaults.baseURL}brand/invertor/${data.image}`}
                                                        className="img-thumbnail rounded mx-auto d-block imagebrandhieght"
                                                        alt="Responsive"
                                                      />
                                                    </div>
                                                    <span>
                                                      {" "}
                                                      {data.country}{" "}
                                                      {getFlag(data.country)}{" "}
                                                    </span>
                                                  </div>
                                                </div>
                                              </span>
                                            );
                                          })}
                                        </Sliderr>
                                      </CardBox>
                                    ) : (
                                      ""
                                    )}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <div>
                            {activeStepBrand === stepsBrand.length ? (
                              <div>
                                <Button
                                  onClick={handleResetBrand}
                                  className={classes.button}
                                >
                                  Reset
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <div>
                                  <Button
                                    disabled={activeStepBrand === 0}
                                    onClick={handleBackBrand}
                                    className={classes.button}
                                  >
                                    Back
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                      (activeStepBrand === stepsBrand.length - 1)
                                        ?true
                                        :pumpvalue && activeStepBrand === 0?false:solarvalue?false:true
                                    }
                                    onClick={handleNextBrand}
                                    className={classes.button}
                                  >
                                    Next
                                    {/* {activeStepBrand === stepsBrand.length - 1 ? 'Finish' : 'Next'} */}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                          {activeStepBrand === stepsBrand.length - 1 ? (
                            <Button
                              onClick={handleClose}
                              color="primary"
                              variant="contained"
                              disabled={
                                activeStepBrand === stepsBrand.length - 1
                                  ? invertorvalue?false:true
                                  : true
                              }
                            >
                              Done
                            </Button>
                          ) : (
                            ""
                          )}
                        </DialogActions>
                      </Dialog>
                      {/* end dialog */}
                      <Divider className="mb-3 mt-3" />
                      <Map setOpenMap={setOpenMap} openMap={openMap} setGps={setGps}/>
                      <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={stateNote} autoHideDuration={3000}
                        onClose={handleCloseNote}
                        message={textContent}
                        key={'bottom' + 'right'}
                      />
                      <div onMouseOver={()=>dirtlossMouseLeave("fout")}>
                        <div className="col-md-12 p-0">
                            <TextField
                              className="form-control"
                              id="outlined-basic"
                              label="Poject Name"
                              variant="outlined"
                              placeholder="Project name!"
                              margin="normal"
                              autoFocus={projectname?false:true}
                              size="small"
                              name="projectname"
                              value={projectname}
                              onChange={(event) => handlchangfild(event)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={
                                touched &&
                                touched.projectname &&
                                error &&
                                error.projectname
                                  ? true
                                  : false
                              }
                              
                              onMouseOver={()=>handleClickNote(textData[0])}
                              onClick={()=>handleClickNote(textData[0])}
                              // onMouseLeave={handlePopoverClose}
                              onFocus={()=>handleClickNote(textData[0])}
                              // onBlur={handlePopoverClose}
                              
                            />
                            
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Autocomplete
                              size="small"
                              id="country-select-demo"
                              onChange={(event, newValue) => {
                                handgleCountry(event, newValue);
                                getcitylist(
                                  newValue ? newValue.country : "Afghanistan"
                                );
                              }}
                              style={{ width: 300 }}
                              options={location}
                              inputValue={`Afghanistan`}
                              // onInputChange={(event) => {
                              //   handgleCountry(event, "Afghanistan");
                              //   getcitylist("Afghanistan");
                              // }}
                              classes={{
                                option: classes.option,
                              }}
                              autoHighlight
                              getOptionLabel={(option) =>
                                option ? option.country : "Afghanistan"
                              }
                              renderOption={(option) => (
                                <React.Fragment>{option.country}</React.Fragment>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  {...params}
                                  label="Select Country"
                                  variant="outlined"
                                  placeholder="pick the country !"
                                  margin="normal"
                                  name="country"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  //  error={(touched && touched.country) && (error && error.country) ? true : false}

                                  inputProps={{
                                    ...params.inputProps,
                                    // autoComplete: "new-password",
                                  }}
                                />
                              )}
                            />
                          </div>

                          <div className="col-md-6">
                            <Autocomplete
                              size="small"
                              id="country-select-demo2"
                              onChange={(event, newValue) => {
                                handcahngeCity(event, newValue);
                                getIrredation(newValue);
                              }}
                              style={{ width: 300 }}
                              options={dbcity}
                              classes={{
                                option: classes.option,
                              }}
                              defaultValue={city}
                              name="city"
                              autoHighlight
                              getOptionLabel={(option) =>
                                option ? option.city : ""
                              }
                              renderOption={(option) => (
                                <React.Fragment>{option.city}</React.Fragment>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  {...params}
                                  label="Select the City"
                                  variant="outlined"
                                  placeholder="pick the City !"
                                  margin="normal"
                                  error={
                                    touched && touched.city && error && error.city
                                      ? true
                                      : false
                                  }
                                  name="city"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    // autoComplete: "new-password",
                                  }}
                                  
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                              <TextField
                                id="outlined-basic-1_lati" className="form-control"
                                label='Latitude'
                                variant="outlined" placeholder="Latitude" margin="normal" name="latitude"
                                size="small" 
                                InputProps={{
                                  // endAdornment: (
                                  //   <InputAdornment position="end">
                                  //     °
                                  //   </InputAdornment>
                                  // ),
                                }}
                                onMouseOver={e=>handleClickNote(textData[7])}
                                onClick={e=>handleClickNote(textData[7])}
                                onFocus={(e) => {handleClickNote(textData[7]);}}
                                InputLabelProps={{ shrink: true, }}
                                value={gps.lati}
                                onChange={(event) => setGps({...gps, lati: event.target.value})}
                              />
                          </div>
                          <div className="col-md-6">
                            <TextField
                                id="outlined-basic-1_long" className="form-control"
                                label='Longtitude'
                                variant="outlined" placeholder="Longtitude" margin="normal" name="longtitude"
                                size="small" 
                                InputProps={{
                                  // endAdornment: (
                                  //   <InputAdornment position="end">
                                  //     °
                                  //   </InputAdornment>
                                  // ),
                                }}
                                InputLabelProps={{ shrink: true, }}
                                onMouseOver={e=>handleClickNote(textData[8])}
                                onClick={e=>handleClickNote(textData[8])}
                                onFocus={(e) => {handleClickNote(textData[8]);}}
                                value={gps.long}
                                onChange={(event) => setGps({...gps, long: event.target.value})}
                            />
                          </div>
                          <div className="col-md-12 mt-3">
                            <Button
                              size="large"
                              color="primary"
                              variant="outlined"
                              className="form-control"
                              onClick={handleClickOpenMap}
                            >
                              Pick the Project Location
                            </Button>
                          </div>
                                
                        </div>
                      </div>
                      <Divider className="mb-3 mt-3" />
                      {/* <div onMouseLeave={()=>dirtlossMouseLeave("fout")}> */}
                        <div className="row">
                          <div className="col-md-6">
                              <TextField
                                id="outlined-basic-1_head" className="form-control"
                                label={`Head ${
                                  piplenght && dirtloss
                                    ? "+ " +
                                      Math.ceil(
                                        Number((dirtloss * piplenght) / 100)
                                      )
                                    : ""
                                }`}
                                variant="outlined" placeholder="Head !" margin="normal" name="head"
                                type="number" size="small" 
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      m
                                    </InputAdornment>
                                  ),
                                  inputProps: {
                                    min: 0,
                                  },
                                }}
                                
                                InputLabelProps={{ shrink: true, }}
                                value={daynomichead}
                                onChange={(event) => handcahngeInputNumber(event.target.name, event.target.value)}
                                error={touched && touched.head && error && error.head ? true:false}
                                onMouseOver={(e) => {dirtlossMouseOver("head", "hover"); handleClickNote(textData[1])}}
                                // onMouseLeave={() => {handlePopoverClose()}}
                                onFocus={(e) => {dirtlossMouseOver("head", "focus"); handleClickNote(textData[1]);}}
                                onClick={() => handleClickNote(textData[1])}
                                // onMouseEnter={e=>handleClickNote(textData[1])}
                                // onBlur={handlePopoverClose}
                              />
                          </div>
                          <div className="col-md-6">
                              <TextField
                                id="outlined-basic-2_solar"
                                label="Solar Cable"
                                fullWidth={true}
                                variant="outlined"
                                placeholder="Solar cable!"
                                margin="normal"
                                name="solarCable"
                                type="number"
                                size="small"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      m
                                    </InputAdornment>
                                  ),
                                  inputProps: {
                                    min: 0,
                                  },
                                }}
                                value={solarCable}
                                onChange={(event) => handcahngeInputNumber(event.target.name, event.target.value)}
                                error={touched && touched.solarCable && error && error.solarCable ? true:false}
                                onMouseOver={(e) =>
                                  {handleClickNote(textData[2]);
                                  dirtlossMouseOver("solarCable", "hover");}
                                }
                                // onMouseLeave={() => { handlePopoverClose();}}
                                onFocus={(e) =>
                                  {dirtlossMouseOver("solarCable", "focus"); handleClickNote(textData[2]);}
                                }
                                onClick={(e) =>
                                  {handleClickNote(textData[2]);}
                                }
                                // onMouseEnter={e=>handleClickNote(textData[2])}
                                // onBlur={handlePopoverClose}
                              />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                              <TextField
                                fullWidth={true}
                                id="outlined-basic-2"
                                label="Motor Cable"
                                variant="outlined"
                                placeholder="Motor cable!"
                                margin="normal"
                                name="motorCable"
                                type="number"
                                size="small"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      m
                                    </InputAdornment>
                                  ),
                                  inputProps: {
                                    min: 0,
                                  },
                                }}
                                value={motorcable}
                                onChange={(event) => handcahngeInputNumber(event.target.name, event.target.value)}
                                error={touched && touched.motorCable && error && error.motorCable ? true:false}
                                onMouseOver={(e) =>
                                  {dirtlossMouseOver("motor", "hover"); handleClickNote(textData[3]);}
                                }
                                // onMouseLeave={() => {handlePopoverClose();}}
                                onFocus={(e) =>
                                  {dirtlossMouseOver("motor", "focus"); handleClickNote(textData[3]);}
                                }
                                onClick={() =>handleClickNote(textData[3])}
                                // onMouseEnter={e=>handleClickNote(textData[3])}
                                // onBlur={handlePopoverClose}
                              />
                          </div>
                          <div className="col-md-6">
                              <TextField
                                fullWidth={true}
                                id="outlined-basic-4"
                                label="Pipe-lenght"
                                variant="outlined"
                                placeholder="Pipe lenght!"
                                margin="normal"
                                name="piplenght"
                                type="number"
                                size="small"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      m
                                    </InputAdornment>
                                  ),
                                  inputProps: {
                                    min: 0,
                                  },
                                }}
                                value={piplenght}
                                error={touched && touched.piplenght && error && error.piplenght ? true:false}
                                onChange={(event) =>
                                  {handcahngeInputNumber(event.target.name, event.target.value); event.target.value>=500?setDirtloss(10):setDirtloss(5)}
                                }
                                onMouseOver={(e) =>
                                  {dirtlossMouseOver("pip", "hover"); handleClickNote(textData[4]);}
                                }
                                // onMouseLeave={() => {handlePopoverClose();}}
                                onFocus={(e) => {dirtlossMouseOver("pip", "focus"); handleClickNote(textData[4]);}}
                                onClick={() =>handleClickNote(textData[4])}
                                // onMouseEnter={e=>handleClickNote(textData[4])}
                                // onBlur={handlePopoverClose}
                              />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 inputAdornment">
                         
                            <TextField
                                fullWidth={true}
                                id="outlined-basic-5"
                                label="Water Demand"
                                variant="outlined"
                                placeholder="Water Demand"
                                margin="normal"
                                name="discharge"
                                size="small"
                                type="number"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end" className='cursorPointer' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickCA}>
                                      {/* m³/h  */}
                                      {waterDeLable}
                                      {Boolean(anchorElM) ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                                    </InputAdornment>
                                  ),
                                  inputProps: {
                                    min: 0,
                                  },
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={dischargeChanged}
                                onChange={(event) => handcahngeInputNumber(event.target.name, event.target.value)}
                                error={touched && touched.discharge && error && error.discharge ? true:false}
                                onMouseOver={(e) =>
                                  {dirtlossMouseOver("waterDeman", "hover"); handleClickNote(textData[5]);}
                                }
                                // onMouseLeave={() => {handlePopoverClose();}}
                                onFocus={(e) =>
                                  {dirtlossMouseOver("waterDeman", "focus"); handleClickNote(textData[5]);}
                                }
                                onClick={() =>handleClickNote(textData[5])}
                                // onMouseEnter={e=>handleClickNote(textData[5])}
                                // onBlur={handlePopoverClose}
                              />
                               
                             
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorElM}
                          keepMounted
                          open={Boolean(anchorElM)}
                          onClose={handleClickAway}
                        >
                          <div className={classes.rootCh}>
                            <FormControl component="fieldset" className={classes.formControl}>
                              {/* <FormLabel component="legend" className='center'>Unit</FormLabel> */}
                              <FormGroup>
                              {waterDemandLable?.map((waterDeLable, index) => 
                              // <MenuItem key={index}>
                                  <FormControlLabel key={index}
                                    control={<Checkbox checked={waterDeLable?.checked} onChange={event => handleChangeWaterDeLab(waterDeLable?.id, event.target.checked)} name={waterDeLable?.name} />}
                                    label={waterDeLable?.name}
                                  />
                                // </MenuItem>
                              )}
                              </FormGroup>
                              {/* <FormHelperText>Be careful</FormHelperText> */}
                            </FormControl>
                          </div>
                          
                        </Menu>
                              
                          </div>
                          <div className="col-md-6">
                            <TextField
                              fullWidth={true}
                              id="outlined-basic-11"
                              label="Pipe Friction losses"
                              variant="outlined"
                              size="small"
                              placeholder="Pipe Friction losses!"
                              margin="normal"
                              name="dist_loss"
                              type="number"
                              min="0"
                              max="10"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                                inputProps: {
                                  min: 0,
                                  max: 10,
                                },
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={dirtloss}
                              onChange={(event) =>
                                setDirtloss(Number(event.target.value)>=0 && Number(event.target.value)<=10?event.target.value:5)
                              }
                              
                              onMouseOver={e=>{dirtlossMouseOver("dirt", "hover"); handleClickNote(textData[9]);}}
                              // onMouseLeave={() => dirtlossMouseLeave("xy")}
                              onFocus={(e) => {dirtlossMouseOver("dirt", "focus"); handleClickNote(textData[9]);}}
                              onClick={() =>handleClickNote(textData[9])}
                              // onBlur={() => dirtlossMouseLeave("fout")}
                            />
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-12 insideFormPaddingWPS inputAdornmentWrap project_bas_field" style={{textAlign: 'center'}}>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" 
                              >
                              <input
                                type="radio"
                                className="form-control"
                                class="btn-check"
                                name={"btnradio1"}
                                id={"btnradio1"}
                                autocomplete="off"
                                checked={bas === "Manual Tracker"}
                                value="Manual Tracker"
                                onChange={(event) => setBas(event.target.value)}
                                onFocus={(e) => {dirtlossMouseOver("MT", "focus"); handleClickNote(textData[6]);}}
                                // onBlur={handlePopoverClose}
                              />
                              <label
                                class="btn btn-outline-primary"
                                for={"btnradio1"}
                                onMouseOver={(e) =>
                                  {dirtlossMouseOver("MT", "hover"); handleClickNote(textData[6]);}
                                }
                                onClick={() =>handleClickNote(textData[6])}
                                // onMouseEnter={e=>handleClickNote(textData[6])}  
                                // onMouseLeave={handlePopoverClose}
                              >
                                Manual Tracker
                              </label>
                              <input
                                className="form-control"
                                type="radio"
                                class="btn-check"
                                name={"btnradio2"}
                                id={"btnradio2"}
                                autocomplete="off"
                                checked={bas === "Ground Structure"}
                                value="Ground Structure"
                                onChange={(event) => setBas(event.target.value)}
                                onFocus={(e) => {dirtlossMouseOver("GS", "focus"); handleClickNote(textData[6]);}}
                                // onBlur={handlePopoverClose}
                              />
                              <label
                                class="btn btn-outline-primary"
                                for={"btnradio2"}
                                onMouseOver={(e) =>
                                  {dirtlossMouseOver("GS", "hover"); handleClickNote(textData[6]);}
                                }
                                onClick={() =>handleClickNote(textData[6])}
                                // onMouseEnter={e=>handleClickNote(textData[6])}  
                                // onMouseLeave={handlePopoverClose}
                              >
                                Ground Structure
                              </label>
                            </div>
                        </div>
                        </div>
                      {/* </div> */}
                      <Divider className="mb-3 mt-3" />

                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth={true}
                        className="mb-3 p-2"
                        onClick={() => evaluationfunction()}
                        disabled={!isValid?true:citylocation?false:true}
                      >
                        Evaluation
                      </Button>
                    </div>
                    <div className={`col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 rSPrSection ${filled}rSPrSection1`}>
                      {evaluation === true ? (
                        <>
                          <div>
                            <Analyze
                              evaluationdata={evaluationdata}
                              setDeviceCost={setDeviceCost}
                              citylocation={citylocation}
                              projectname={projectname}
                              filled={filled}
                              setFilled={setFilled}
                              handNexTrue={handNexTrue.bind(this)}
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={imagepath}
                          className={myImage}
                          alt="Responsive"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {activeStep === 1 ? (
                  <div className="row">
                    <div className="col-xl-5 col-lg-7 col-md-12 col-sm-12 col-12">
                      <h3>Project Accessories</h3>
                      <div className='accessory-wrapper' id="accessoryBody">
                        {inputFields.map((inputField, index) => (
                          <div className="row mr-0">
                            <div className="col-md-7">
                              <FormControl fullWidth>
                                <Autocomplete
                                  size="small"
                                  id="country-select-demo3"
                                  defaultValue={inputField.item}
                                  onChange={(event, newValue) =>{
                                    handlseelctitem(event, newValue, inputField.id, index);}
                                  }
                                  onMouseOver={() =>
                                    accessoryMouseOver(inputField.item?.image, "hover")
                                  }
                                
                                  onFocus={() =>
                                    accessoryMouseOver(inputField.item?.image, "focus")
                                  }
                                  
                                  style={{ width: 300 }}
                                  options={accessories}
                                  classes={{
                                    option: classes.option,
                                  }}
                                  autoHighlight
                                  getOptionLabel={(option) =>
                                    option ? option.name : ""
                                  }
                                  renderOption={(option) => (
                                    <React.Fragment>{option.name}</React.Fragment>
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      {...params}
                                      label="Item"
                                      variant="outlined"
                                      autoFocus={inputField.item?false:true}
                                      placeholder="pick item !"
                                      margin="normal"
                                      name="item"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      inputProps={{
                                        ...params.inputProps,
                                      }}
                                    />
                                  )}
                                />
                              </FormControl>
                            </div>
                            <div className="col-md-3">
                              <FormControl fullWidth>
                                <TextField
                                  id="outlined-basic7"
                                  label="Quantity"
                                  variant="outlined"
                                  size="small"
                                  placeholder="Quantity"
                                  margin="normal"
                                  name="Quantity"
                                  type="number"
                                  onChange={(event) =>
                                    handlchangquantity(
                                      event.target.value,
                                      inputField.id, inputField.item
                                    )
                                  }
                                  value={inputField.quantity}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {inputField.uomAc
                                          ? inputField.uomAc
                                          : "m"}
                                      </InputAdornment>
                                    ),
                                    inputProps: {
                                      min: inputField?.item?.min_quantity,
                                      max: inputField?.item?.max_quantity,
                                    },
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  // error={false}
                                  // helperText={'asdf'}
                                />
                              </FormControl>
                            </div>

                            <div
                              className="col-md-2"
                              style={{
                                paddingRight: "10px",
                                paddingLeft: "10px",
                              }}
                            >
                              <FormControl fullWidth style={{marginTop: '20px'}}>
                                {inputField?.item?.data_sheet?
                                  <BootstrapTooltip title="Download Data Sheet">
                                    <a
                                      href={`${axios.defaults.baseURL}accessories/data_sheet/${inputField?.item?.data_sheet}`}
                                      target="_blank"
                                    >
                                      
                                      <Button
                                        style={{
                                          padding: "6px 6px",
                                        }}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                      >
                                      </Button>
                                    </a>
                                  </BootstrapTooltip>
                                :''}
                                
                              </FormControl>
                            </div>
                          </div>
                        ))}
                      </div>
                      <IconButton
                        disabled={inputFields[inputFields.length-1]?.quantity?false:true}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={handleAddFields}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={handleRemoveFields}
                        disabled={inputFields.length <= 1}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </div>
                    
                    <div className="col-xl-7 col-lg-5 col-md-12 col-sm-12 col-12 accessory-item-sect" >
                      {accImgPath? 
                      loadImg ? (
                        <>
                          <span className="row justify-content-center">
                            <Spinner
                              radius={60}
                              color={"#3f51b5"}
                              stroke={3}
                              visible={loadImg}
                            />
                          </span>
                        </>
                      ) : (
                        <img
                          src={
                            accImgPath
                              ? `${axios.defaults.baseURL}accessories/${accImgPath}`
                              : "/Layouts/system layout with details.jpg"
                          }
                          className=" img-thumbnail rounded mx-auto d-block"
                          alt="Responsive"
                        />
                      )
                      :<img
                      src={`/Layouts/system layout with details.jpg`}
                      className=" img-thumbnail rounded mx-auto d-block"
                      alt="Responsive"
                    />}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {activeStep === 2 ? (
                  <div className="row step3-hieght">
                    <div className="col-md-12">
                      <div className="row justify-content-center ">
                        {submited ? (
                          <Alert severity="success" color="info">
                            <h1 color="success">
                              Congratulations Project Successfully Inserted !
                            </h1>
                          </Alert>
                        ) : (
                        <>
                          
                          {projectname &&
                          country &&
                          city &&
                          daynomichead &&
                          solarCable &&
                          motorcable &&
                          piplenght &&
                          discharge &&
                          dirtloss &&
                          bas &&
                          inputFields &&
                          pumpvalue &&
                          solarvalue &&
                          solarSelectWatt &&
                          invertorvalue ? (
                            <div className="col-md-12">
                              {estimatedCost? 
                              <h2 className='mt-1 p-0 center'>Estimated Cost (±): {Number(deviceCost)+Number(accessoryCost?accessoryCost:0)} $</h2>
                              :''}

                              <p className="mt-3 p-4" style={{textAlign:'center'}}>
                                Your Project Is Ready To Save it!, You can preview
                                your Project before submit it.
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        
                          
                          <div className="row justify-content-center ">
                           
                            <Button
                              variant="contained"
                              color="primary"
                              className="p-3"
                              size="large"
                              disabled={
                                projectname &&
                                country &&
                                city &&
                                daynomichead &&
                                solarCable &&
                                motorcable &&
                                piplenght &&
                                discharge &&
                                dirtloss &&
                                bas &&
                                inputFields &&
                                pumpvalue &&
                                solarvalue &&
                                solarSelectWatt &&
                                invertorvalue
                                  ? false
                                  : true
                              }
                              onClick={(e) => handlePreview()}
                            >
                              View project summary
                            </Button>
                            <Preview
                              open={openPre}
                              setOpen={setOpenPre}
                              match={previewData}
                              setPreviewData={setPreviewData}
                              projectID={projectID}
                              setProjectID={setProjectID}
                            />
                          </div>
                        </>
                        )}
                        
                        
                      </div>

                      
                      
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 2 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={e=>{handleNext(); calculateDeviceCost();}}
                      
                    >
                      Next
                    </Button>
                  ) : (
                    ""
                  )}

                  {activeStep === steps.length - 3 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={filled?false:true}
                    >
                      Next
                    </Button>
                  ) : (
                    ""
                  )}

                  {activeStep === steps.length - 1 ? (
                    <>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        projectname &&
                        country &&
                        city &&
                        daynomichead &&
                        solarCable &&
                        motorcable &&
                        piplenght &&
                        discharge &&
                        dirtloss &&
                        bas &&
                        inputFields &&
                        pumpvalue &&
                        solarvalue &&
                        solarSelectWatt &&
                        invertorvalue
                          ? false
                          : true
                      }
                    >
                      Submit
                    </Button>
                    {/* <NavLink  to="/app/newproject">
                        <Button className='ml-2'
                          variant="contained"
                          color="primary"
                        >
                          New Sizing
                        </Button>
                    </NavLink> */}
                    <Button className='ml-2'
                      variant="contained"
                      color="primary"
                      onClick={refreshPage}
                    >
                      New Sizing
                    </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
          )}
        </Paper>
        <NotificationContainer />
      </div>
    </>
  );
}
