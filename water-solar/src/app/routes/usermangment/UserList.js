import React,{useEffect,useState}from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import CardBox from 'components/CardBox';
import Widget from "components/Widget/index";
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Swal from 'sweetalert2';
import Spinner from 'react-spinner-material';
import Moment from 'react-moment';
import * as moment from 'moment';
//classes

import CustomizedDialogs from "./CustomizedDialogs";
export const UserList=() => {
  const [visibility,setVisibility]= useState(false);
  const [open,setOpen]=React.useState(false);  
  const [userdata,setUserdata]= useState([]);
  useEffect(() => {
    const getUserdata=async () => {
      setVisibility(true);
     axios.get('api/user')
        .then(
            res => {
              setVisibility(false);
              setUserdata(res.data)
            }
        ).catch(err =>{
              setVisibility(false);
              console.log(err);
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            }
           
        )
    };
    getUserdata();
  }, [open])
   
  const deletUser = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        axios.delete('api/user/'+id)
            .then(
                res => {
                  setUserdata(res.data)
                  setUserdata(userdata.filter((value) => value.id !==id));
                  NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                  id="notification.titleHere" />);
                }
            ).catch(err =>{
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              
              })
            })
      }
    })
     
  };
  const [userDataOject, setUserDataObject]= useState([]);
  const editUser = (data) => {
    setUserDataObject(data);
    setOpen(true);
  }
  return (
      
      
      <>
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
          userDataOject={userDataOject}
          setUserDataObject={setUserDataObject}
        />  
      
     <div className="row">
     <div className="col-md-10"> 
        {visibility ? (
          <span className="row justify-content-center">
            <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
          </span>
        ) : (
          <MaterialTable 
            title= "User List"
            
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Compnay Name', field: 'companyname' },
                { title: 'City', field: 'geolocation.city' },
                { title: 'Email', field: 'email'},
                {title: 'Phone', field: 'phone'},
                { title: 'Reg Date',  
                      render:  (projects) =>{
                          return  <Moment format="YYYY/MM/DD">
                                      {projects.created_at}
                                  </Moment>;
                      }
                  },

                  { title: 'Exp Date',  
                  render:  (projects) =>{
                    var y = projects.expiration * 30;
                    var x = moment(projects.created_at, "DD-MM-YYYY").add(y, 'days');
                    //alert(projects.created_at)
                    //alert(x)
                      return  <Moment format="YYYY/MM/DD">
                                  {x}
                              </Moment>;
                  }
              },
                    
            ]}
            data={userdata}
            actions={[
              rowData => ({
                disabled: (JSON.parse(localStorage.getItem('UserData')).system===0? true : false),
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) =>  editUser(rowData)
                }),
                rowData => ({ 
                  disabled: (rowData['system']===1)? true : (JSON.parse(localStorage.getItem('UserData')).system===0? true : false),
                  icon: 'delete',
                  color:'primary',  
                  tooltip: 'Delete User',
                  onClick: (event, rowData) => deletUser(rowData.id),
                })
            ]}
            options={{
                actionsColumnIndex: -1
            }}
          />
        )}
            
          
        </div>
          <div className="col-md-2">
            <div className="" onClick={()=> setOpen(true)}>  
             <Widget styleName={`bg-blue darken-4 text-white`}>
              <div className="d-flex flex-row justify-content-center">
                <i className={`zmdi zmdi-plus-circle-o zmdi-hc-2x`}/>
              </div>
              <div className="text-center">
                <h3 className="jr-font-weight-medium mb-3">Add New User</h3>
              </div>
              </Widget>
            </div>  
            
          
          </div>
        </div>  
    </>
  )
}