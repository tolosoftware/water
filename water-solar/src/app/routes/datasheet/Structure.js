import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';

const Structure=() => {
   

  return (
    <>
      <div className="table-responsive-material row">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
          <th>Id</th>
            <th>Pruduct</th>
            <th>Model</th>
            <th>Ampeier</th>
            <th>Download</th>
          </tr>
          </thead>
          <tbody>
       
           <tr>
              <td>1</td>
              <td>Pruduct</td>
              <td>Model</td>
              <td>Ampeier</td>
              
              <td>
                <div className="pointer text-primary">
                <IconButton size="small" aria-label="delete"  color="secondary"  >
                  <GetAppIcon />
                </IconButton>
                </div>
              </td>
            </tr>
         
          </tbody>
        </Table>
      </div>
    </>  

  );
};

export default Structure;