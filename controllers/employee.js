import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create Employee
const createEmployee = async (req, res) => {
  /*
  #swagger.tags = ['Employee']
  #swagger.description = 'Endpoint to handle create employee.'
  */
  const employee = req.body;
  const query = 'INSERT INTO employee SET ?';
  
  db.query(query, employee, (err, results) => {
    if(err){
      loggerUtil.error(`createEmployee controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Employee added successfully.");
    res.status(200).send({ message: "Employee added successful", data: results.insertId });
  });
  
};

// get Employee
const getEmployee = async (req, res) => {
  /*
  #swagger.tags = ['Employee']
  #swagger.description = 'Endpoint to retrieve employee.'
  */
  const query = 'SELECT * FROM employee WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getEmployee controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getEmployee controller: Employee not found`);
      return res.status(404).send({message: 'Employee not found'});
    }
    loggerUtil.info("Employee retrieved successfully.");
    res.status(200).send({ message: "Employee retrieved successful", data: results[0] });

  });
};

// Update Employee
const updateEmployee = async (req, res) => {
  /*
  #swagger.tags = ['Employee']
  #swagger.description = 'Endpoint to update employee.'
  */
  const query = 'UPDATE employee SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateEmployee controller: ${err}`);
      return res.status(500).send({message: 'Error updating employee'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`Employee not found`);
      return res.status(404).send({message: 'Employee not found'});
    }
    loggerUtil.info("Employee updated successfully.");
    res.status(200).send({ message: 'Employee updated successfully'});
  });
};

const getEmployeesByCompanyId = async (req, res) => {
  const companyId = req.params.id;
  const query = 'SELECT * FROM employee JOIN employee_details  ON employee._id = employee_details.employee_id WHERE employee_details.company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getEmployeesByCompanyId controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No Users found for this company ID' });
    }
    loggerUtil.info("Users retrieved successfully.");
    res.status(200).send({ message: "Users retrieved successfully", data: results });
  });
};

const getEmployeesByCompanyIdSearch = async (req, res) => {
  const { id } = req.params;
  const { first_name, employee_number, nic, contact_number } = req.query;

  let query = `
    SELECT employee.*, employee_details.*
    FROM employee 
    JOIN employee_details ON employee._id = employee_details.employee_id 
    WHERE employee_details.company_id = ?`;

  const queryParams = [id];

  if (first_name) {
    query += ' AND employee.first_name LIKE ?';
    queryParams.push(`%${first_name}%`);
  }

  if (employee_number) {
    query += ' AND employee_details.employee_number LIKE ?';
    queryParams.push(`%${employee_number}%`);
  }

  if (nic) {
    query += ' AND employee.nic LIKE ?';
    queryParams.push(`%${nic}%`);
  }

  if (contact_number) {
    query += ' AND employee.contact_number LIKE ?';
    queryParams.push(`%${contact_number}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      loggerUtil.error(`getEmployeesByCompanyId controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No Users found for this company ID' });
    }
    loggerUtil.info("Users retrieved successfully.");
    res.status(200).send({ message: "Users retrieved successfully", data: results });
  });
};


const employeeController = { createEmployee, getEmployeesByCompanyIdSearch, getEmployee, updateEmployee, getEmployeesByCompanyId};
export default employeeController;

