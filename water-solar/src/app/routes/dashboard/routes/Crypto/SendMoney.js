import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Widget from "components/Widget/index";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import "./dashstyle.css";
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

const SendMoney = ({ usersData }) => {
  useEffect(() => {
    getUserProject();
  }, [false]);

  const [user, setUser] = useState([]);

  const getUserProject = () => {
    axios
      .get("api/userproject/" + JSON.parse(localStorage.getItem("UserData")).id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {});
  };
  return (
    <Widget>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={user}
          margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#00a54f" />
        </BarChart>
      </ResponsiveContainer>
      <Divider className="mb-3" />
      <h3 className="pl-5">Design Project By this User (Current year)</h3>
    
    </Widget>
  );
};

export default SendMoney;
