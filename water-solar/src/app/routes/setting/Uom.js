import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import Avatar from '@material-ui/core/Avatar';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Spinner from 'react-spinner-material';

const Uom=() => {
  const [visibility,setVisibility]= useState(false);
  const [uom,setUom]= useState([]);
  useEffect(() => {
    getUom();
  },[])
  
  const getUom=async () => {
     setVisibility(true)
    axios.get('api/uom')
      .then( res => {
            setVisibility(false)
            setUom(res.data)
          }
      ).catch( err =>{
             NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
      
          }
      )
  };
  return (
    <>
    <Widget>
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Unit of Measurement</h4>
      </div>
        <span className="row justify-content-center">
          <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
        </span>   
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
            <tr>
            <th>No:</th>  
            <th>Name:</th>
            <th>Acronym:</th>
          </tr>
          </thead>
          <tbody>
          {uom.map((data, index) => {
              return <tr key={index}>
             <td>
               {index+1}
              </td>  
              <td>
               {data.name}
              </td>
              <td>{data.acronym}</td>
            
            </tr>
          })}
          </tbody>
        </Table>
      </div>
   
    </Widget>
      <NotificationContainer />

    </>  

  );
};

export default Uom;
