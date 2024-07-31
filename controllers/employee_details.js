import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create EmployeeDetails
const createEmployeeDetails = async (req, res) => {
  /*
  #swagger.tags = ['EmployeeDetails']
  #swagger.description = 'Endpoint to handle create employee_details.'
  */
  const employee_details = req.body;
  const query = 'INSERT INTO employee_details SET ?';
  
  db.query(query, employee_details, (err, results) => {
    if(err){
      loggerUtil.error(`createEmployeeDetails controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("EmployeeDetails added successfully.");
    res.status(200).send({ message: "EmployeeDetails added successful", data: results.insertId });
  });
  
};

// get EmployeeDetails
const getEmployeeDetails = async (req, res) => {
  /*
  #swagger.tags = ['EmployeeDetails']
  #swagger.description = 'Endpoint to retrieve employee_details.'
  */
  const query = 'SELECT * FROM employee_details WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getEmployeeDetails controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getEmployeeDetails controller: EmployeeDetails not found`);
      return res.status(404).send({message: 'EmployeeDetails not found'});
    }
    loggerUtil.info("EmployeeDetails retrieved successfully.");
    res.status(200).send({ message: "EmployeeDetails retrieved successful", data: results[0] });

  });
};

// Update EmployeeDetails
const updateEmployeeDetails = async (req, res) => {
  /*
  #swagger.tags = ['EmployeeDetails']
  #swagger.description = 'Endpoint to update employee_details.'
  */
  const query = 'UPDATE employee_details SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateEmployeeDetails controller: ${err}`);
      return res.status(500).send({message: 'Error updating employee_details'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`EmployeeDetails not found`);
      return res.status(404).send({message: 'EmployeeDetails not found'});
    }
    loggerUtil.info("EmployeeDetails updated successfully.");
    res.status(200).send({ message: 'EmployeeDetails updated successfully'});
  });
};

const employee_detailsController = { createEmployeeDetails, getEmployeeDetails, updateEmployeeDetails};
export default employee_detailsController;

