import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import GetAppIcon from '@material-ui/icons/GetApp';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import './download.css';

const Pump=() => {
    const [pump,setPump]= useState([]);
    useEffect(() => {
        getPump();
      },[])
      
    const getPump=async () => {
    axios.get('api/pump')
        .then( res => {
        setPump(res.data)
        }
        ).catch( err =>{
        NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
       })
    };

  return (
    <>
        <MaterialTable 
                title="Pump Brand"
                columns={
                  [
                      { title: 'Pruduct', field: 'pump_brand.name' },
                      { title: 'Model', field: 'model'},
                      { title: 'Ampeier', field: 'ampeier'},
                      { title: 'Download',  
                      render:  (pump) =>{
                        return   <a href={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/data_sheet/${pump.data_sheet}`} download>
                          <IconButton size="small" aria-label="delete"  color="secondary">
                            <GetAppIcon />
                          </IconButton>
                      </a>
                      }},
                    ]
                 }

              data={pump}
          />
    </>  

  );
};

export default Pump;