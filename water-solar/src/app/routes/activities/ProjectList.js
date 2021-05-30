import React,{useEffect,useState}from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

// import { browserHistory } from 'react-router';
//back drop and notification
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";
//classes
import Swal from 'sweetalert2';

import Moment from 'react-moment';



const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const ProjectList=(props) => {
     const history = useHistory();
 const classes = useStyles();
  const [open,setOpen]=React.useState(false); 
  const [projects,setProjects]= useState([]);
  useEffect(() => {
      const getUserdata=async () => {
         setOpen(true);
     axios.get('api/userprojecttt/'+JSON.parse(localStorage.getItem("UserData")).id)
         .then(res => {
             setOpen(false);
             setProjects(res.data)
            }
     ).catch(err => {
             setOpen(false);
             NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
             id="notification.titleHere"/>);
            }
        )
    };
    getUserdata();
  }, [])
   

  return (
      
      <>
        <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
        </Backdrop>
          
          <MaterialTable 
                title="Project List"
                columns={
                    JSON.parse(localStorage.getItem("UserData")).system == 1? (
                        [
                            { title: 'Name', field: 'name' },
                            { title: 'City', field: 'geolocation.city'},
                            { title: 'GPS',
                                    render:  (projects) =>{
                                        return `${projects.geolocation.latitude} / ${projects.geolocation.longtitude}`;
                                    }
                            },
                            { title: 'User', field: 'user.name'},
                            { title: 'Company', field: 'user.companyname'},
                            { title: 'Date',  
                                render:  (projects) =>{
                                    return  <Moment format="YYYY/MM/DD">
                                                {projects.created_at}
                                            </Moment>;
                                }
                            },
                            ]
                    ):(
                        [
                            { title: 'Name', field: 'name' },
                            { title: 'City', field: 'geolocation.city'},
                            { title: 'GPS',
                                    render:  (projects) =>{
                                        return `${projects.geolocation.latitude} / ${projects.geolocation.longtitude}`;
                                    }
                            },
                            
                            { title: 'Date',  
                                render:  (projects) =>{
                                    return  <Moment format="YYYY/MM/DD">
                                                {projects.created_at}
                                            </Moment>;
                                }
                            },
                            ]
                    )
            }

              data={projects}
                  actions={[
                    {
                    icon: 'delete',
                    tooltip: 'Delete Project',
                       onClick: (event, rowData) =>  {
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
                                axios.delete('api/project/'+rowData.id)
                                    .then(res => {
                                     
                                        setProjects(projects.filter((value) => value.id !==rowData.id));
                                        Swal.fire(
                                            'Deleted!',
                                            'Your file has been deleted.',
                                            'success'
                                        )
                                        }
                                    ).catch( err =>{
                                        Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Something went wrong!',
                                        
                                        })
                                    })  
                                }
                            })
                       }
                    },
                    rowData => ({
                    icon: 'visibility',
                    color:'primary',  
                    tooltip: 'View Project Details',
                        onClick: (event,rowData) => {
                            history.push('/app/project-summary/'+rowData.id);   
                        },
                    
                    disabled: rowData.birthYear < 2000, 
                    })
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
             
          />

           <NotificationContainer/>
      </>
 
   )
}