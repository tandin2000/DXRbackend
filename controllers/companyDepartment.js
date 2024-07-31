import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create createCompanyDepartment
const createCompanyDepartment = async (req, res) => {
  /*
  #swagger.tags = ['CompanyDepartment']
  #swagger.description = 'Endpoint to handle create company department.'
  */
  const companyDepartment = req.body;
  const query = 'INSERT INTO company_department  SET ?';
  
  db.query(query, companyDepartment, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyDepartment controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company Department added successfully.");
    res.status(200).send({ message: "Company Department added successful", data: results.insertId });
  });
  
};


// Update updateCompanyDepartment
const updateCompanyDepartment = async (req, res) => {
  /*
  #swagger.tags = ['CompanyDepartment']
  #swagger.description = 'Endpoint to update company department.'
  */
  const query = 'UPDATE company_department SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyDepartment controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`updateCompanyDepartment controller: Company Department not found`);
      return res.status(404).send({message: 'Company Department not found'});
    }
    loggerUtil.info("Company Department updated successfully.");
    res.status(200).send({ message: 'Company Department updated successfully'});
  });
};

const getCompanyDepartment = async (req, res) => {
  /*
  #swagger.tags = ['CompanyDepartment']
  #swagger.description = 'Endpoint to handle get company location by company_id.'
  */
  const companyId = req.params.id;
  const query = 'SELECT * FROM company_department WHERE company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyDepartment controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No Department found for this company ID' });
    }
    loggerUtil.info("Company Department retrieved successfully.");
    res.status(200).send({ message: "Company Department retrieved successfully", data: results });
  });
};

const getDepartmentById = async (req, res) => {
  const query = 'SELECT * FROM company_department WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getDepartmentById controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getDepartmentById controller: Department not found`);
      return res.status(404).send({message: 'Department not found'});
    }
    loggerUtil.info("Department retrieved successfully.");
    res.status(200).send({ message: "Department retrieved successful", data: results[0] });

  });
};

const deleteCompanyDepartment = async (req, res) => {
  const query = 'DELETE FROM company_department WHERE _id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`deleteCompanyDepartment controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`deleteCompanyDepartment controller: Company Department not found`);
      return res.status(404).send({ message: 'Company Department not found' });
    }
    loggerUtil.info("Company Department deleted successfully.");
    res.status(200).send({ message: 'Company Department deleted successfully' });
  });
};


const companyDepartmentController = { deleteCompanyDepartment, createCompanyDepartment, updateCompanyDepartment, getCompanyDepartment, getDepartmentById};
export default companyDepartmentController;

