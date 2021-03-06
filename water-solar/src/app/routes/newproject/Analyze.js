import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { ReportProblem } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { UncontrolledAlert } from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

//form
import axios from "axios";
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
//backdrop
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
//country flag
import Flags from "country-flag-icons/react/3x2";
//chart iports
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

//alert
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  backgroundaccordiancolor: {
    backgroundColor: "#00000008",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  rootalert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

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

export default function Analyze(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const {setDeviceCost}= props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 
  useEffect(() => {
    if (props.evaluationdata) {
      docalculculation();
    }
    if (props.citylocation) {
      getIrredation();
    }
  }, [props.evaluationdata, props.citylocation]);
 
  const [openbackdrop, setOpenbackdrop] = React.useState(false);
  const [sugestedpump, setSugestedpump] = React.useState([]);
  const [cable, setCable] = React.useState([]);
  const [solar, setSolar] = React.useState([]);
  const [solarbrand, setSolarbrand] = React.useState([]);
  const [inverter, setInverter] = React.useState([]);
  const [structure, setStructure] = React.useState([]);
  const [hrEnergy, setHrEnergy] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [hrOutputP, setHrOutputP] = useState([]);
  const [monthlyHrOutput, setMonthlyHrOutput] = useState([]);
  const [dataError, setDataError] = useState(false);
  const [inputError, setInputError] = useState({});
  useEffect(() => {
    var pumpCost = sugestedpump[0]?.price?sugestedpump[0]?.price:0;
    var solarCost = solar?.solar_list?.price?Number(solar?.solar_list?.price)*Number(solar.solar_quantity):0;
    var inverterCost = inverter?.price?inverter?.price:0;
    var structureCost = structure?.price?structure?.price:0;
    var motorCablePrice = cable?.price?Number(cable?.price)*Number(props.evaluationdata?.motorcable):0;
    var solarCablePrice = solar?.solar_list?.cable?.price?Number(solar?.solar_list?.cable?.price)*Number(props.evaluationdata?.solarCable):0;

    var totalPrice = Number(pumpCost)+(Number(solarCost))+Number(inverterCost)+Number(structureCost)+Number(motorCablePrice)+Number(solarCablePrice);
    setDeviceCost(Number(totalPrice)+Number(structureCost));
    // console.log('deviceCost', Number(totalPrice)+Number(structureCost))
    
   }, [sugestedpump[0]?.price, solar?.solar_list?.price, inverter?.price, structure?.price]);
  const {filled, setFilled} = props;

  const docalculculation = async() => {
    setOpenbackdrop(true);
    // console.log("props evaluationdata: ", props.evaluationdata);
    axios
      .post("api/project-analyze", props.evaluationdata)
      .then((res) => {
        // console.log(res.data);
        setOpenbackdrop(false);
        
        
        if(!res.data.errors.head || !res.data.errors.discharge || !res.data.errors.motorcable || !res.data.errors.pumpvalue || !res.data.errors.solarvalue || !res.data.errors.invertorvalue){
          setInputError(res.data.errors);
          console.log('res data errors', inputError);
          console.log('res data errors 1', res.data.errors);
          setOpenbackdrop(false);
          setDataError(true);
          setFilled(false);
          NotificationManager.error(
            <IntlMessages id="notification.errorMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
        }else{
          setSugestedpump(res.data.pupm);
          setCable(res.data.cable);
          setSolar(res.data.solar);
          setInverter(res.data.inverter);
          setStructure(res.data.structure[0]);
          setSolarbrand(res.data.solarbrand);
          setHrEnergy(res.data.hrEnergy);
          setEnergy(res.data.energy);
          setHrOutputP(res.data.hrOutputP);
          setMonthlyHrOutput(res.data.monthlyHrOutput);
          setDataError(false);
          setFilled(true);
          NotificationManager.success(
            <IntlMessages id="notification.successMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
        }
        
      })
      .catch((err) => {
        setOpenbackdrop(false);
        setDataError(true);
        setSugestedpump([]);
          setCable([]);
          setSolar([]);
          setInverter([]);
          setStructure([]);
          setSolarbrand([]);
          setHrEnergy([]);
          setEnergy([]);
          setHrOutputP([]);
          setMonthlyHrOutput([]);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
      // console.log('res data errors AFTER', inputError);
  };
  const [irdationAvregePerHour, setirdationAvregePerHour] = useState([]);
  const [irdformont, setIrdformont] = useState([]);

  const [avgmonth, setAvgmonth] = useState("");
  const getIrredation = async() => {
    setOpenbackdrop(true);
    axios
      .get("api/getIrredation/" + props.citylocation)
      .then((res) => {
        setOpenbackdrop(false);
        setirdationAvregePerHour(res.data.avForhour);
        setIrdformont(res.data.avForMonth);
        setAvgmonth(res.data.avgofeachmonth);
      })
      .catch((err) => {
        setOpenbackdrop(false);
        setirdationAvregePerHour([]);
        setIrdformont([]);
        setAvgmonth('');
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };
  return (
    <div className="row m-1">
      {dataError ? (
        <div className="row justify-content-center " style={{ margin: "auto" }}>
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg justify-content-center">
            <span className="icon-addon alert-addon">
              <ReportProblem />
              {/* <i className="zmdi zmdi-danger zmdi-hc-fw zmdi-hc-lg" /> */}
            </span>

            <h2 className="d-inline-block">
              Please Change the Brand, or your sizing input values then try again!
            </h2>
          </UncontrolledAlert>
        </div>
      ) : (
        ""
      )}
      <div className="col-md-12">
        <h2>Project Name : {props.projectname} </h2>{" "}
      </div>
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {filled ? (
        <div className={classes.root}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={classes.backgroundaccordiancolor}
            >
              <Typography className={classes.heading}>Output</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* start char */}

              <div className="col-md-7">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={monthlyHrOutput}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="MonthlyOutput" fill="#3367d6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-md-5">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={hrOutputP}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hrOutput" fill="#3367d6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* end chart */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              className={classes.backgroundaccordiancolor}
            >
              <Typography className={classes.heading}>Irradiations</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {/* start char */}

              <div className="col-md-7">
                <span class="badge badge-primary ml-4">
                  Average = {avgmonth}
                </span>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={irdformont}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-md-5">
                <span class="badge badge-primary ml-4">Average = 50</span>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={irdationAvregePerHour}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="val" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* end chart */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              className={classes.backgroundaccordiancolor}
            >
              <Typography className={classes.heading}>Energy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* start char */}

              <div className="col-md-7">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={energy}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="energy" fill="#FF0000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-md-5">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={hrEnergy}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hrEn" fill="#FF0000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* end chart */}
            </AccordionDetails>
          </Accordion>
          <div className="mt-4"></div>
          <div>
            <h2>Water Pump</h2>
            {sugestedpump?.length !== 0 ? (
              <>
                <strong className="mb-2" style={{ marginBottom: "2px" }}>
                  {" "}
                </strong>
                <div className="row">
                  <div className="col-md-3">
                    <strong>Made in {sugestedpump[0].pump_brand.country} </strong>
                    {getFlag(sugestedpump[0].pump_brand.country)}{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Brand: {sugestedpump[0].pump_brand.name}</strong>
                  </div>
                  <div className="col-md-3">
                    <strong>Model: {sugestedpump[0].model}</strong>
                  </div>
                  <div className="col-md-3" style={{paddingRight: '10px', paddingLeft: '10px'}}>
                      <FormControl fullWidth>
                      <a href={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/data_sheet/${sugestedpump[0]?.data_sheet}`} target="_blank">
                      <Button
                          style={{padding: '0px 6px'}}
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<CloudDownloadIcon />}
                        >
                          Data Sheet
                        </Button>
                      </a>
                        
                      </FormControl>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <strong>Power: {sugestedpump[0].power} KW</strong>
                  </div>
                  <div className="col-md-3">
                    <strong>Current: {sugestedpump[0].ampeier} A</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Cable: {cable.name}</strong>{" "}
                  </div>
                </div>
              
              </>
            ) : (
              ""
            )}

            {sugestedpump?.length === 0 ? (
              <div className={classes.rootalert}>
                <Alert severity="error">Water Pump Not found !</Alert>
              </div>
            ) : (
              ""
            )}

            <Divider className="mb-3 mt-3" />
            <h2>Solar</h2>
            {solar?.length !== 0 ? (
              <>
                <strong className="mb-2" style={{ marginBottom: "2px" }}>
                  {" "}
                </strong>
                <div className="row">
                  <div className="col-md-3">
                    <strong>Made in {solarbrand.country} </strong>{" "}
                    {getFlag(solarbrand.country)}{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Brand: {solarbrand.name}</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Model: {solar.solar_list.model}</strong>{" "}
                  </div>
                  <div className="col-md-3" style={{paddingRight: '10px', paddingLeft: '10px'}}>
                      <FormControl fullWidth>
                      <a href={`${axios.defaults.baseURL}brand/solar/solar_list/data_sheet/${solar.solar_list?.data_sheet}`} target="_blank">
                      <Button
                          style={{padding: '0px 6px'}}
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<CloudDownloadIcon />}
                        >
                          Data Sheet
                        </Button>
                      </a>
                        
                      </FormControl>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <strong>Power: {solar?.solar_list?.power} W</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Current: {solar?.solar_list?.current} A</strong>
                  </div>
                  <div className="col-md-3">
                    <strong>Quantity: {solar.solar_quantity} panel</strong>{" "}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <Divider className="mb-3 mt-3" />
            <h2>Inverter</h2>
            {inverter?.length !== 0 ? (
              <>
                <strong className="mb-2" style={{ marginBottom: "2px" }}>
                  {" "}
                </strong>
                <div className="row">
                  <div className="col-md-3">
                    <strong>Made in {inverter?.invertor_brand?.country} </strong>{" "}
                    {getFlag(inverter?.invertor_brand?.country)}{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Brand: {inverter?.invertor_brand?.name}</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Model: {inverter?.model}</strong>{" "}
                  </div>
                  <div className="col-md-3" style={{paddingRight: '10px', paddingLeft: '10px'}}>
                      <FormControl fullWidth>
                      <a href={`${axios.defaults.baseURL}brand/invertor/invertor_list/data_sheet/${inverter?.data_sheet}`} target="_blank">
                      <Button
                          style={{ padding: '0px 6px'}}
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<CloudDownloadIcon />}
                        >
                          Data Sheet
                        </Button>
                      </a>
                        
                      </FormControl>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <strong>Power: {inverter?.power} KW</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Current: {inverter?.current} A</strong>
                  </div>
                  <div className="col-md-3">
                    <strong>Voltage: {inverter?.voltage} V</strong>{" "}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {inverter?.length === 0 ? (
              <div className={classes.rootalert}>
                <Alert severity="error">Inverter Not found !</Alert>
              </div>
            ) : (
              ""
            )}

            <Divider className="mb-3 mt-3" />
            <h2>Structure</h2>
            {structure? (
              <>
                <strong className="mb-2" style={{ marginBottom: "2px" }}>
                  {" "}
                </strong>
                <div className="row">
                   
                  <div className="col-md-3">
                    <strong>Name: {structure?.name}</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Model: {structure?.model}</strong>{" "}
                  </div>
                  <div className="col-md-3">
                    <strong>Quantity: {solar.panal_quantity} stand</strong>{" "}
                  </div>
                  <div className="col-md-3" style={{paddingRight: '10px', paddingLeft: '10px'}}>
                      <FormControl fullWidth>
                      <a href={`${axios.defaults.baseURL}structure/data_sheet/${structure?.datasheet}`} target="_blank">
                      <Button
                          style={{ padding: '0px 6px'}}
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<CloudDownloadIcon />}
                        >
                          Data Sheet
                        </Button>
                      </a>
                        
                      </FormControl>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
            
      ) : (
        ""
      )}
      <NotificationContainer />
    </div>
  );
}
