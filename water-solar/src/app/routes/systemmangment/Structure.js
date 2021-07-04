import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Widget from "components/Widget/index";
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import IntlMessages from 'util/IntlMessages';
import Spinner from 'react-spinner-material';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import StructureForm from './StructureForm';


const Structure = () => {

  const [ open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [structures, setStructures] = useState([]);
  const [structureObj, setStructureObj] = useState([]);
  useEffect(() => {
      getStructure();
  }, [])

  const getStructure = async () => {
    setVisibility(true)
    axios.get('api/structure')
      .then(res => {
        setVisibility(false)
        setStructures(res.data)
      }
      ).catch(err => {
        setVisibility(false)
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }
      )
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <StructureForm open={open} setOpen={setOpen} structureObj={structureObj} setStructureObj={setStructureObj} getStructure={getStructure}/>
      <Widget>
        <div className="d-flex flex-row mb-2">
            <h4 className="pt-3"> Structure Managment </h4>
            {/* <IconButton className="ml-auto" color="primary" aria-label="upload picture" component="span" disabled={structures.length==2?true:false}
              onClick={handleClickOpen} >
              <AddCircleOutlineIcon />
            </IconButton>  */}
          </div>
        <span className="row justify-content-center">
          <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
        </span>
        <div className="table-responsive-material">
          <Table className="default-table table-unbordered table table-sm table-hover ">
            <thead className="table-head-sm th-border-b">
              <tr>
                <th>No:</th>
                <th>Name</th>
                <th>Model</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {structures?.map((data, index) => {
                return <tr key={index}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {data.name}
                  </td>
                  <td>
                    {data.model}
                  </td>
                  <td>
                    {data.price}$
                  </td>
                  <td>
                    {data.quantity}
                  </td>
                  <td>
                    <IconButton size="small" aria-label="Edit" color="secondary" onClick={() => {
                      setStructureObj(data); setOpen(true);
                    }}>
                      <EditIcon />
                    </IconButton>

                  </td>
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

export default Structure;
