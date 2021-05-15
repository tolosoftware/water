import React, { useState } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import { Table, ButtonGroup } from 'reactstrap';
//pdf
import Pdf from 'react-to-pdf';
import ReactToPrint from 'react-to-print';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { StyleSheet } from '@react-pdf/renderer';
//check boxes
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
//chart 
//chart iports
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import data from './data';
import { makeStyles } from '@material-ui/core/styles';

const ref = React.createRef();
// const styles = StyleSheet.create({
//   page: { backgroundColor: 'tomato' },
//   section: { color: 'white', textAlign: 'center', margin: 5 }
// });
const useStyles = makeStyles({
    headTr: {
        fontSize: 14,
        color: '#818385',
    },
    headSolarS: {
        fontSize: 14,
        color: '#000',
    },
    headThP: {
        borderBottom: '0px !important',
    },
    btnJr: {
        padding: '0.31rem 0.75rem !important',
        backgroundColor: 'transparent !important',
    },
    secondRow: {
        textAlign: 'right !important',
    },
});

const ProjectSummary = ({ match }) => {
    const [projectDetails, setProjectDetails] = useState([]);

    const classes = useStyles();

    return (
        <div className="app-wrapper">
            <ContainerHeader match={match} title={<IntlMessages id="Project Summary" />} />

            <div className="row" >

                <div className="col-md-9" ref={ref}>

                    <Paper elevation={0} className="mb-3 p-4 project-summary">

                        <div className="row mb-3" style={{borderBottom: '1px solid',}}>
                            <div className="col-md-6 mb-2">
                                <img src="/images/System_logo1.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px', width: '200px', height: '80px' }} alt="Responsive" />
                            </div>
                            <div className={`col-md-6 mb-2 ${classes.secondRow}`}>
                                
                                <span>
                                <ButtonGroup vertical={true}>
                                    <Button className="jr-btn">
                                        <i className="zmdi zmdi-email zmdi-hc-fw "/>
                                    </Button>
                                    <Button className="jr-btn">
                                        <i className="zmdi zmdi-phone zmdi-hc-fw "/>
                                    </Button>
                                    <Button className="jr-btn">
                                        <i className="zmdi zmdi-map zmdi-hc-fw"/>
                                    </Button>
                                </ButtonGroup>
                                </span>
                                <span>
                                    <ButtonGroup vertical={true}>
                                        <Button className={`jr-btn ${classes.btnJr}`} >info@awm.solar</Button>
                                        <Button className={`jr-btn ${classes.btnJr}`}>+93 790303132</Button>
                                        <Button className={`jr-btn ${classes.btnJr}`}>Kabul-Afghanistan</Button>
                                    </ButtonGroup>
                                </span>
                            </div>
                        </div>
                        <div className="table-responsive-material mb-5">
                            <Table className="default-table table-unbordered table table-sm table-hover">
                                <thead className="table-head-sm th-border-b">
                                    <tr className={classes.headTr}>
                                        <th>Input Summary</th><th style={{ textAlign: 'right' }}>Monday , 25,April,2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{ width: '20%' }}>Project Name:</td><td>Robat Saliman</td></tr>
                                    <tr><td>Location:</td><td>Afghanistan, Herat, Long: 34° Lat: 69°</td></tr>
                                    <tr><td>Designer:</td><td>En. Mohammad Wali Nabizada</td></tr>
                                    <tr><td>Avg. Hourly water:</td><td>10(m³/h)</td></tr>
                                    <tr><td>Avg. Daily water:</td><td>100(m³/d)</td></tr>
                                    <tr><td>Total Dynamic head:</td><td>100(m)</td></tr>
                                    <tr><td>Pipe Friction losses:</td><td>5(%)</td></tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="table-responsive-material mb-5">
                            <Table className="default-table table-unbordered table table-sm table-hover">
                                <thead className="table-head-sm th-border-b">
                                    <tr className={classes.headTr}>
                                        <th>Main Products</th><th>Description</th><th>Unite</th><th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{ width: '20%' }}>Solar</td><td style={{ width: '60%' }}>TOMMA TECH 270W poly crystalline 36V 8.5A</td><td style={{ width: '10%' }}>png</td><td style={{ width: '10%' }}>30</td></tr>
                                    <tr><td>Pump</td><td>Pedrollo 10HP 7.5kw 380V</td><td>pc</td><td>1</td></tr>
                                    <tr><td>Controller</td><td>Vacon Ip66 7.5kw 380V</td><td>pc</td><td>1</td></tr>
                                    <tr><td>Structure</td><td>Maunal tracker</td><td>set</td><td>3</td></tr>
                                    <tr><td>Motor Cable</td><td>3*4mm2</td><td>m</td><td>100</td></tr>
                                    <tr><td>Solar Cable</td><td>2*6mm2</td><td>m</td><td>100</td></tr>
                                    <tr><td>Pipline</td><td>polyeithline 2inch </td><td>m</td><td>100</td></tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="table-responsive-material mb-5">
                            <Table className="default-table table-unbordered table table-sm table-hover">
                                <thead className="table-head-sm th-border-b">
                                    <tr className={classes.headTr}>
                                        <th>Accessories</th><th>Description</th><th>Unite</th><th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{ width: '20%' }}>Flaut switch</td><td style={{ width: '60%' }}>Mechanical sensor for reservoir</td><td style={{ width: '10%' }} >png</td><td style={{ width: '10%' }}>30</td></tr>
                                    <tr><td>Controller box</td><td>Controller Box</td><td>pc</td><td>1</td></tr>
                                    <tr><td>PV combiner</td><td>DC wires combiner box</td><td>pc</td><td>1</td></tr>
                                    <tr><td>fiting</td><td>Elbo, stard, etc</td><td>set</td><td>3</td></tr>
                                    <tr><td>EMT</td><td>Emt pip for cabling</td><td>m</td><td>100</td></tr>
                                    <tr><td>Sensor Cable</td><td>for cabling</td><td>m</td><td>100</td></tr>
                                    <tr><td>safety rope</td><td>2*1.5</td><td>m</td><td>100</td></tr>
                                    <tr><td>wire tie</td><td>for submersible</td><td>m</td><td>100</td></tr>
                                </tbody>
                            </Table>
                        </div>

                        {/* <h4 style={{ textAlign: 'center' }}>Daily Average output/month</h4> */}
                        <h4 style={{ textAlign: 'center' }}>Daily Average output/month</h4>
                        <Divider className="mb-3 mt-3" />
                        <div className="row justify-content-center">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12" style={{ paddingTop: '11.5%', textAlign: 'center' }}>
                                Output [m³]
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10  col-xs-12">

                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#00AEEF" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>Hourly Output</h4>
                        <Divider className="mb-3 mt-3" />
                        <div className="row center">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12" style={{ paddingTop: '11.5%', textAlign: 'center' }}>
                                Output [m³]
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#00AEEF" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>

                        <h4 style={{ textAlign: 'center', marginTop: '4rem' }}>Irradiation value in deferent months of year</h4>
                        <Divider className="mb-3 mt-3" />
                        {/* <strong>Iridiation</strong> */}
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12" style={{ paddingTop: '11.5%', textAlign: 'center' }}>
                                Iridiation [kwh/m2]
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#FAA74B" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>Hourly Values</h4>
                        <Divider className="mb-3 mt-3" />
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12" style={{ paddingTop: '11.5%', textAlign: 'center' }}>
                                Iridiation [kwh/m2]
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#FAA74B" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>Energy value in deferent months of year</h4>
                        <Divider className="mb-3 mt-3" />
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12" style={{ paddingTop: '11.5%', textAlign: 'center' }}>
                                Energy [kwh]
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#ED1C24" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>Hourly Values</h4>
                        <Divider className="mb-3 mt-3" />
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12" style={{ paddingTop: '11.5%', textAlign: 'center' }}>
                                Energy [kwh]
                                </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#ED1C24" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="row">
                            {/* <strong>System Characteristic</strong> */}
                            {/* <Divider className="mb-3 mt-3" /> */}
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12">
                                <div className="table-responsive-material mb-5">
                                    <Table className="default-table table-unbordered table table-sm table-hover">
                                        <thead className="table-head-sm th-border-b">
                                            <tr className={classes.headSolarS}>
                                                <th>Solar specification:</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td style={{ width: '60%' }}>Brand:</td><td>TOMMATECH</td></tr>
                                            <tr><td>Model:</td><td>TT270-60P</td></tr>
                                            <tr><td>Rated Maximum power (Pmax):</td><td>270Wp</td></tr>
                                            <tr><td>Voltage at Maximum power(Vmp):</td><td>31.3V</td></tr>
                                            <tr><td>Current at Maximum power(Imp):</td><td>8.79A</td></tr>
                                            <tr><td>Open Circuit Voltage(VOC):</td><td>38.4V</td></tr>
                                            <tr><td>Short Circuit Current (Isc):</td><td>9.31A</td></tr>
                                            <tr><td>Mazimum System Voltage:</td><td>1000V</td></tr>
                                            <tr><td>Size (mm):</td><td>1648*995*35mm</td></tr>
                                            <tr><td>Weight:</td><td>18kg</td></tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="row">
                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 col-xs-12">
                                        <img src="/images/connector.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                                    </div>
                                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 col-xs-12" style={{ padding: '0px', paddingTop: '115px' }}>
                                        <img src="/images/Voltage.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                                    </div>

                                </div>

                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12">
                                <img src="/images/solar1.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                            </div>
                        </div>
                        <div className="row">
                            <strong style={{ marginTop: '40px', paddingBottom: '5px', marginBottom: '7px', marginLeft: '10px', width: '100%', marginRight: '135px', borderBottom: '2px solid #ced4da' }}>Submersible pump specification:</strong>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 col-xs-12">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12" style={{ paddingRight: '0px' }}>
                                        <div className="table-responsive-material mb-5">
                                            <Table className="default-table table-unbordered table table-sm table-hover">
                                                <thead className="table-head-sm th-border-b">
                                                    {/* <tr className={classes.headSolarS}>
                                                        <th className={classes.headThP}></th>
                                                        <th className={classes.headThP}></th>
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    <tr><td>Brand:</td><td>Pedrollo</td></tr>
                                                    <tr><td>Model:</td><td>TT270-60P</td></tr>
                                                    <tr><td>Power:</td><td>4Kw</td></tr>
                                                    <tr><td>Hors power:</td><td>5.5HP</td></tr>
                                                    <tr><td>Current:</td><td>8.8A</td></tr>
                                                    <tr><td>Voltage:</td><td>380V</td></tr>
                                                    <tr><td>Outlet:</td><td>2inch</td></tr>
                                                    <tr><td>Diameter:</td><td>4inch</td></tr>
                                                    <tr><td>Weight:</td><td>26kg</td></tr>
                                                    <tr><td>Made in:</td><td>Italy</td></tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12" style={{ padding: '0px', paddingTop: '35px' }}>
                                        <img src="/images/Graph.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                        <img src="/images/dimentaion.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                                    </div>
                                </div>

                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 col-xs-12">
                                <img src="/images/pump.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '20px' }}>
                            {/* <strong>System Characteristic</strong> */}
                            {/* <Divider className="mb-3 mt-3" /> */}
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12">
                                <div className="table-responsive-material mb-5">
                                    <Table className="default-table table-unbordered table table-sm table-hover">
                                        <thead className="table-head-sm th-border-b">
                                            <tr className={classes.headSolarS}>
                                                <th><strong>Controller specification:</strong></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td style={{ width: '32%' }}>Brand:</td><td>Pedrollo</td></tr>
                                            <tr><td>Model:</td><td>TT270-60P</td></tr>
                                            <tr><td>Power:</td><td>4Kw</td></tr>
                                            <tr><td>Hors power:</td><td>5.5HP</td></tr>
                                            <tr><td>Current:</td><td>8.8A</td></tr>
                                            <tr><td>Voltage:</td><td>380V</td></tr>
                                            <tr><td>Outlet:</td><td>2inch</td></tr>
                                            <tr><td>Diameter:</td><td>4inch</td></tr>
                                            <tr><td>Weight:</td><td>26kg</td></tr>
                                            <tr><td>Made in:</td><td>Italy</td></tr>
                                        </tbody>
                                    </Table>
                                </div>


                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12" style={{ paddingLeft: '0px', paddingTop: '50px' }}>
                                <img src="/images/controller.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 col-xs-12">
                                <img src="/images/controllerConfig.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 col-xs-12" style={{ paddingTop: '205px' }}>
                                <img src="/images/controllerDimention.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px' }} alt="Responsive" />
                            </div>

                        </div>
                        <div className="row" style={{ marginTop: '20px' }}>
                            {/* <strong>System Characteristic</strong> */}
                            {/* <Divider className="mb-3 mt-3" /> */}
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 col-xs-12">
                                <div className="table-responsive-material">
                                    <Table className="default-table table-unbordered table table-sm table-hover">
                                        <thead className="table-head-sm th-border-b">
                                            <tr className={classes.headSolarS}>
                                                <th><strong>Strucuter specification:</strong></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td style={{ width: '32%' }}>Brand:</td><td>No</td></tr>
                                            <tr><td>Model:</td><td>Manual tracker</td></tr>
                                            <tr><td>Capacity:</td><td>4/6/8/10/12 panels</td></tr>
                                        </tbody>
                                    </Table>
                                </div>


                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 col-xs-12">
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                <img src="/images/structure.png" className="img-thumbnail" style={{ border: '0px solid #dee2e6', padding: '0px', width: '70%', float: 'right' }} alt="Responsive" />
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12" style={{ paddingTop: '15px' }}>
                                <strong>Note: Image may be deferent with actual product as this is a graphic design.</strong>
                            </div>

                        </div>

                        <Divider className="mb-3 mt-3" />
                        <strong>Wiring Diagram</strong>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                <img src="/images/wiring.png" className="img-thumbnail " alt="Responsive" style={{ border: 'none' }} />
                            </div>
                        </div>

                        <Divider className="mb-3 mt-3" />
                        <strong>System General layout</strong>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                <img src="/Layouts/system layout with details1.jpg" className="img-thumbnail " alt="Responsive" style={{ border: 'none' }} />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 col-xs-12" style={{ paddingLeft: '70px' }}>
                                <h5>1- Solar panels</h5>
                                <h5>2- Pump controller</h5>
                                <h5>3- Submersible</h5>
                                <h5>4- well probe sensors</h5>
                                <h5>5- Pump electrical cable</h5>
                                <h5>6- Non return valve</h5>
                                <h5>7- Pressure Gauge</h5>
                                <h5>8- Water meter</h5>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 col-xs-12" style={{ paddingLeft: '70px' }}>
                                <h5>9- Garden</h5>
                                <h5>10- Swimming pool</h5>
                                <h5>11- Water reservoir</h5>
                                <h5>12- Flaut switch</h5>
                                <h5>13- Flaut switch Ele. cable</h5>
                                <h5>14- ResidenƟal Houses</h5>
                                <h5>15- Toilet</h5>
                            </div>

                        </div>
                        <Divider className="mb-3 mt-3" />
                        <strong>Sizing layout</strong>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                <img src="/Layouts/layout details.jpg" className="img-thumbnail " alt="Responsive" style={{ border: 'none' }} />
                            </div>
                        </div>


                    </Paper>

                </div>

                <div className="col-md-3">
                    <Paper elevation={0} className="mb-3 p-4">
                        <div className="row ">
                            <div className="col-md-6 d-flex justify-content-center p-1">
                                <Pdf targetRef={ref.current} filename="Project summary.pdf" >
                                    {({ toPdf }) => (
                                        <Button variant="contained" color="primary" onClick={toPdf} startIcon={<CloudDownloadIcon />} className="float-right"> Download </Button>
                                    )}

                                </Pdf>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center p-1">

                                <ReactToPrint
                                    trigger={() => <Button variant="contained" color="primary" startIcon={<PrintIcon />} className="float-right"> Print </Button>}
                                    content={() => ref.current}
                                />

                            </div>
                        </div>
                        <Divider className="mb-3 mt-3" />
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
                        <FormControlLabel control={<Checkbox name="checkedD" />} label="Disabled" />
                        <FormControlLabel control={<Checkbox checked name="checkedE" />} label="Disabled" />
                        <FormControlLabel control={<Checkbox name="checkedD" />} label="Disabled" />
                        <FormControlLabel control={<Checkbox checked name="checkedE" />} label="Disabled" />

                    </Paper>
                </div>
            </div>

        </div>

    );
}
export default ProjectSummary;
