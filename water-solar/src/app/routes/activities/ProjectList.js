import React,{useEffect,useState}from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

//back drop and notification
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
//classes


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const ProjectList=() => {
 const classes = useStyles();
  const [open,setOpen]=React.useState(false); 
  const [projects,setProjects]= useState([]);
  useEffect(() => {
      const getUserdata=async () => {
         setOpen(true);
     axios.get('api/project')
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
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Country', field: 'country' },
                    { title: 'City', field: 'geolocation.city'},
                    {title: 'Discription', field: 'discription'},
                        
                ]}
              data={projects}
                  actions={[
                    {
                    icon: 'delete',
                    tooltip: 'Delete Project',
                    onClick: (event, rowData) =>  alert("You saved " + rowData.id)
                    },
                    rowData => ({
                    icon: 'visibility',
                    color:'primary',  
                    tooltip: 'View Project Details',
                    onClick: (event, rowData) => alert(rowData.id),
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