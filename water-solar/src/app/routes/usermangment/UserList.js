import React,{useEffect,useState}from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import CardBox from 'components/CardBox';
import Button from '@material-ui/core/Button';
import Widget from "components/Widget/index";

import Icon from '@material-ui/core/Icon';
//classes
import UserInside from './UserInside';
import CustomizedDialogs from "./CustomizedDialogs";
export const UserList=() => {

  const [open,setOpen]=React.useState(false);  
  const [userdata,setUserdata]= useState([]);
  useEffect(() => {
    const getUserdata=async () => {
     axios.get('http://localhost:8000/api/user')
        .then(
            res => {
              setUserdata(res.data)
            }
        ).catch(
            err =>{
                console.log(err);
            }
           
        )
    };
    getUserdata();
  }, [])
   
  const deletUser = async (id) => {
 
    if(window.confirm('Are you sure you want to delet this !')) {
        axios.delete('http://localhost:8000/api/user/'+id)
            .then(
                res => {
                  setUserdata(res.data)

                  setUserdata(userdata.filter((value) => value.id !==id));

                }
            ).catch(
                err =>{
                    console.log(err);
                } 
          )
       }
  };
  
  return (
      
      
      <>
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
        />  
      
     <div className="row">
     <div className="col-md-8">   
          <MaterialTable 
                title="Positioning Actions Column Preview"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Compnay Name', field: 'companyname' },
                    { title: 'Email', field: 'email'},
                    {title: 'Phone', field: 'phone'},
                        
                ]}
                data={userdata}
                actions={[
                    {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event, rowData) =>  alert("You saved " + rowData.id)
                    },
                    rowData => ({
                    icon: 'delete',
                    color:'primary',  
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => deletUser(rowData.id),
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