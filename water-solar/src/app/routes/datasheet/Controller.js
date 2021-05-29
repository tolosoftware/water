import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap';
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
    axios.get('api/controller')
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
      <div className="table-responsive-material row table-height">
        <Table className="default-table table-unbordered table table-sm table-hover ">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Id</th>
            <th>Pruduct</th>
            <th>Model</th>
            <th>Power</th>
            <th>Download</th>
          </tr>
          </thead>
          <tbody>
          {controller.map((data, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td>{data.invertor_brand.name}</td>
              <td>{data.model}</td>
              <td>{data.power}</td>
              
              <td>
                <div className="pointer text-primary">
                  <a href={`${axios.defaults.baseURL}brand/invertor/invertor_list/data_sheet/${data.data_sheet}`} download>
                    <IconButton size="small" aria-label="delete"  color="secondary"  >
                      <GetAppIcon />
                    </IconButton>
                  </a>
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
    </>  

  );
};

export default Controller;