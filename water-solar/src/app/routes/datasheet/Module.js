import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import Spinner from "react-spinner-material";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";

import "./download.css";

const Module = () => {
  const [solarList, setSolarList] = useState([]);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    getSolar();
  }, []);

  const getSolar = async () => {
    setVisibility(true);
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    var system = JSON.parse(localStorage.getItem("UserData")).system;
    var data = [id, system];
    axios
      .post("api/solar", data)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          setVisibility(false);
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setSolarList(res.data.solar_list);
        }
        setVisibility(false);
      })
      .catch((err) => {
        setVisibility(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };
  return (
    <>
      {visibility ? (
        <span className="row justify-content-center">
          <Spinner
            radius={60}
            color={"#3f51b5"}
            stroke={3}
            visible={visibility}
          />
        </span>
      ) : (
        <MaterialTable
          title="Solar Brand"
          columns={[
            { title: "Pruduct", field: "brand_name" },
            { title: "Model", field: "model" },
            { title: "Power", field: "power" },
            { title: "Currnet", field: "current" },
            { title: "Voltage", field: "voltage" },
            {
              title: "Download",
              render: (solar) => {
                return solar.data_sheet ? (
                  <a
                    href={`${axios.defaults.baseURL}brand/solar/solar_list/data_sheet/${solar.data_sheet}`}
                    download
                  >
                    <IconButton
                      size="small"
                      aria-label="download"
                      color="secondary"
                    >
                      <GetAppIcon />
                    </IconButton>
                  </a>
                ) : (
                  <IconButton
                    size="small"
                    aria-label="download"
                    color="secondary"
                  >
                    <GetAppIcon />
                  </IconButton>
                );
              },
            },
          ]}
          data={solarList}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <p color="primary">
                  <strong>No Record Found</strong>
                </p>
              ),
            },
          }}
        />
      )}

      <NotificationContainer />
    </>
  );
};

export default Module;
