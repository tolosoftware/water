import React,  { useState, useEffect } from "react";
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Divider from "@material-ui/core/Divider";

import axios from 'axios';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import './dashstyle.css';
const Secondrow = () => {

    useEffect(() => {
        getIrredation();
    },[false])

    const [kabul,setKabul]=useState([]);
    const [herat,setHerat]=useState([]);
    const [balkh,setBalkh]=useState([]);
    const [kandahar,setKandahar]=useState([]);
    const getIrredation=() => {    
          axios.get('api/irridation')
           .then(res => {
            setKabul(res.data.kabul);
            setHerat(res.data.herat);
            setBalkh(res.data.balkh);
            setKandahar(res.data.kandahar);
            }
         ).catch(err => {
            NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
            })
     }

  return (
    <>
        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
             
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={kabul}
                         margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="value" fill="#ffc658"/> 
                    </BarChart>
                    </ResponsiveContainer>
                    <Divider className="mb-3 mt-1" />
                    <h3 style={{textAlign:'center',}}>Kabul Irradiation</h3>
            </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={herat}
                    margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="value" fill="#ffc658"/> 
                </BarChart>
                </ResponsiveContainer>
                <Divider className="mb-3 mt-1" />
                <h3 style={{textAlign:'center',}}>Herat Irradiation</h3>
        </div>
    
        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={balkh}
                    margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="value" fill="#ffc658"/> 
                </BarChart>
                </ResponsiveContainer>
                <Divider className="mb-3 mt-1" />
                <h3 style={{textAlign:'center',}}>Balkh Irradiation</h3>
        </div>
    
        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
             
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={kandahar}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="value" fill="#ffc658"/> 
                    </BarChart>
                    </ResponsiveContainer>

                    <Divider className="mb-3 mt-1" />
                    <h3 style={{textAlign:'center',}}>Kandahar Irradiation</h3>
            </div>

    </>    
  );
};

export default Secondrow;
