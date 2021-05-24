import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';

const Structure=() => {
    const [structure,setStructure]= useState([]);
    useEffect(() => {
        getStructure();
      },[])
      
    const getStructure=async () => {
    axios.get('api/pv-module')
        .then( res => {
            setStructure(res.data)
        }
        ).catch( err =>{
        NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
       })
    };

  return (
    <>
      <div className="table-responsive-material row">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>City</th>
            <th>Latitude</th>
            <th>Longtitude</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {structure.map((data, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="user-detail">
                    <h5 className="user-name">{data.country}</h5>
                  </div>
                </div>
              </td>
              <td>{data.city}</td>
              <td>{data.latitude}</td>
              <td>{data.longtitude}</td>
              <td>
                <div className="pointer text-primary">
                <IconButton size="small" aria-label="delete"  color="secondary"  >
                  <DeleteIcon />
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

export default Structure;