import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import MaterialTable from 'material-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import './download.css';

const Module=() => {
    const [solar,setSolar]= useState([]);
    useEffect(() => {
        getSolar();
      },[])
      
    const getSolar=async () => {
    axios.get('api/solar')
        .then( res => {
          setSolar(res.data)
        }
        ).catch( err =>{
        NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
       })
    };

  return (
    <>
      <MaterialTable 
                title="Solar Brand"
                columns={
            
                  [
                      { title: 'Pruduct', field: 'solar_brand.name' },
                      { title: 'Model', field: 'model'},
                      { title: 'Power', field: 'power'},
                      { title: 'Currnet', field: 'current'},
                      { title: 'Voltage', field: 'voltage'},
                      { title: 'Download',  
                          render:  (solar) =>{
                              return solar.data_sheet?
                                  <a href={`${axios.defaults.baseURL}brand/solar/solar_list/data_sheet/${solar.data_sheet}`} download>
                                    <IconButton size="small" aria-label="download"  color="secondary">
                                      <GetAppIcon />
                                    </IconButton>
                                  </a>
                                  :
                                  <IconButton size="small" aria-label="download"  color="secondary">
                                    <GetAppIcon />
                                  </IconButton>
                            
                          }
                      },
                    ]
                 }

              data={solar}
              localization={{
                body: {
                    emptyDataSourceMessage: (
                        <p color="primary" >
                           <strong>Loading...</strong>
                        </p>
                    ),
                },
              }}
          />
    </>  

  );
};

export default Module;