import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { NotificationManager } from "react-notifications";
import IntlMessages from "util/IntlMessages";
import Swal from "sweetalert2";
import Spinner from "react-spinner-material";
import Moment from "react-moment";
import * as moment from "moment";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import BlockIcon from "@material-ui/icons/Block";
//classes
import CustomizedDialogs from "./CustomizedDialogs";
import BrandManagement from "./BrandManagement";
export const UserList = () => {
  const [visibility, setVisibility] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const [userdata, setUserdata] = useState([]);
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const getUserdata = async () => {
      setVisibility(true);
      axios
        .get("api/user")
        .then((res) => {
          setVisibility(false);
          setUserdata(res.data);
        })
        .catch((err) => {
          setVisibility(false);
          console.log(err);
          NotificationManager.error(
            <IntlMessages id="notification.errorMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
        });
    };
    getUserdata();
  }, [open]);

  const deletUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("api/user/" + id)
          .then((res) => {
            setUserdata(res.data);
            setUserdata(userdata.filter((value) => value.id !== id));
            NotificationManager.success(
              <IntlMessages id="notification.successMessage" />,
              <IntlMessages id="notification.titleHere" />
            );
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };
  const [userDataOject, setUserDataObject] = useState([]);
  const editBrand = (id) => {
    setUserID(id);
    setOpenB(true);
    console.log("Manage brand ", id);
  };
  const editUser = (data) => {
    setUserDataObject(data);
    setOpen(true);
  };
  return (
    <>
      <CustomizedDialogs
        open={open}
        setOpen={setOpen}
        userDataOject={userDataOject}
        setUserDataObject={setUserDataObject}
      />
      <BrandManagement open={openB} setOpen={setOpenB} userId={userID} />

      <Button color="primary" onClick={() => setOpen(true)}>
        <AddCircleOutlineIcon className="mr-2" />
        Add New User
      </Button>

      <div className="row">
        <div className="col-md-12">
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
              title="User List"
              columns={[
                { title: "Name", field: "name" },
                { title: "Compnay Name", field: "companyname" },
                { title: "City", field: "geolocation.city" },
                { title: "Email", field: "email" },
                { title: "Phone", field: "phone" },
                {
                  title: "Reg Date",
                  render: (projects) => {
                    return (
                      <Moment format="YYYY/MM/DD">{projects.created_at}</Moment>
                    );
                  },
                },

                {
                  title: "Exp Date",
                  render: (projects) => {
                    var y = projects.expiration * 30;
                    var x = moment(projects.created_at, "DD-MM-YYYY").add(
                      y,
                      "days"
                    );
                    return <Moment format="YYYY/MM/DD">{x}</Moment>;
                  },
                },

                {
                  title: "Status",
                  render: (projects) => {
                    return projects.status == "active" ? (
                      <span title="Active">
                        <CheckCircleOutlineIcon color="primary" />
                      </span>
                    ) : projects.status == "inactive" ? (
                      <span title="Inactive">
                        <BlockIcon color="secondary" />
                      </span>
                    ) : (
                      <span title="Pinding">
                        <ReportProblemIcon color="#ffc107" />
                      </span>
                    );
                  },
                },
              ]}
              data={userdata}
              actions={[
                (rowData) => ({
                  disabled:
                    JSON.parse(localStorage.getItem("UserData")).system == 0
                      ? true
                      : false,
                  icon: "manage_accounts",
                  tooltip: "Manage Brand",
                  onClick: (event, rowData) => editBrand(rowData.id),
                }),
                (rowData) => ({
                  disabled:
                    JSON.parse(localStorage.getItem("UserData")).system == 0
                      ? true
                      : false,
                  icon: "edit",
                  tooltip: "Edit User",
                  onClick: (event, rowData) => editUser(rowData),
                }),
                (rowData) => ({
                  disabled:
                    rowData["system"] == 1
                      ? true
                      : JSON.parse(localStorage.getItem("UserData")).system ==
                        0
                      ? true
                      : false,
                  icon: "delete",
                  color: "primary",
                  tooltip: "Delete User",
                  onClick: (event, rowData) => deletUser(rowData.id),
                }),
              ]}
              options={{
                actionsColumnIndex: -1,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
