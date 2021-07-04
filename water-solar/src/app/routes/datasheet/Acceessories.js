import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import GetAppIcon from "@material-ui/icons/GetApp";
import { NotificationManager, NotificationContainer } from "react-notifications";
import IntlMessages from "util/IntlMessages";
import "./download.css";

const Acceessories = () => {
  const [accessories, setAccessories] = useState([]);
  useEffect(() => {
    getAcceessories();
  }, []);

  const getAcceessories = async () => {
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios
      .get("api/accessoriesdownload/"+id)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setAccessories(res.data.accessories);
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
        title="Accessories Datasheet"
        columns={[
          { title: "Pruduct", field: "name" },
          { title: "Model", field: "model" },
          { title: "UOM Name", field: "uom_name" },
          {
            title: "Download",
            render: (accessories) => {
              return accessories.data_sheet ? (
                <a
                  href={`${axios.defaults.baseURL}accessories/data_sheet/${accessories.data_sheet}`}
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
        data={accessories}
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

export default Acceessories;
