import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create EmployeeSummary
const createEmployeeSummary = async (req, res) => {
  /*
  #swagger.tags = ['EmployeeSummary']
  #swagger.description = 'Endpoint to handle create employee_summary.'
  */
  const employee_summary = req.body;
  const query = 'INSERT INTO employee_summary SET ?';
  
  db.query(query, employee_summary, (err, results) => {
    if(err){
      loggerUtil.error(`createEmployeeSummary controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("EmployeeSummary added successfully.");
    res.status(200).send({ message: "EmployeeSummary added successful", data: results.insertId });
  });
  
};

// get EmployeeSummary
const getEmployeeSummary = async (req, res) => {
  /*
  #swagger.tags = ['EmployeeSummary']
  #swagger.description = 'Endpoint to retrieve employee_summary.'
  */
  const query = 'SELECT * FROM employee_summary WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getEmployeeSummary controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getEmployeeSummary controller: EmployeeSummary not found`);
      return res.status(404).send({message: 'EmployeeSummary not found'});
    }
    loggerUtil.info("EmployeeSummary retrieved successfully.");
    res.status(200).send({ message: "EmployeeSummary retrieved successful", data: results[0] });

  });
};

// Update EmployeeSummary
const updateEmployeeSummary = async (req, res) => {
  /*
  #swagger.tags = ['EmployeeSummary']
  #swagger.description = 'Endpoint to update employee_summary.'
  */
  const query = 'UPDATE employee_summary SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateEmployeeSummary controller: ${err}`);
      return res.status(500).send({message: 'Error updating employee_summary'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`EmployeeSummary not found`);
      return res.status(404).send({message: 'EmployeeSummary not found'});
    }
    loggerUtil.info("EmployeeSummary updated successfully.");
    res.status(200).send({ message: 'EmployeeSummary updated successfully'});
  });
};

const employee_summaryController = { createEmployeeSummary, getEmployeeSummary, updateEmployeeSummary};
export default employee_summaryController;

