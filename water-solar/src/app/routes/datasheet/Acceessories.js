import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap';
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
      <div className="table-responsive-material row table-height">
        <Table className="default-table table-unbordered table table-sm table-hover ">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Id</th>
            <th>Pruduct</th>
            <th>Model</th>
            <th>UOM Name</th>
            <th>Download</th>
          </tr>
          </thead>
          <tbody>
          {accessories.map((data, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td>{data.name}</td>
              <td>{data.model}</td>
              <td>{data.uom_name}</td>
              
              <td>
                <div className="pointer text-primary">
                <IconButton size="small" aria-label="delete"  color="secondary"  >
                  <GetAppIcon />
                </IconButton>
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

export default Acceessories;