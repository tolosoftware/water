import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Taps Start Code 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import AccessoriesForm from './commentElement/AccessoriesForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Taps End code

let id = 0;

function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {id, name, calories, fat, carbs, protein};
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Accessories() {
  // start code for taps 
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // end code for taps 

  return (
    <div className={classes.root}>
    <TabContext value={value}>
      <AppBar position="static">
        <TabList onChange={handleChange} aria-label="simple tabs example">
          <Tab label="List of Accessories" value="1" />
          <Tab label="Add New Accessory" value="2" />
        </TabList>
      </AppBar>
      <TabPanel value="1">
        <div className="table-responsive-material">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat (g)</TableCell>
                <TableCell align="right">Carbs (g)</TableCell>
                <TableCell align="right">Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell align="right">{n.calories}</TableCell>
                    <TableCell align="right">{n.fat}</TableCell>
                    <TableCell align="right">{n.carbs}</TableCell>
                    <TableCell align="right">{n.protein}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </TabPanel>
      <TabPanel value="2">
      <AccessoriesForm />
        
      </TabPanel>
    </TabContext>
  </div>

    
  );
}


export default Accessories;