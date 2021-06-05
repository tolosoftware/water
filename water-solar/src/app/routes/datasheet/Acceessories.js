import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import GetAppIcon from '@material-ui/icons/GetApp';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import './download.css';

const Acceessories=() => {
    const [accessories,setAccessories]= useState([]);
    useEffect(() => {
        getAcceessories();
      },[])
      
    const getAcceessories=async () => {
    axios.get('api/accessoriesdownload')
        .then( res => {
            setAccessories(res.data)
        }
        ).catch( err =>{
        NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
       })
    };

  return (
    <>
      <MaterialTable 
                title="Accessories Datasheet"
                columns={
                  [
                    
                      { title: 'Pruduct', field: 'name' },
                      { title: 'Model', field: 'model'},
                      { title: 'UOM Name', field: 'uom_name'},
                      { title: 'Download',  
                      render:  (accessories) =>{
                        return   <a href={`${axios.defaults.baseURL}accessories/data_sheet/${accessories.data_sheet}`} download>
                          <IconButton size="small" aria-label="delete"  color="secondary">
                            <GetAppIcon />
                          </IconButton>
                      </a>
                      }},
                    ]
                 }

              data={accessories}
          />
    </>  

  );
};

export default Acceessories;