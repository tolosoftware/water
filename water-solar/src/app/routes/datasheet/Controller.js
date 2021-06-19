import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import GetAppIcon from '@material-ui/icons/GetApp';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import './download.css';

const Controller=() => {
    const [controller,setController]= useState([]);
    useEffect(() => {
        getController();
      },[])
      
    const getController=async () => {
      var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios.get('api/controller/'+id)
        .then( res => {
         setController(res.data)
        }
        ).catch( err =>{
        NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
       })
    };

  return (
    <>
       <MaterialTable 
                title="Controller"
                columns={
                  [
                      { title: 'Pruduct', field: 'brand_name' },
                      { title: 'Model', field: 'model'},
                      { title: 'Power', field: 'power'},
                      { title: 'Voltage (V)', field: 'voltage'},
                      { title: 'Current (A)', field: 'current'},
                      { title: 'Download',  
                      render:  (controller) =>{
                        return   controller.data_sheet?
                        <a href={`${axios.defaults.baseURL}brand/invertor/invertor_list/data_sheet/${controller.data_sheet}`} download>
                          <IconButton size="small" aria-label="download"  color="secondary">
                            <GetAppIcon />
                          </IconButton>
                        </a>
                      :
                      <IconButton size="small" aria-label="download"  color="secondary" disabled={true}>
                        <GetAppIcon />
                      </IconButton>
                      }},
                    ]
                 }

              data={controller}
              options={{
                loadingType: 'linear'
              }}
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

export default Controller;