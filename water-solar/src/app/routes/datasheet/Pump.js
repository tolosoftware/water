import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import GetAppIcon from "@material-ui/icons/GetApp";
import  {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import "./download.css";

const Pump = () => {
  const [pump, setPump] = useState([]);
  useEffect(() => {
    getPump();
  }, []);

  const getPump = async () => {
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios
      .get("api/pump/" + id)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setPump(res.data.pump_lists);
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
        title="Pump Brand"
        columns={[
          { title: "Pruduct", field: "brand_name" },
          { title: "Model", field: "model" },
          { title: "Current", field: "ampeier" },
          { title: "Power (KW)", field: "power" },
          { title: "HP", field: "hp" },
          {
            title: "Download",
            render: (pump) => {
              return pump.data_sheet ? (
                <a
                  href={
                    pump.data_sheet == 0
                      ? "#"
                      : `${axios.defaults.baseURL}brand/pumpbrand/pump_list/data_sheet/${pump.data_sheet}`
                  }
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
                  disabled={true}
                >
                  <GetAppIcon />
                </IconButton>
              );
            },
          },
        ]}
        data={pump}
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

export default Pump;
