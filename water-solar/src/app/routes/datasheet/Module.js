import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";

import "./download.css";

const Module = () => {
  const [solarList, setSolarList] = useState([]);

  useEffect(() => {
    getSolar();
  }, []);

  const getSolar = async () => {
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios
      .get("api/solar/" + id)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setSolarList(res.data.solar_list);
        }
      })
      .catch((err) => {
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };
  return (
    <>
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
                <strong>Loading...</strong>
              </p>
            ),
          },
        }}
      />
      <NotificationContainer />
    </>
  );
};

export default Module;
