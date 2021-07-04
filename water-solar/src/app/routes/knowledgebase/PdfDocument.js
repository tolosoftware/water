import React from "react";
import { Document, Page, Text, View,Image,  StyleSheet } from "@react-pdf/renderer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Table, ButtonGroup } from "reactstrap";
import axios from "axios";
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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1, 
  },
});
const useStyles = makeStyles((theme) => ({
     
  
  }));

// Create Document Component
const PdfDocument = (props) => {
  const {
    projectDetails,
    projectAccessories,
    irradiation,
    energyWithOutPut,
    pupm,
    solarBrand,
    solarList,
    inverter,
    structure,
    cable,
  } = props;
  const classes = useStyles();
  const pageHead = (
    <div class="header-info">
      <div
        className="row mb-3"
        style={{
          borderBottom: "1px solid",
          paddingTop: "20px",
        }}
      >
        <div className="col-md-12 mb-2" style={{ paddingBottom: "10px" }}>
          <Image
            source="/images/System_logo1.png"
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
              <ButtonGroup vertical={true} className="header-info">
                <Button className={`jr-btn ${classes.btnJr}`}>
                  info@awm.solar
                </Button>
                <Button className={`jr-btn ${classes.btnJr}`}>
                  +93 790303132
                </Button>
                <Button className={`jr-btn ${classes.btnJr}`}>
                  Kabul-Afghanistan
                </Button>
              </ButtonGroup>
            </span>
          </div>
        </div>
      </div>
      <div style={{ width: "20%", display: "inline-block" }}>Project Name:</div>
      <div style={{ display: "inline-block" }}>{projectDetails?.name}</div>
      <Divider className="mb-3 mt-3" />
    </div>
  );
  const pageFooter = (value) => {
    return (
      <div class="footer-info" style={{ paddingBottom: "30px" }}>
        <Divider className="mb-2 mt-2" />
        <div style={{ float: "left", display: "inline-block" }}>
          Created by: AWM Solar Water Pumping System Planner
        </div>
        <div id="page-number" style={{ float: "right", display: "inline-block" }}>
          Water Is Life page {value}
        </div>
      </div>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <div className={`main`}>
              <div className="table-responsive-material mb-5">
                <Table className="default-table table-unbordered table table-sm table-hover">
                  <thead className="table-head-sm th-border-b">
                    <tr className={classes.headTr}>
                      <th>Input Summary</th>
                      <th style={{ textAlign: "right" }}>
                        {projectDetails ? projectDetails?.projectDate : ""}
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
                    {projectDetails.latitude && projectDetails.longtitude ? (
                      <tr>
                        <td>GPS:</td>
                        <td>
                          {`${projectDetails.latitude}°, ${projectDetails.longtitude}°`}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    <tr>
                      <td>Designer:</td>
                      <td>
                        {projectDetails ? projectDetails?.user?.name : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Avg. Hourly water:</td>
                      <td>
                        {projectDetails
                          ? projectDetails?.daily_output + "(m³/h) "
                          : ""}
                        {projectDetails?.daily_output_lable != "m³/h" &&
                        projectDetails?.daily_output_lable != null
                          ? projectDetails?.daily_output_changed +
                            "(" +
                            projectDetails?.daily_output_lable +
                            ")"
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Avg. Daily water:</td>
                      <td>{energyWithOutPut?.monthlyAvaOfOut}(m³/d)</td>
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
                        m ({projectDetails ? projectDetails?.dirt_loss : ""}
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
                            solarList?.solar_list_with_cable?.power +
                            "W " +
                            solarList?.solar_list_with_cable?.type +
                            " crystalline " +
                            solarList?.solar_list_with_cable?.voltage +
                            "V " +
                            solarList?.solar_list_with_cable?.current +
                            "A"
                          : ""}
                      </td>
                      <td style={{ width: "10%" }}>panel</td>
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
                            pupm[0]?.model +
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
                      <td>{solarList ? solarList?.panal_quantity : ""}</td>
                    </tr>
                    <tr>
                      <td>Motor Cable</td>
                      <td>{cable ? cable?.name : ""}</td>
                      <td>m</td>
                      <td>
                        {projectDetails
                          ? Math.ceil(Number(projectDetails?.motor_cable))
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Solar Cable</td>
                      <td>
                        {solarList
                          ? solarList?.solar_list_with_cable?.cable?.name
                          : ""}
                      </td>
                      <td>m</td>
                      <td>
                        {projectDetails ? projectDetails?.solar_cable : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Pipline</td>
                      <td>polyeithline 2inch </td>
                      <td>m</td>
                      <td>
                        {projectDetails ? projectDetails?.pip_length : ""}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="table-responsive-material mb-5 accessory-sect">
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
                    {projectAccessories.map((projectAccessory, index) => (
                      <tr key={index}>
                        <td style={{ width: "20%" }}>
                          {projectAccessory.accessories_list_with_uom?.name}
                        </td>
                        <td style={{ width: "60%" }}>
                          {projectAccessory.accessories_list_with_uom?.model}
                        </td>
                        <td style={{ width: "10%" }}>
                          {
                            projectAccessory.accessories_list_with_uom?.uom
                              ?.acronym
                          }
                        </td>
                        <td style={{ width: "10%" }}>
                          {projectAccessory.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("1/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
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
                        <ResponsiveContainer width="100%" height={245}>
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
                            <Bar dataKey="MonthlyOutput" fill="#00AEEF" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div class="wrapper wrapperOut">
                      <h3>Output [m³]</h3>
                      <div class="content">
                        <h4 style={{ textAlign: "center" }}>Hourly Output</h4>
                        <ResponsiveContainer width="100%" height={245}>
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
                            <Bar dataKey="hrOutput" fill="#00AEEF" />
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
                          Irradiation value in deferent months of year
                        </h4>
                        <ResponsiveContainer width="100%" height={240}>
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
                        <h4 style={{ textAlign: "center" }}>Hourly Values</h4>
                        <ResponsiveContainer width="100%" height={240}>
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
                        <ResponsiveContainer width="100%" height={240}>
                          <BarChart
                            data={energyWithOutPut?.energyForEachMonth}
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
                        <h4 style={{ textAlign: "center" }}>Hourly Values</h4>
                        <ResponsiveContainer width="100%" height={240}>
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
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("2/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>Submersible pump specification:</caption>
              <tr>
                <td style={{ width: "30%" }}>
                  <div className="table-responsive-material ">
                    <Table className="default-table table-unbordered table table-sm table-hover">
                      <thead className="table-head-sm th-border-b"></thead>
                      <tbody>
                        <tr>
                          <td>Brand:</td>
                          <td>{pupm ? pupm[0]?.pump_brand?.name : ""}</td>
                        </tr>
                        <tr>
                          <td>Model:</td>
                          <td>{pupm ? pupm[0]?.model : ""}</td>
                        </tr>
                        <tr>
                          <td>Power:</td>
                          <td>{pupm ? pupm[0]?.power : ""}Kw</td>
                        </tr>
                        <tr>
                          <td>Hors power:</td>
                          <td>{pupm ? pupm[0]?.hp : ""}HP</td>
                        </tr>
                        <tr>
                          <td>Current:</td>
                          <td>{pupm ? pupm[0]?.ampeier : ""}A</td>
                        </tr>
                        <tr>
                          <td>Voltage:</td>
                          <td>{pupm ? pupm[0]?.voltage : ""}V</td>
                        </tr>
                        <tr>
                          <td>Outlet:</td>
                          <td>{pupm ? pupm[0]?.outlet : ""}inch</td>
                        </tr>
                        <tr>
                          <td>Diameter:</td>
                          <td>{pupm ? pupm[0]?.diameter : ""}inch</td>
                        </tr>
                        <tr>
                          <td>Weight:</td>
                          <td>{pupm ? pupm[0]?.weight : ""}kg</td>
                        </tr>
                        <tr>
                          <td>Made in:</td>
                          <td>{pupm ? pupm[0]?.pump_brand?.country : ""}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
                <td style={{ width: "60%" }}>
                  {pupm[0]?.graph ? (
                    <Image
                      source={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/graph/${pupm[0]?.graph}`}
                      className="img-thumbnail pump-graph"
                      style={{
                        border: "0px solid #dee2e6",
                        padding: "0px",
                      }}
                      alt="Responsive"
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {pupm[0]?.image ? (
                    <Image
                      source={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/${pupm[0]?.image}`}
                      className="img-thumbnail"
                      style={{
                        border: "0px solid #dee2e6",
                        padding: "0px",
                        maxHeight: "460px",
                      }}
                      alt="Responsive"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="pump-diameter">
                    {pupm[0]?.diameter_file ? (
                      <Image
                        source={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/diameter/${pupm[0]?.diameter_file}`}
                        className="img-thumbnail pump-diameter"
                        style={{
                          border: "0px solid #dee2e6",
                          padding: "0px",
                          paddingTop: "30px",
                        }}
                        alt="Responsive"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("3/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>Solar specification:</caption>
              <tr>
                <td style={{ width: "60%" }}>
                  <div className="table-responsive-material">
                    <Table className="default-table table-unbordered table table-sm table-hover">
                      <tbody>
                        <tr>
                          <td style={{ width: "60%" }}>Brand:</td>
                          <td>{solarBrand ? solarBrand?.name : ""}</td>
                        </tr>
                        <tr>
                          <td>Model:</td>
                          <td>
                            {solarList
                              ? solarList?.solar_list_with_cable?.model
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
                </td>
                <td>
                  {solarList?.solar_list_with_cable?.image ? (
                    <Image
                      source={`${axios.defaults.baseURL}brand/solar/solar_list/${solarList?.solar_list_with_cable?.image}`}
                      className="img-thumbnail solar-image"
                      style={{
                        border: "0px solid #dee2e6",
                        padding: "0px",
                        float: "right",
                      }}
                      alt="Responsive"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div className="solar-diameter">
                    {solarList?.solar_list_with_cable?.diameter ? (
                      <Image
                        source={`${axios.defaults.baseURL}brand/solar/solar_list/diameter/${solarList?.solar_list_with_cable?.diameter}`}
                        className="img-thumbnail solar-diamention"
                        style={{
                          border: "0px solid #dee2e6",
                          padding: "0px",
                        }}
                        alt="Responsive"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("4/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>Controller specification:</caption>
              <tr>
                <td style={{ width: "70%" }}>
                  <div className="table-responsive-material ">
                    <Table className="default-table table-unbordered table table-sm table-hover">
                      <tbody>
                        <tr>
                          <td style={{ width: "32%" }}>Brand:</td>
                          <td>
                            {inverter ? inverter?.invertor_brand?.name : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>Model:</td>
                          <td>{inverter ? inverter?.model : ""}</td>
                        </tr>
                        <tr>
                          <td>Power:</td>
                          <td>{inverter ? inverter?.power : ""}Kw</td>
                        </tr>
                        <tr>
                          <td>Hors power:</td>
                          <td>5.5HP</td>
                        </tr>
                        <tr>
                          <td>Current:</td>
                          <td>{inverter ? inverter?.current : ""}A</td>
                        </tr>
                        <tr>
                          <td>Voltage:</td>
                          <td>{inverter ? inverter?.voltage : ""}V</td>
                        </tr>
                        <tr>
                          <td>Weight:</td>
                          <td>26kg</td>
                        </tr>
                        <tr>
                          <td>Made in:</td>
                          <td>
                            {inverter ? inverter?.invertor_brand?.country : ""}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
                <td>
                  {inverter?.image ? (

                    <Image
                      source={`${axios.defaults.baseURL}brand/invertor/invertor_list/${inverter?.image}`}
                      className="img-thumbnail invertor-image"
                      style={{
                        border: "0px solid #dee2e6",
                        padding: "0px",
                      }}
                      alt="Responsive"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center" }}
                  className="controller-diameter"
                >
                  {inverter?.diameter ? (
                    <Image
                    className="img-thumbnail invertor-diamention"
                    style={{
                      border: "0px solid #dee2e6",
                      padding: "0px",
                    }}
                    alt="Responsive"
                       source={`${axios.defaults.baseURL}brand/invertor/invertor_list/diameter/${inverter?.diameter}`}
                   />
                    // <Image
                    //   source={`${axios.defaults.baseURL}brand/invertor/invertor_list/diameter/${inverter?.diameter}`}
                    //   className="img-thumbnail invertor-diamention"
                    //   style={{
                    //     border: "0px solid #dee2e6",
                    //     padding: "0px",
                    //   }}
                    //   alt="Responsive"
                    // />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("5/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>Strucuter specification:</caption>
              <tr>
                <td style={{ width: "40%" }}>Brand:</td>
                <td>No</td>
              </tr>
              <tr>
                <td style={{ width: "40%" }}>Model:</td>
                <td>{projectDetails ? projectDetails?.solar_base : ""}</td>
              </tr>
              <tr>
                <td>Capacity:</td>
                <td>4/6/8/10/12 panels</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {/* <Image src={(projectDetails?.solar_base==="Manual Tracker")?"/images/manual_tracker.png":"/images/ground_stucture.jpg"}
                                      className={`img-thumbnail ${projectDetails?.solar_base==='Manual Tracker'? 'manual':'structure'}-img`}
                                      style={{ border: "0px solid #dee2e6" }}
                                      alt="Responsive"
                                /> */}
                  <Image
                    source={`${axios.defaults.baseURL}structure/${structure?.image}`}
                    className={`img-thumbnail structure-img`}
                    style={{ border: "0px solid #dee2e6" }}
                    alt="Responsive"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h4>
                    Note: Image may be deferent with actual product as this is a
                    graphic design.
                  </h4>
                </td>
              </tr>
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("6/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>Wiring Diagram</caption>
              <tr>
                <td style={{ textAlign: "center" }}>
                  {solarList?.image ? (
                    <Image
                      source={`${axios.defaults.baseURL}brand/solar/solar_list/config/${solarList?.image}`}
                      className="img-thumbnail wiring-img"
                      alt="Responsive"
                      style={{ border: "none" }}
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("7/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>System General layout</caption>
              <tr>
                <td colSpan="2">
                  <Image
                    src="/Layouts/system layout with details1.jpg"
                    className="img-thumbnail "
                    alt="Responsive"
                    style={{ border: "none" }}
                  />
                </td>
              </tr>
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
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("8/9")}</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{pageHead}</Text>
        </View>
        <View style={styles.section}>
          {/* <Text> */}
            <table style={{ width: "100%" }} className="inside-table-pump">
              <caption>Sizing layout</caption>
              <tr>
                <td>
                  <Image
                    src="/Layouts/layout details1.jpg"
                    className="img-thumbnail "
                    alt="Responsive"
                    style={{ border: "none" }}
                  />
                </td>
              </tr>
            </table>
          {/* </Text> */}
        </View>
        <View style={styles.section}>
          <Text>{pageFooter("9/9")}</Text>
        </View>
      </Page>
    </Document>
  );
};
export default PdfDocument;