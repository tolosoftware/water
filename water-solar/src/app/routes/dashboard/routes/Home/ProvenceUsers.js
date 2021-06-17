import React, { useState, useEffect } from 'react';
import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Divider from "@material-ui/core/Divider";
import axios from "axios";

const ProvenceUsers = () => {
    useEffect(() => {
        getProvenceUser();
      }, [false]);

      const [user, setUser] = useState([]);
      const getProvenceUser = () => {
        axios
          .get("api/provenceUser")
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {});
      };

    return (
    <>
  <ResponsiveContainer width="100%" height={238}>
    <ComposedChart data={user}
                   margin={{top: 10, right: 0, left: 0, bottom: 0}}>
      <XAxis dataKey="provence"/>
      <YAxis/>
      <Tooltip/>
      <Legend/>
      <CartesianGrid stroke='#f5f5f5'/>
      <Bar dataKey='user' barSize={15} fill='#3367d6'/>
      <Line type='monotone' dataKey='user' stroke='#59AA2B'/>
    </ComposedChart>
  </ResponsiveContainer>
   <Divider className="mb-3" />
   <h3 className="center">All User of this Application (Around Afghanistan)</h3>
   </>
);}

export default ProvenceUsers;