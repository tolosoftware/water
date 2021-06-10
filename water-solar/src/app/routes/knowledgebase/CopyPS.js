import React, { useState, useEffect } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IntlMessages from "util/IntlMessages";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import { Table, ButtonGroup } from "reactstrap";
//pdf
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import { makeStyles } from "@material-ui/core/styles";
import "./print.css";
import "./style.scss";
//backdrop
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
const ref = React.createRef();



const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  headTr: {
    fontSize: 14,
    color: "#818385",
  },
  headSolarS: {
    fontSize: 14,
    color: "#000",
  },
  headThP: {
    borderBottom: "0px !important",
  },
  btnJr: {
    padding: "0.31rem 0.75rem !important",
    backgroundColor: "transparent !important",
  },
  secondRow: {
    textAlign: "right !important",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    width: '100%',
  },
  secondBtn: {
    marginLeft: 'auto',
  },

}));

const ProjectSummary = ({ match }) => {
  const [openbackdrop, setOpenbackdrop] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectAccessories, setProjectAccessories] = useState([]);
  const [irradiation, setIrradiation] = useState([]);
  const [energyWithOutPut, setEnergyWithOutPut] = useState([]);
  const [pupm, setPupm] = useState([]);
  const [solarBrand, setSolarBrand] = useState([]);
  const [solarList, setSolarList] = useState([]);
  const [inverter, setInverter] = useState([]);
  const [cable, setCable] = useState([]);
  const [visibleSect,setVisibleSect]= useState({
    structure: false, wiring: false, layout: false, sizing: false,
  });
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExp = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleVisibleSect = (e)=>{
    setVisibleSect({...visibleSect, [e.target.name]: e.target.checked});
  };
  const classes = useStyles();
  useEffect(() => {
    if (match.params?.id !== 0) {
      setOpenbackdrop(true);
      axios
        .get("api/project/" + match.params?.id)
        .then((res) => {
          console.log("res", res.data);
          setProjectDetails(res.data.project[0]);
          setProjectAccessories(res.data.projectAccessories);
          setIrradiation(res.data.irradiation);
          setEnergyWithOutPut(res.data.energyWithOutPut);
          setPupm(res.data.pupm);
          setSolarBrand(res.data.solarbrand);
          setSolarList(res.data.solarList);
          setInverter(res.data.inverter);
          setCable(res.data.cable);

          setOpenbackdrop(false);
        })
        .catch((err) => {
          setOpenbackdrop(false);
          NotificationManager.error(
            <IntlMessages id="notification.errorMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
        });
    }
    // console.log('match ',match);
  }, [match.params?.id]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="app-wrapper">
        <div className="row">
          <div className="col-md-9 ">
            <div ref={ref}>
              <Paper
                elevation={0}
                className="mb-3 p-4 project-summary customcolorindarkmode"
                style={{ backgroundColor: "#fff" }}
              >
                <table
                  className="report-container darkmodeColor"
                  style={{ width: "100%" }}
                >
                  <thead class="report-header">
                    <tr>
                      <th class="report-header-cell">
                        <div class="header-info">
                          <div
                            className="row mb-3"
                            style={{
                              borderBottom: "1px solid",
                              paddingTop: "20px",
                            }}
                          >
                            <div
                              className="col-md-12 mb-2"
                              style={{ paddingBottom: "10px" }}
                            >
                              <img
                                src="/images/System_logo1.png"
                                className="img-thumbnail"
                                style={{
                                  border: "0px solid #dee2e6",
                                  padding: "0px",
                                  height: "80px",
                                }}
                                alt="Responsive"
                              />

                              <div
                                style={{
                                  float: "right",
                                  display: "inline-block",
                                }}
                              >
                                <span>
                                  <ButtonGroup vertical={true}>
                                    <Button className="jr-btn">
                                      <i className="zmdi zmdi-email zmdi-hc-fw " />
                                    </Button>
                                    <Button className="jr-btn">
                                      <i className="zmdi zmdi-phone zmdi-hc-fw " />
                                    </Button>
                                    <Button className="jr-btn">
                                      <i className="zmdi zmdi-pin zmdi-hc-fw" />
                                    </Button>
                                  </ButtonGroup>
                                </span>
                                <span>
                                  <ButtonGroup
                                    vertical={true}
                                    className="header-info"
                                  >
                                    <Button
                                      className={`jr-btn ${classes.btnJr}`}
                                    >
                                      info@awm.solar
                                    </Button>
                                    <Button
                                      className={`jr-btn ${classes.btnJr}`}
                                    >
                                      +93 790303132
                                    </Button>
                                    <Button
                                      className={`jr-btn ${classes.btnJr}`}
                                    >
                                      Kabul-Afghanistan
                                    </Button>
                                  </ButtonGroup>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ width: "20%", display: "inline-block" }}
                          >
                            Project Name:
                          </div>
                          <div style={{ display: "inline-block" }}>
                            {projectDetails?.name}
                          </div>
                          <Divider className="mb-3 mt-3" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tfoot class="report-footer">
                    <tr>
                      <td class="report-footer-cell">
                        <div
                          class="footer-info"
                          style={{ paddingBottom: "30px" }}
                        >
                          <Divider className="mb-2 mt-2" />
                          <div
                            style={{ float: "left", display: "inline-block" }}
                          >
                            Created by: AWM (Solar AW water pump planner)
                          </div>
                          <div
                            id="page-number"
                            style={{ float: "right", display: "inline-block" }}
                          >
                            Water Is Life
                          </div>
                        </div>
                      </td>
                    </tr>
                    <span></span>
                  </tfoot>
                  <tbody class="report-content">
                    <tr className="page" style={{}}>
                      <td class="report-content-cell">
                        <div className={`main`}>
                          <div className="table-responsive-material mb-5">
                            <Table className="default-table table-unbordered table table-sm table-hover">
                              <thead className="table-head-sm th-border-b">
                                <tr className={classes.headTr}>
                                  <th>Input Summary</th>
                                  <th style={{ textAlign: "right" }}>
                                    {projectDetails
                                      ? projectDetails?.projectDate
                                      : ""}
                                  </th>
                                </tr>
                              </thead>
                              {/* Afghanistan, Herat, Long: 34° Lat: 69° */}
                              <tbody>
                                <tr>
                                  <td style={{ width: "20%" }}>Location:</td>
                                  <td>
                                    {projectDetails
                                      ? `${projectDetails?.geolocation?.country}, ${projectDetails?.geolocation?.city}(${projectDetails?.geolocation?.latitude}°, ${projectDetails?.geolocation?.longtitude}°)`
                                      : ""}
                                  </td>
                                </tr>
                                {(projectDetails.latitude && projectDetails.longtitude)
                                  ?
                                  <tr>
                                    <td>GPS:</td>
                                    <td>
                                      {`${projectDetails.latitude}°, ${projectDetails.longtitude}°`}
                                    </td>
                                  </tr>
                                  : ""}

                                <tr>
                                  <td>Designer:</td>
                                  <td>
                                    {projectDetails
                                      ? projectDetails?.user?.name
                                      : ""}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Avg. Hourly water:</td>
                                  <td>
                                    {projectDetails
                                      ? projectDetails?.daily_output
                                      : ""}
                                    (m³/h)
                                  </td>
                                </tr>
                                <tr>
                                  <td>Avg. Daily water:</td>
                                  <td>
                                    {energyWithOutPut?.monthlyAvaOfOut}(m³/d)
                                  </td>
                                </tr>

                                <tr>
                                  <td>Total Dynamic head:</td>
                                  <td>{projectDetails?.daynomic_head}(m)</td>
                                </tr>
                                <tr>
                                  <td>Pipe Friction losses:</td>
                                  <td>
                                    {Math.ceil(
                                      Number(
                                        (projectDetails?.dirt_loss *
                                          projectDetails?.pip_length) /
                                        100
                                      )
                                    )}
                                    m (
                                    {projectDetails
                                      ? projectDetails?.dirt_loss
                                      : ""}
                                    %)
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                          <div className="table-responsive-material mb-5">
                            <Table className="default-table table-unbordered table table-sm table-hover">
                              <thead className="table-head-sm th-border-b">
                                <tr className={classes.headTr}>
                                  <th>Main Products</th>
                                  <th>Description</th>
                                  <th>Unite</th>
                                  <th>Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style={{ width: "20%" }}>Solar</td>
                                  <td style={{ width: "60%" }}>
                                    {solarBrand
                                      ? solarBrand?.name +
                                      " " +
                                      solarList?.solar_list_with_cable
                                        ?.power +
                                      "W " +
                                      solarList?.solar_list_with_cable?.type +
                                      " crystalline " +
                                      solarList?.solar_list_with_cable
                                        ?.voltage +
                                      "V " +
                                      solarList?.solar_list_with_cable
                                        ?.current +
                                      "A"
                                      : ""}
                                  </td>
                                  <td style={{ width: "10%" }}>png</td>
                                  <td style={{ width: "10%" }}>
                                    {solarList ? solarList?.solar_quantity : ""}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Pump</td>
                                  <td>
                                    {pupm
                                      ? pupm[0]?.pump_brand?.name +
                                      " " +
                                      pupm[0]?.hp +
                                      "HP " +
                                      pupm[0]?.power +
                                      "Kw " +
                                      pupm[0]?.voltage +
                                      "V"
                                      : ""}
                                  </td>
                                  <td>pc</td>
                                  <td>1</td>
                                </tr>
                                <tr>
                                  <td>Controller</td>
                                  <td>
                                    {inverter
                                      ? inverter?.invertor_brand?.name +
                                      " " +
                                      inverter?.power +
                                      "kw " +
                                      inverter?.voltage +
                                      "V"
                                      : ""}
                                  </td>
                                  <td>pc</td>
                                  <td>1</td>
                                </tr>
                                <tr>
                                  <td>Structure</td>
                                  <td>{solarList ? solarList?.base : ""}</td>
                                  <td>set</td>
                                  <td>
                                    {solarList ? solarList?.panal_quantity : ""}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Motor Cable</td>
                                  <td>{cable ? cable?.name : ""}</td>
                                  <td>m</td>
                                  <td>
                                    {projectDetails
                                      ? projectDetails?.motor_cable
                                      : ""}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Solar Cable</td>
                                  <td>
                                    {solarList
                                      ? solarList?.solar_list_with_cable?.cable
                                        ?.name
                                      : ""}
                                  </td>
                                  <td>m</td>
                                  <td>
                                    {projectDetails
                                      ? projectDetails?.solar_cable
                                      : ""}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Pipline</td>
                                  <td>polyeithline 2inch </td>
                                  <td>m</td>
                                  <td>
                                    {projectDetails
                                      ? projectDetails?.pip_length
                                      : ""}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>

                          <div className="table-responsive-material mb-5">
                            <Table className="default-table table-unbordered table table-sm table-hover">
                              <thead className="table-head-sm th-border-b">
                                <tr className={classes.headTr}>
                                  <th>Accessories</th>
                                  <th>Description</th>
                                  <th>Unite</th>
                                  <th>Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {projectAccessories.map(
                                  (projectAccessory, index) => (
                                    <tr key={index}>
                                      <td style={{ width: "20%" }}>
                                        {
                                          projectAccessory
                                            .accessories_list_with_uom?.name
                                        }
                                      </td>
                                      <td style={{ width: "60%" }}>
                                        {
                                          projectAccessory
                                            .accessories_list_with_uom?.model
                                        }
                                      </td>
                                      <td style={{ width: "10%" }}>
                                        {
                                          projectAccessory
                                            .accessories_list_with_uom?.uom
                                            ?.acronym
                                        }
                                      </td>
                                      <td style={{ width: "10%" }}>
                                        {projectAccessory.quantity}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr className="page" style={{}}>
                      <td class="report-content-cell">
                        <div className={`main`}>
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                              <section className="mt-5">
                                <div class="wrapper wrapperOut">
                                  <h3>Output [m³]</h3>
                                  <div class="content">
                                    <h4 style={{ textAlign: "center" }}>
                                      Daily Average output/month
                                    </h4>
                                    <ResponsiveContainer
                                      width="100%"
                                      height={245}
                                    >
                                      <BarChart
                                        data={energyWithOutPut?.monthlyHrOutput}
                                        margin={{
                                          top: 10,
                                          right: 0,
                                          left: -15,
                                          bottom: 0,
                                        }}
                                      >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                          dataKey="MonthlyOutput"
                                          fill="#00AEEF"
                                        />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </section>
                              <section>
                                <div class="wrapper wrapperOut">
                                  <h3>Output [m³]</h3>
                                  <div class="content">
                                    <h4 style={{ textAlign: "center" }}>
                                      Hourly Output
                                    </h4>
                                    <ResponsiveContainer
                                      width="100%"
                                      height={245}
                                    >
                                      <BarChart
                                        data={energyWithOutPut?.hrOutputP}
                                        margin={{
                                          top: 10,
                                          right: 0,
                                          left: -15,
                                          bottom: 0,
                                        }}
                                      >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                          dataKey="hrOutput"
                                          fill="#00AEEF"
                                        />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </section>
                              <section>
                                <div class="wrapper wrapperIr">
                                  <h3>Irradiation [kwh/m2]</h3>
                                  <div class="content">
                                    <h4 style={{ textAlign: "center" }}>
                                      Irradiation value in deferent months of
                                      year
                                    </h4>
                                    <ResponsiveContainer
                                      width="100%"
                                      height={240}
                                    >
                                      <BarChart
                                        data={irradiation?.monthIrrs}
                                        margin={{
                                          top: 10,
                                          right: 0,
                                          left: -15,
                                          bottom: 0,
                                        }}
                                      >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#FAA74B" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                                <div class="wrapper wrapperIr">
                                  <h3>Irradiation [kwh/m2]</h3>
                                  <div class="content">
                                    <h4 style={{ textAlign: "center" }}>
                                      Hourly Values
                                    </h4>
                                    <ResponsiveContainer
                                      width="100%"
                                      height={240}
                                    >
                                      <BarChart
                                        data={irradiation?.dailyIrrs}
                                        margin={{
                                          top: 10,
                                          right: 0,
                                          left: -15,
                                          bottom: 0,
                                        }}
                                      >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#FAA74B" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </section>
                              <section>
                                <div class="wrapper wrapperEn">
                                  <h3>Energy [kwh]</h3>
                                  <div class="content">
                                    <h4 style={{ textAlign: "center" }}>
                                      Energy value in deferent months of year
                                    </h4>
                                    <ResponsiveContainer
                                      width="100%"
                                      height={240}
                                    >
                                      <BarChart
                                        data={
                                          energyWithOutPut?.energyForEachMonth
                                        }
                                        margin={{
                                          top: 10,
                                          right: 0,
                                          left: -15,
                                          bottom: 0,
                                        }}
                                      >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="energy" fill="#ED1C24" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                                <div class="wrapper wrapperEn">
                                  <h3>Energy [kwh]</h3>
                                  <div class="content">
                                    <h4 style={{ textAlign: "center" }}>
                                      Hourly Values
                                    </h4>
                                    <ResponsiveContainer
                                      width="100%"
                                      height={240}
                                    >
                                      <BarChart
                                        data={energyWithOutPut?.hrEnergy}
                                        margin={{
                                          top: 10,
                                          right: 0,
                                          left: -15,
                                          bottom: 0,
                                        }}
                                      >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="hrEn" fill="#ED1C24" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr className="page" style={{}}>
                      <td class="report-content-cell">
                        <table style="width:100%">
                            <tr>
                              <th>Name</th>
                              <th colspan="2">Telephone</th>
                              <th></th>
                            </tr>
                            <tr>
                              <td>Bill Gates</td>
                              <td>55577854</td>
                              <td>55577855</td>
                            </tr>
                          </table>
                        <div className={`main`}>
                          <div className="row">
                            <strong
                              style={{
                                marginTop: "40px",
                                paddingBottom: "5px",
                                marginBottom: "7px",
                                marginLeft: "10px",
                                width: "100%",
                                marginRight: "135px",
                                borderBottom: "2px solid #ced4da",
                              }}
                            >
                              Submersible pump specification:
                            </strong>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                              <div className="row">
                                <div
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12"
                                  style={{ paddingRight: "0px" }}
                                >
                                  <div className="table-responsive-material ">
                                    <Table className="default-table table-unbordered table table-sm table-hover">
                                      <thead className="table-head-sm th-border-b"></thead>
                                      <tbody>
                                        <tr>
                                          <td>Brand:</td>
                                          <td>
                                            {pupm
                                              ? pupm[0]?.pump_brand?.name
                                              : ""}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Model:</td>
                                          <td>{pupm ? pupm[0]?.model : ""}</td>
                                        </tr>
                                        <tr>
                                          <td>Power:</td>
                                          <td>
                                            {pupm ? pupm[0]?.power : ""}Kw
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Hors power:</td>
                                          <td>{pupm ? pupm[0]?.hp : ""}HP</td>
                                        </tr>
                                        <tr>
                                          <td>Current:</td>
                                          <td>
                                            {pupm ? pupm[0]?.ampeier : ""}A
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Voltage:</td>
                                          <td>
                                            {pupm ? pupm[0]?.voltage : ""}V
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Outlet:</td>
                                          <td>
                                            {pupm ? pupm[0]?.outlet : ""}inch
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Diameter:</td>
                                          <td>
                                            {pupm ? pupm[0]?.diameter : ""}inch
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Weight:</td>
                                          <td>
                                            {pupm ? pupm[0]?.weight : ""}kg
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Made in:</td>
                                          <td>
                                            {pupm
                                              ? pupm[0]?.pump_brand?.country
                                              : ""}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                                <div
                                  className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12"
                                  style={{ padding: "0px", paddingTop: "35px" }}
                                >
                                  {pupm[0]?.graph?
                                    <img
                                      src={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/graph/${pupm[0]?.graph}`}
                                      className="img-thumbnail"
                                      style={{
                                        border: "0px solid #dee2e6",
                                        padding: "0px",
                                      }}
                                      alt="Responsive"
                                    />
                                  :''}
                                  
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                  {pupm[0]?.diameter_file?
                                    <img
                                    src={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/diameter/${pupm[0]?.diameter_file}`}
                                    className="img-thumbnail"
                                    style={{
                                      border: "0px solid #dee2e6",
                                      padding: "0px",
                                      maxHeight: "150px",
                                      paddingTop: "30px",
                                    }}
                                    alt="Responsive"
                                  />
                                  :''}
                                  
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12">
                              {pupm[0]?.image?
                                <img
                                  src={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/${pupm[0]?.image}`}
                                  className="img-thumbnail"
                                  style={{
                                    border: "0px solid #dee2e6",
                                    padding: "0px",
                                    maxHeight: "460px", 
                                  }}
                                  alt="Responsive"
                                />
                              :''}
                              
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr className="page" style={{}}>
                      <td class="report-content-cell">
                        
                        <div className={`main`}>
                          <section>
                            <div className="row">
                              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12">
                                <div className="table-responsive-material">
                                  <Table className="default-table table-unbordered table table-sm table-hover">
                                    <thead className="table-head-sm th-border-b">
                                      <tr className={classes.headSolarS}>
                                        <th>Solar specification:</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td style={{ width: "60%" }}>Brand:</td>
                                        <td>
                                          {solarBrand ? solarBrand?.name : ""}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Model:</td>
                                        <td>
                                          {solarList
                                            ? solarList?.solar_list_with_cable
                                              ?.model
                                            : ""}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Rated Maximum power (Pmax):</td>
                                        <td>270Wp</td>
                                      </tr>
                                      <tr>
                                        <td>Voltage at Maximum power(Vmp):</td>
                                        <td>31.3V</td>
                                      </tr>
                                      <tr>
                                        <td>Current at Maximum power(Imp):</td>
                                        <td>8.79A</td>
                                      </tr>
                                      <tr>
                                        <td>Open Circuit Voltage(VOC):</td>
                                        <td>38.4V</td>
                                      </tr>
                                      <tr>
                                        <td>Short Circuit Current (Isc):</td>
                                        <td>9.31A</td>
                                      </tr>
                                      <tr>
                                        <td>Mazimum System Voltage:</td>
                                        <td>1000V</td>
                                      </tr>
                                      <tr>
                                        <td>Size (mm):</td>
                                        <td>1648*995*35mm</td>
                                      </tr>
                                      <tr>
                                        <td>Weight:</td>
                                        <td>18kg</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12">
                                {solarList?.solar_list_with_cable?.image?
                                <img
                                  src={`${axios.defaults.baseURL}brand/solar/solar_list/${solarList?.solar_list_with_cable?.image}`}
                                  className="img-thumbnail"
                                  style={{
                                    border: "0px solid #dee2e6",
                                    padding: "0px", paddingTop: 40,
                                  }}
                                  alt="Responsive"
                                />
                                :''}
                                
                              </div>
                              <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 col-xs-12">
                                {solarList?.solar_list_with_cable?.diameter?
                                  <img
                                    src={`${axios.defaults.baseURL}brand/solar/solar_list/diameter/${solarList?.solar_list_with_cable?.diameter}`}
                                    className="img-thumbnail"
                                    style={{
                                      border: "0px solid #dee2e6",
                                      padding: "0px",
                                    }}
                                    alt="Responsive"
                                  />
                                :''}
                                  
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 col-xs-12" style={{padding: "0px", paddingTop: "115px",}}
                                >
                                  <img
                                    src="/images/Voltage.png"
                                    className="img-thumbnail"
                                    style={{
                                      border: "0px solid #dee2e6",
                                      padding: "0px",
                                    }}
                                    alt="Responsive"
                                  />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </td>
                    </tr>

                    <tr className="page" style={{}}>
                      <td class="report-content-cell">
                        <div className={`main`}>
                          <div className="row" style={{ marginTop: "20px" }}>
                            <div
                              className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12"
                              style={{ height: "fit-content" }}
                            >
                              <div className="table-responsive-material ">
                                <Table className="default-table table-unbordered table table-sm table-hover">
                                  <thead className="table-head-sm th-border-b">
                                    <tr className={classes.headSolarS}>
                                      <th>
                                        <strong>
                                          Controller specification:
                                        </strong>
                                      </th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td style={{ width: "32%" }}>Brand:</td>
                                      <td>
                                        {inverter
                                          ? inverter?.invertor_brand?.name
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Model:</td>
                                      <td>{inverter ? inverter?.model : ""}</td>
                                    </tr>
                                    <tr>
                                      <td>Power:</td>
                                      <td>
                                        {inverter ? inverter?.power : ""}Kw
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Hors power:</td>
                                      <td>5.5HP</td>
                                    </tr>
                                    <tr>
                                      <td>Current:</td>
                                      <td>
                                        {inverter ? inverter?.current : ""}A
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Voltage:</td>
                                      <td>
                                        {inverter ? inverter?.voltage : ""}V
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Weight:</td>
                                      <td>26kg</td>
                                    </tr>
                                    <tr>
                                      <td>Made in:</td>
                                      <td>
                                        {inverter
                                          ? inverter?.invertor_brand?.country
                                          : ""}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                            <div
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12"
                              style={{ paddingLeft: "0px", paddingTop: "50px" }}
                            >
                              {inverter?.image?
                                <img
                                src={`${axios.defaults.baseURL}brand/invertor/invertor_list/${inverter?.image}`}
                                className="img-thumbnail"
                                style={{
                                  border: "0px solid #dee2e6",
                                  padding: "0px",
                                }}
                                alt="Responsive"
                              />
                              :''}
                              
                            </div>
                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 col-xs-12"
                              style={{ marginTop: "-90px" }}
                            >
                              {inverter?.diameter?  <img
                                src={`${axios.defaults.baseURL}brand/invertor/invertor_list/diameter/${inverter?.diameter}`}
                                className="img-thumbnail"
                                style={{
                                  border: "0px solid #dee2e6",
                                  padding: "0px",
                                }}
                                alt="Responsive"
                              />
                            :''}
                             
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {visibleSect.structure?'':
                      <tr className="page" style={{}}>
                        <td class="report-content-cell">
                          <div className={`main`}>
                            <div className="row" style={{ marginTop: "20px" }}>
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                <section>
                                  <div className="table-responsive-material">
                                    <Table className="default-table table-unbordered table table-sm table-hover">
                                      <thead className="table-head-sm th-border-b">
                                        <tr className={classes.headSolarS}>
                                          <th>
                                            <strong>
                                              Strucuter specification:
                                            </strong>
                                          </th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td style={{ width: "32%" }}>Brand:</td>
                                          <td>No</td>
                                        </tr>
                                        <tr>
                                          <td>Model:</td>
                                          <td>
                                            {projectDetails
                                              ? projectDetails?.solar_base
                                              : ""}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Capacity:</td>
                                          <td>4/6/8/10/12 panels</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                  <img
                                    src={
                                      projectDetails?.solar_base ===
                                      "Ground Structure"
                                        ? "/images/structure.png"
                                        : "/images/ground.jpg"
                                    }
                                    className="img-thumbnail"
                                    style={{ border: "0px solid #dee2e6" }}
                                    alt="Responsive"
                                  />
                                  <h4>
                                    Note: Image may be deferent with actual
                                    product as this is a graphic design.
                                  </h4>
                                </section>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    }
                    {visibleSect.wiring?'':
                      <tr className="page" style={{}}>
                        <td class="report-content-cell ">
                          <div className={`main`}>
                            <div className="row">
                              <div
                                className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12"
                                style={{ pageBreakAfter: "always" }}
                              >
                                <section>
                                  <Divider className="mb-3 mt-3" />
                                  <h6>
                                    <strong>Wiring Diagram</strong>
                                  </h6>
                                  {solarList?.image?
                                  <img
                                    src={`${axios.defaults.baseURL}brand/solar/solar_list/config/${solarList?.image}`}
                                    className="img-thumbnail "
                                    alt="Responsive"
                                    style={{ border: "none" }}
                                  />
                                  :''}
                                  
                                </section>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    }
                    {visibleSect.layout?'':
                      <tr >
                        <td class="report-content-cell">
                          <div className={`main`}>
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12"
                                style={{ pageBreakAfter: "always" }}
                              >
                                <Divider className="mb-3 mt-3" />
                                <span>
                                  <strong>System General layout</strong>
                                </span>
                                <img
                                  src="/Layouts/system layout with details1.jpg"
                                  className="img-thumbnail "
                                  alt="Responsive"
                                  style={{ border: "none" }}
                                />

                                <div className="table-responsive-material">
                                  <Table className="default-table table-unbordered table table-sm table-hover">
                                    <thead className="table-head-sm th-border-b">
                                      <tr className={classes.headSolarS}></tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td style={{ width: "50%" }}>
                                          <h5>1- Solar panels</h5>
                                        </td>
                                        <td style={{ width: "50%" }}>
                                          <h5>9- Garden</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>2- Pump controller</h5>
                                        </td>
                                        <td>
                                          <h5>10- Swimming pool</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>3- Submersible</h5>
                                        </td>
                                        <td>
                                          <h5>11- Water reservoir</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>4- well probe sensors</h5>
                                        </td>
                                        <td>
                                          <h5>12- Flaut switch</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>5- Pump electrical cable</h5>
                                        </td>
                                        <td>
                                          <h5>13- Flaut switch Ele. cable</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>6- Non return valve</h5>
                                        </td>
                                        <td>
                                          <h5>14- Residential Houses</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>7- Pressure Gauge</h5>
                                        </td>
                                        <td>
                                          <h5>15- Toilet</h5>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <h5>8- Water meter</h5>
                                        </td>{" "}
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    }
                    {visibleSect.sizing?'':
                      <tr>
                        <td class="report-content-cell">
                          <div className={`main`}>
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                <Divider className="mb-3 mt-3" />
                                <span>
                                  {" "}
                                  <strong>Sizing layout</strong>
                                </span>
                                <img
                                  src="/Layouts/layout details1.jpg"
                                  className="img-thumbnail "
                                  alt="Responsive"
                                  style={{ border: "none" }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    }
                    <tr>
                      <td class="report-content-cell">
                        <div className={`main`}></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Paper>
            </div>
          </div>
          <div className="col-md-3">
            <Paper elevation={0} className="mb-3 p-4">
              <div className="row ">
                <div className="col-md-12 d-flex justify-content-center p-1">
                  <h5>Project Summary</h5>
                </div>
                <div className="col-md-6 d-flex justify-content-center p-1">
                  
                  <Pdf
                    targetRef={ref}
                    filename="Project summary.pdf" /*options={options}*/
                  >
                    {({ toPdf }) => (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={toPdf}
                        startIcon={<CloudDownloadIcon />}
                        className="float-right"
                      >
                        {" "}
                        Download{" "}
                      </Button>
                    )}
                  </Pdf>
                </div>
                

                <div className="col-md-6 d-flex justify-content-center p-1">
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PrintIcon />}
                        className="float-right"
                      >
                        {" "}
                        Print{" "}
                      </Button>
                    )}
                    content={() => ref.current}
                  />
                </div>
              </div>
              <Divider className="mb-3 mt-3" />
              <div className="row ">
                <div className="col-md-12 d-flex justify-content-center">
                  <Accordion className={classes.root} expanded={expanded === 'panel1'} onChange={handleChangeExp('panel1')} >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Pump Data Sheet</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                      <a disabled={pupm[0]?.data_sheet?false:true} href={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/data_sheet/${pupm[0]?.data_sheet}`} target="_blank">
                        <Button disabled={pupm[0]?.data_sheet?false:true} 
                          variant="contained"
                          color="primary"
                          startIcon={<CloudDownloadIcon />}
                          className="float-right ps-btn"
                        >
                        </Button>
                        </a>
                      </Typography>

                      <Typography className={classes.secondBtn}>
                        <Button disabled={pupm[0]?.data_sheet?false:true} 
                          variant="contained"
                          color="primary"
                          startIcon={<PrintIcon />}
                          className="float-right ps-btn"
                          >
                        </Button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                
                <div className="col-md-12 d-flex justify-content-center">
                  <Accordion className={classes.root} expanded={expanded === 'panel2'} onChange={handleChangeExp('panel2')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Solar Data Sheet</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <a disabled={solarList?.solar_list_with_cable?.data_sheet?false:true}  href={`${axios.defaults.baseURL}brand/solar/solar_list/data_sheet/${solarList?.solar_list_with_cable?.data_sheet}`} target="_blank">
                          <Button disabled={solarList?.solar_list_with_cable?.data_sheet?false:true}
                            variant="contained"
                            color="primary"
                            startIcon={<CloudDownloadIcon />}
                            className="float-right ps-btn"
                          >
                            {/* Download */}
                          </Button>
                        </a>
                      </Typography>

                      <Typography className={classes.secondBtn}>
                        <Button disabled={solarList?.solar_list_with_cable?.data_sheet?false:true}
                          variant="contained"
                          color="primary"
                          startIcon={<PrintIcon />}
                          className="float-right ps-btn"
                          >
                          
                          {/* Print */}
                        </Button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                
                <div className="col-md-12 d-flex justify-content-center">
                  <Accordion className={classes.root} expanded={expanded === 'panel3'} onChange={handleChangeExp('panel3')} >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography className={classes.heading}>Controller Data Sheet</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                      <a disabled={inverter?.data_sheet?false:true} href={`${axios.defaults.baseURL}brand/invertor/invertor_list/data_sheet/${inverter?.data_sheet}`} target="_blank">
                          <Button disabled={inverter?.data_sheet?false:true}
                            variant="contained"
                            color="primary"
                            startIcon={<CloudDownloadIcon />}
                            className="float-right ps-btn"
                          >
                          </Button>
                        </a>
                      </Typography>

                      <Typography className={classes.secondBtn}>
                        <Button disabled={inverter?.data_sheet?false:true}
                          variant="contained"
                          color="primary"
                          startIcon={<PrintIcon />}
                          className="float-right ps-btn"
                          >
                          
                          {/* Print */}
                        </Button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                
              </div>
              <Divider className="mb-3 mt-3" />


              <div className="row ">
                <div className="col-md-12 d-flex justify-content-center">
                  <FormControlLabel
                    control={<Checkbox checked={visibleSect.structure} onChange={handleVisibleSect}  name="structure" />}
                    label="Structure Specification"
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                  <FormControlLabel
                    control={<Checkbox checked={visibleSect.wiring} onChange={handleVisibleSect} name="wiring" />}
                    label="Wiring Diagram"
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                  <FormControlLabel
                    control={<Checkbox checked={visibleSect.layout} onChange={handleVisibleSect} name="layout" />}
                    label="System Layout"
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                  <FormControlLabel
                    control={<Checkbox checked={visibleSect.sizing} onChange={handleVisibleSect} name="sizing" />}
                    label="Sizing Layout"
                  />
                </div>
              </div>

            </Paper>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
};
export default ProjectSummary;
