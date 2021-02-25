import React,{useEffect,useState}from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
//classes


export const ProjectList=() => {
//   const [open,setOpen]=React.useState(false);  
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
   

  return (
      
      <>
      
          <MaterialTable 
                title="Positioning Actions Column Preview"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Compnay Name', field: 'companyname' },
                    { title: 'Email', field: 'email'},
                    {title: 'Phone', field: 'phone'},
                        
                ]}
                data={userdata}
             
          />
      </>
 
   )
}