import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import CardBox from 'components/CardBox';
import Button from '@material-ui/core/Button';
import Widget from "components/Widget/index";

import Icon from '@material-ui/core/Icon';
//classes
import UserInside from './UserInside';
import UserForm from './UserForm';
import CustomizedDialogs from "./CustomizedDialogs";
export const UserList=() => {
  const [openPopup,setOpenPopup]=React.useState(false);
const [open, setOpen] = React.useState(false);  
    return (
      <>
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
        />  
        <UserForm
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}  
        />
     <div className="row">
     <div className="col-md-8">   
          <MaterialTable 
                title="Positioning Actions Column Preview"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                ]}
                data={[
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                ]}
                actions={[
                    {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                    disabled: rowData.birthYear < 2000
                    })
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
          />
        </div>
          <div className="col-md-4">
           
            
            <div className="pl-3 pr-3" onClick={()=> setOpen(true)}>  
            
             <Widget styleName={`bg-blue darken-4 text-white`}>
              <div className="d-flex flex-row justify-content-center mb-3">
                <i className={`zmdi zmdi-plus-circle-o zmdi-hc-2x`}/>
              </div>
              <div className="text-center">
                <h3 className="jr-font-weight-medium mb-3">Add New User</h3>
               
              </div>
              </Widget>
            </div>  
            
            <CardBox styleName="col-lg-12" heading="User Insides Chart">
            <UserInside/>
           </CardBox>  
          </div>
        </div>  

    </>
 
      )
}