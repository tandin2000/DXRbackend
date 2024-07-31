import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create createCompanyCarder
const createCompanyCarder = async (req, res) => {
  /*
  #swagger.tags = ['CompanyCarder']
  #swagger.description = 'Endpoint to handle create company carder.'
  */
  const companyCarder = req.body;
  const query = 'INSERT INTO company_carder  SET ?';
  
  db.query(query, companyCarder, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyCarder controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company Carder added successfully.");
    res.status(200).send({ message: "Company Carder added successful", data: results.insertId });
  });
  
};


// Update updateCompanyCarder
const updateCompanyCarder = async (req, res) => {
  /*
  #swagger.tags = ['CompanyCarder']
  #swagger.description = 'Endpoint to update company carder.'
  */
  const query = 'UPDATE company_carder SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyCarder controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`updateCompanyCarder controller: Company Carder not found`);
      return res.status(404).send({message: 'Company Carder not found'});
    }
    loggerUtil.info("Company Carder updated successfully.");
    res.status(200).send({ message: 'Company Carder updated successfully'});
  });
};

const getCompanyCarder = async (req, res) => {
  /*
  #swagger.tags = ['CompanyCarder']
  #swagger.description = 'Endpoint to handle get company location by company_id.'
  */
  const companyId = req.params.id;
  const query = 'SELECT * FROM company_carder WHERE company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyCarder controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No Carder found for this company ID' });
    }
    loggerUtil.info("Company Carder retrieved successfully.");
    res.status(200).send({ message: "Company Carder retrieved successfully", data: results });
  });
};

const getCarderById = async (req, res) => {
  const query = 'SELECT * FROM company_carder WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getCarderById controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getCarderById controller: Carder not found`);
      return res.status(404).send({message: 'Carder not found'});
    }
    loggerUtil.info("Carder retrieved successfully.");
    res.status(200).send({ message: "Carder retrieved successful", data: results[0] });

  });
};

const deleteCompanyCarder = async (req, res) => {
  const query = 'DELETE FROM company_carder WHERE _id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`deleteCompanyCarder controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`deleteCompanyCarder controller: Company Carder not found`);
      return res.status(404).send({ message: 'Company Carder not found' });
    }
    loggerUtil.info("Company Carder deleted successfully.");
    res.status(200).send({ message: 'Company Carder deleted successfully' });
  });
};

const companyCarderController = { deleteCompanyCarder, createCompanyCarder, updateCompanyCarder, getCompanyCarder, getCarderById};
export default companyCarderController;

