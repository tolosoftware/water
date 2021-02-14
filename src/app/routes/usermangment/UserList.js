import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import CardBox from 'components/CardBox';
import Button from '@material-ui/core/Button';
//classes
import UserInside from './UserInside';
import UserForm from './UserForm';
export const UserList=() => {
const [openPopup, setOpenPopup] = React.useState(false);
    return (
      <>
        <UserForm
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}  
        />

     {/* <Button variant="outlined" className="mb-2 pull-right" color="primary" startIcon={ <PeopleOutlineTwoToneIcon fontSize="large" />} onClick={handleClickOpen}>
        Add User
      </Button> */}

        <Button onClick={()=> setOpenPopup(true)}> open</Button>  


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
            <CardBox styleName="col-lg-12" heading="User Insides Chart">
            <UserInside/>
           </CardBox>  
          </div>
        </div>  

    </>
 
      )
}